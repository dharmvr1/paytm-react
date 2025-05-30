import express from "express";
import { AuthMiddleware } from "../middleware";
import { PrismaClient } from "../../generated/prisma";
const client = new PrismaClient();

export const accountRouter = express.Router();

accountRouter.get("/balance", AuthMiddleware, async (req, res) => {
  const userId = req.userId;
  const account = await client.accounts.findFirst({
    where: {
      userId: parseInt(userId),
    },
  });
  if (!account) {
    res.status(403).json({ message: "you not have account" });
    return;
  }
  const balance = account.balance;
  res.status(200).json({
    balance: balance,
  });
});

accountRouter.post("/transfer", AuthMiddleware, async (req, res) => {
  const { to, amount } = req.body;
  console.log(req.body)
  if (parseInt(to) === parseInt(req.userId)) {
    res.status(403).json({ message: "self transaction is not possible" });
    return;
  }
  const account = await client.accounts.findFirst({
    where: { userId: parseInt(req.userId) },
  });
  if (account && account.balance > amount) {
    const toaccount = await client.accounts.findFirst({
      where: { userId: parseInt(to) },
    });
    if (!toaccount) {
      res.status(400).json({
        message: "invalid account",
      });
      return;
    }
    const transfer = await client.$transaction([
      client.accounts.update({
        where: {
          userId: parseInt(req.userId),
        },
        data: {
          balance: {
            decrement: amount,
          },
        },
      }),
      client.accounts.update({
        where: {
          userId: parseInt(to),
        },
        data: {
          balance: {
            increment: amount,
          },
        },
      }),
    ]);
    if (transfer) {
      res.status(200).json({
        message: "transaction sucessfull",
      });
    } else {
      res.status(500).json({
        message: "transaction unsuccesfull",
      });
    }
  } else {
    res.status(400).json({ message: "insufficient balance" });
  }
});
