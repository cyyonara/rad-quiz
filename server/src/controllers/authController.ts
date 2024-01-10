import User from "../models/User";
import handler from "express-async-handler";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { LoginFormData, SignupFormdata } from "../types/t.auth";

// @POST - public - /api/auth/signup
const signup = handler(async (req: Request, res: Response): Promise<void> => {
  const { username, password }: SignupFormdata = req.body;

  if (!username || !password) {
    res.status(400);
    throw new Error("Username and password fields shall not be empty.");
  }

  if (password.split("").length < 8) {
    res.status(400);
    throw new Error("Please create a stronger password");
  }

  const user = new User({
    username: username.trim(),
    password: password.trim(),
  });

  if (await User.exists({ username })) {
    res.status(400);
    throw new Error("Username already in use. Please try another one");
  } else {
    user.password = bcrypt.hashSync(user.password, 10);
    const token = user.generateToken();
    await user.save();
    res
      .status(201)
      .cookie("radquiz_auth", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 60 })
      .json({ _id: user._id, username: user.username, image: user.image });
  }
});

// @POST - public - /api/auth/login
const login = handler(async (req: Request, res: Response): Promise<void> => {
  const { username, password }: LoginFormData = req.body;
  const user = await User.findOne({ username });

  console.log(username);

  if (!user) {
    res.status(400);
    throw new Error("Invalid username or password");
  } else if (!(await bcrypt.compare(password, user.password))) {
    res.status(400);
    throw new Error("Invalid username or password");
  } else {
    const token = user.generateToken();
    res
      .status(201)
      .cookie("radquiz_auth", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 60 })
      .json({ _id: user._id, username: user.username, image: user.image });
  }
});

export { signup, login };
