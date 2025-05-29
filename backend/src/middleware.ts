import { PrismaClient } from "../generated/prisma";
import { Request, Response ,NextFunction} from "express";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "./config";
import { JwtHeader } from "jsonwebtoken";
declare global{
    namespace Express{
        interface  Request{
    userId:string
    query:string
}
    }
}
export const AuthMiddleware = async (req: Request, res: Response,next:NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(403).json({ mesage: "not active user" });
    return;
  }
  const token=authHeader
  console.log(token)
  const verifytoken:any = jwt.verify(token, TOKEN_SECRET);
  if (!verifytoken) {
    res.status(403).json({ message: "you have to login" });
    return
  }
  const userId = verifytoken.userId;
  req.userId=userId
  next()
};
