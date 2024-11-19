import { Request, Response } from "express";
import { db } from "../db/db";
import { eq } from "drizzle-orm";
import { usersTable } from "../db/schema";
import { UserResponse, UserUpdateFields } from "../lib/definitions";
import { deleteSession } from "../lib/session";

const sleep = async (delay: number) => {
  return new Promise((res) => {
    setTimeout(res, delay);
  });
};

/* User Controllers */
const getOwnUser = async (req: Request, res: Response) => {
  const { userId } = req.session!; // Session should always exist on this route
  let user: UserResponse;
  try {
    const userDB = await db.query.usersTable.findFirst({
      where: eq(usersTable.id, userId),
      columns: { password: false },
    });
    if (!userDB) {
      res.status(404).send("User does not exist");
      return;
    }

    user = {
      userId: userDB.id,
      name: userDB.name,
      email: userDB.email,
      role: userDB.role,
      mobile: userDB.mobile,
      position: userDB.position,
      description: userDB.description,
    };
  } catch (e) {
    res.status(500).send("Database error");
    console.error(e);
    return;
  }

  res.status(200).send(user);
};

const updateOwnUser = async (req: Request, res: Response) => {
  await sleep(500);

  const { userId } = req.session!; // Session should always exist on this route
  const userUpdate: UserUpdateFields = req.body;
  delete userUpdate.role; // Regular users should not be able to change their role - This should not be in the request, but removing here as a fallback
  let user: UserResponse;
  try {
    const userDB = (
      await db
        .update(usersTable)
        .set(userUpdate)
        .where(eq(usersTable.id, userId))
        .returning()
    )[0];
    if (!userDB) {
      res.status(404).send("User does not exist");
      return;
    }

    user = {
      userId: userDB.id,
      name: userDB.name,
      email: userDB.email,
      role: userDB.role,
      mobile: userDB.mobile,
      position: userDB.position,
      description: userDB.description,
    };
  } catch (e) {
    res.status(500).send("Database error");
    console.error(e);
    return;
  }

  res.status(200).send(user);
};

const deleteOwnUser = async (req: Request, res: Response) => {
  const { userId } = req.session!; // Session should always exist on this route

  try {
    await db.delete(usersTable).where(eq(usersTable.id, userId));
  } catch (e) {
    res.status(500).send("Database error");
    console.error(e);
    return;
  }

  // Remove the user's existing session
  await deleteSession(res);

  res.status(200).send("Profile deleted");
};

/* Admin Controllers */
const getUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  let user: UserResponse;
  try {
    const userDB = await db.query.usersTable.findFirst({
      where: eq(usersTable.id, Number(userId)),
      columns: { password: false },
    });
    if (!userDB) {
      res.status(404).send("User does not exist");
      return;
    }

    user = {
      userId: userDB.id,
      name: userDB.name,
      email: userDB.email,
      role: userDB.role,
      mobile: userDB.mobile,
      position: userDB.position,
      description: userDB.description,
    };
  } catch (e) {
    res.status(500).send("Database error");
    console.error(e);
    return;
  }

  res.status(200).send(user);
};

const updateUser = async (req: Request, res: Response) => {
  await sleep(500);
  const { userId } = req.params;
  const userUpdate: UserUpdateFields = req.body;
  let user: UserResponse;
  try {
    const userDB = (
      await db
        .update(usersTable)
        .set(userUpdate)
        .where(eq(usersTable.id, Number(userId)))
        .returning()
    )[0];
    if (!userDB) {
      res.status(404).send("User does not exist");
      return;
    }

    user = {
      userId: userDB.id,
      name: userDB.name,
      email: userDB.email,
      role: userDB.role,
      mobile: userDB.mobile,
      position: userDB.position,
      description: userDB.description,
    };
  } catch (e) {
    res.status(500).send("Database error");
    console.error(e);
    return;
  }

  res.status(200).send(user);
};

const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    await db.delete(usersTable).where(eq(usersTable.id, Number(userId)));
  } catch (e) {
    res.status(500).send("Database error");
    console.error(e);
    return;
  }

  res.status(200).send("Profile deleted");
};

const getUsers = async (req: Request, res: Response) => {
  let users: UserResponse[] = [];
  try {
    const usersDB = await db.query.usersTable.findMany({
      columns: { password: false },
    });
    usersDB.forEach((user) => {
      users.push({
        userId: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        mobile: user.mobile,
        position: user.position,
        description: user.description,
      });
    });
  } catch (e) {
    res.status(500).send("Database error");
    console.error(e);
    return;
  }

  res.status(200).send(users);
};

export {
  getOwnUser,
  updateOwnUser,
  deleteOwnUser,
  getUser,
  updateUser,
  deleteUser,
  getUsers,
};
