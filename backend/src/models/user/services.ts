import bcrypt from "bcrypt";

import { generateError } from "../../utils/error";
import User, { UserDocument } from ".";

interface Query {
  email: string;
}

export const get = async (query: Query) => {
  return User.findOne({ email: query.email })
    .then((res) => res || generateError())
    .catch((err) => err);
};

export const create = async (userData: UserDocument) => {
  if (userData && userData.password)
    userData.password = await bcrypt.hash(userData.password, 10);
  return User.create({ ...userData, createdAt: new Date() }).then(
    (response) => response
  );
};

export const passwordCompare = async (
  password: string,
  storedPassword: string
): Promise<boolean | { errName: string; errMessage: string }> => {
  try {
    const match = await bcrypt.compare(password, storedPassword);
    return match;
  } catch (err: any) {
    return { errName: err.name, errMessage: err.message };
  }
};
