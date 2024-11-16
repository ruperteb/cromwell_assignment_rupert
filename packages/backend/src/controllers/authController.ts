import { Request, Response } from "express";
import { db } from "../db/db";
import { usersTable } from "../db/schema";
import { LoginFields, RegistrationFields } from "../lib/definitions";
import { eq } from "drizzle-orm";
import { compare, hash } from "bcrypt";
import { createSession, deleteSession, verifySession } from "../lib/session";

const handleLogin = async (req: Request, res: Response) => {
  const { email, password }: LoginFields = req.body;

  let user:
    | {
        id: number;
        email: string;
        role: string;
        password: string;
      }
    | undefined;

  try {
    user = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
      columns: {
        id: true,
        email: true,
        role: true,
        password: true,
      },
    });
  } catch (e) {
    res.status(500).send("Database error");
    console.error(e);
    return;
  }

  if (!user) {
    res.status(404).send("User does not exist");
    return;
  }

  if (!(await compare(password, user.password))) {
    res.status(401).send("Invalid password");
    return;
  }

  await createSession({ userId: user.id, role: user.role }, res);

  res.status(200).send({ userId: user.id, role: user.role });
};

const handleRegistration = async (req: Request, res: Response) => {
  const { name, email, password }: RegistrationFields = req.body;
  const existingEmail = await db.query.usersTable.findFirst({
    where: eq(usersTable.email, email),
  });

  if (existingEmail) {
    res.status(400).send("A profile with this email address already exists");
    return;
  }

  const existingName = await db.query.usersTable.findFirst({
    where: eq(usersTable.name, name),
  });

  if (existingName) {
    res.status(400).send("A profile with this name already exists");
    return;
  }

  let user: { id: number; role: string };

  try {
    user = (
      await db
        .insert(usersTable)
        .values({
          name,
          email,
          password: await hash(password, 10),
          role: "user",
        })
        .returning({ id: usersTable.id, role: usersTable.role })
    )[0];
  } catch (e) {
    res.status(500).send("Database error");
    console.error(e);
    return;
  }
  await createSession({ userId: user.id, role: user.role }, res);

  res.status(200).send({ userId: user.id, role: user.role });
};

const handleLogout = async (req: Request, res: Response) => {
  await deleteSession(res);
  res.status(200).send("Logout success");
};

const handleVerify = async (req: Request, res: Response) => {
  const verify = await verifySession(req);
  res.status(200).send(verify);
};

export { handleLogin, handleRegistration, handleLogout, handleVerify };
