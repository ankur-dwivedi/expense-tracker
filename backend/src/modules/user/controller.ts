import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { create, get } from "../../models/user/services";
import { generateError } from "../../utils/error";
import { generateAccessToken } from "../../utils/general";
import { UserDocument } from "../../models/user";

export const auth = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const userTypedPassword = req.body.password;
    const query = {
      email: req.body.email,
      password: userTypedPassword,
    };

    const user: UserDocument = await get(query);

    if (!user || typeof user !== "object") {
      return generateError("User not found");
    }

    const { password, ...userData } = user;

    if (password === undefined) {
      return generateError("Password not found");
    }

    const match = await bcrypt.compare(userTypedPassword, password);

    if (!match) {
      return generateError("Invalid credentials");
    }

    const plainUser = user.toObject();
    delete plainUser.password;

    return res.send({
      status: 200,
      success: true,
      data: {
        ...plainUser,
        accessToken: generateAccessToken(user._id),
      },
    });
  } catch (err: any) {
    res.status(400).send({ message: err.message });
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const user: UserDocument = await create(req.body);

    if (!user || typeof user !== "object") {
      return generateError("User not created");
    }

    return res.send({
      status: 200,
      success: true,
    });
  } catch (err: any) {
    res.status(400).send({ message: err.message });
  }
};
