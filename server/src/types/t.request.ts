import { HydratedDocument } from "mongoose";
import { IUser } from "./t.user";
import { Request } from "express";

export default interface IRequest extends Request {
  user?: HydratedDocument<IUser>;
}
