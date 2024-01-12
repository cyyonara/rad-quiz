import User from "../models/userModel";
import IRequest from "../types/t.request";
import jwt, { JsonWebTokenError, JwtPayload, TokenExpiredError } from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { MongooseError } from "mongoose";

interface UserPayload extends JwtPayload {
  _id: string;
}

const protect = async (req: IRequest, res: Response, next: NextFunction): Promise<void> => {
  if (req.cookies.radquiz_auth) {
    try {
      const payload = jwt.verify(req.cookies.radquiz_auth, process.env.JWT_KEY_SECRET as string) as UserPayload;
      const user: IRequest["user"] = await User.findById(payload._id).select("-password");
      if (!user) throw new Error("Invalid Token");
      req.user = user;
      next();
    } catch (err: any) {
      if (err instanceof MongooseError) {
        res.clearCookie("radquiz_auth").status(500).json({ message: err.message });
      } else if (err instanceof TokenExpiredError) {
        res.clearCookie("radquiz_auth").status(401).json({ message: "Token is expired" });
      } else if (err instanceof JsonWebTokenError) {
        res.clearCookie("radquiz_auth").status(401).json({ message: "Token is manipulated" });
      } else {
        res.clearCookie("radquiz_auth").status(401).json({ message: err.message });
      }
    }
  } else {
    res.status(401).json({ message: "Token is missing" });
  }
};

export default protect;
