import { Router } from "express";
import { auth, createUser } from "./controller";
import { validate } from "../../middlewares/schema";
import { authContract, createUserContract } from "./contract";

const userRouter = Router();

userRouter.post("/auth", validate("body", authContract), auth);
userRouter.post("/create", validate("body", createUserContract), createUser);

export default userRouter;
