import { Request, Response, NextFunction } from "express";
import { expressjwt } from "express-jwt";
import User from "../../models/user";
import { createUnauthorizedError } from "../../utils/general";

interface AuthenticatedRequest extends Request {
  user?: any;
}

const verifyAccessToken = expressjwt({
  secret: process.env.ACCESS_TOKEN_SECRET as string,
  algorithms: ["HS256"],
  requestProperty: "user",
});

const assocAuthUser = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) =>
  User.findById(req.user.userId)
    .select("-password")
    .then((user) => {
      if (!user) {
        res.send(createUnauthorizedError("User not found"));
      } else {
        req.user = user.toObject();
        next();
      }
    })
    .catch((error) => res.send(createUnauthorizedError(error)));

export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = (req as any).user;

  if (!user || user.role !== "admin") {
    return res
      .status(403)
      .json(createUnauthorizedError("Admin access required"));
  }

  next();
};

export const withAuthUser = [verifyAccessToken, assocAuthUser];

export { verifyAccessToken, assocAuthUser };
