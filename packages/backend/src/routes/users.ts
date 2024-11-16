import { Router } from "express";
import {
  getOwnUser,
  updateOwnUser,
  deleteOwnUser,
  getUser,
  updateUser,
  deleteUser,
  getUsers,
} from "../controllers/usersController";
import { authUser, authAdmin } from "../lib/authMiddleware";

const usersRouter = Router();

// Apply auth middleware to all 'users' routes
usersRouter.use(authUser);

usersRouter.get("/me", getOwnUser); // Retrieves a user's own profile info
usersRouter.patch("/me", updateOwnUser); // Updates a user's own profile info
usersRouter.delete("/me", deleteOwnUser); // Deletes a user's own profile info

// Admin only endpoints with additional middleware
usersRouter.get("/", authAdmin, getUsers); // Retrieves all user profiles
usersRouter.get("/:userId", authAdmin, getUser); // Retrieves a particular user profile
usersRouter.patch("/:userId", authAdmin, updateUser); // Updates a particular user profile
usersRouter.delete("/:userId", authAdmin, deleteUser); // Deletes a particular user profile

export { usersRouter };
