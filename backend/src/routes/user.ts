import experss, { Request, Response, Router } from "express";
import { PrismaClient } from "../../generated/prisma";
import { optional, z } from "zod";
import bcrypt from "bcrypt";
export const userRouter = experss.Router();
import { AuthMiddleware } from "../middleware";
const client = new PrismaClient();
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config";
const userValidation = z.object({
  firstName: z.string().max(35).min(3),
  lastName: z.string().max(35).min(3),
  username: z.string().min(3).max(25),
  password: z
    .string()
    .min(5)
    .max(60)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
      message: "must include one capital one small  one number",
    }),
});

userRouter.post("/signup", async (req, res) => {
  const validate = userValidation.parse(req.body);
  if (!validate) {
    return;
  }

  const { username, firstName, lastName, password } = req.body;

  const user = await client.user.findFirst({
    where: {
      username: username,
    },
  });
  if (user) {
    res.status(411).json({
      message: "email already taken",
    });
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await client.user.create({
    data: {
      username: username,
      firstName: firstName,
      lastName: lastName,
      password: hashedPassword,
    },
  });
  if (!newUser) {
    res.status(500).json({ message: "server error while creating user" });
    return;
  }

  const jwt_token = jwt.sign({ userId: newUser.id }, TOKEN_SECRET);
  await client.accounts.create({
    data: {
      balance: 1 + Math.random() * 10000,
      userId: newUser.id,
    },
  });
  res
    .status(200)
    .json({ message: "user created succesfull", token: jwt_token });
});

userRouter.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  const user = await client.user.findFirst({
    where: { username: username },
  });

  if (!user) {
    res.status(411).json({ message: "error while signin" });
    return;
  }
  const success = await bcrypt.compare(password, user.password);
  if (!success) {
    res.status(403).json({ message: "incorrect passwor" });
    return
  }
  const jwt_token = jwt.sign({ userId: user.id }, TOKEN_SECRET);
  res.status(200).json({
    message: "signin success",
    token: jwt_token,
  });
});

const updateUser = z.object({
  firstName: z.string().max(35).min(3).optional(),
  lastName: z.string().max(35).min(3).optional(),
  password: z
    .string()
    .min(5)
    .max(60)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
      message: "must include one capital one small  one number",
    })
    .optional(),
});

userRouter.put("/", AuthMiddleware, async (req: Request, res: Response) => {
  const userId = req.userId;
  const success = updateUser.parse(req.body);
  if (!success) {
    res.status(403).json({ message: "not valid username" });
    return;
  }
  const newUpdateUser = await client.user.update({
    where: {
      id: parseInt(userId),
    },
    data: req.body,
  });
  if (!newUpdateUser) {
    res.status(500).json({ message: "error while updating" });
    return;
  }
  res.status(200).json({
    message: "update user successfully",
  });
});

userRouter.get("/bulk", AuthMiddleware, async (req: Request, res: Response) => {
  const filter = req.query.filter?.toString().trim();
  const users = await client.user.findMany({
    where: filter
      ? {
          OR: [
            {
              firstName: {
                contains: filter,
                mode: "insensitive",
              },
            },
            {
              lastName: {
                contains: filter,
                mode: "insensitive",
              },
            },
          ],
        }
      : {},
  });
  if (users) {
    res.status(200).json({
      users: users,
    });
  }
});

userRouter.get('/profile',AuthMiddleware,async(req,res)=>{
  const userId=req.userId
  const user=await client.user.findFirst({
    where:{id:parseInt(userId)}
  })
  if(user){
    res.status(200).json({
      message:user
    })
  }
})