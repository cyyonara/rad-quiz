import mongoose, { InferSchemaType } from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_KEY_SECRET as string, { expiresIn: "60d" });
};

interface M_User extends InferSchemaType<typeof userSchema> {
  username: string;
  password: string;
  generateToken: () => void;
}

export default mongoose.model<M_User>("User", userSchema);
