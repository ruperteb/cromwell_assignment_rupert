import { Request, Response, NextFunction } from "express";
import { decrypt } from "./session";

export const authUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = req.cookies["session"];
  if (!session) {
    res.status(401).send("Not authorised");
    return;
  }

  const payload = await decrypt(session);

  if (!payload) {
    res.status(403).send("Invalid session");
    return;
  }

  req.session = { userId: payload.userId, role: payload.role };
  next();
};

export const authAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = req.session;
  if (!session || session.role !== "admin") {
    res.status(401).send("Not authorised");
    return;
  }
  next();
};
