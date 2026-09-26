import { type Request, type Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../lib/db.js";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      res.status(400).json({ message: "All fields must be filled in" });
      return;
    }

    const existingUser = await db.user.findUnique({ where: {email} });
    if (existingUser) {
      res.status(400).json({ message: "This email is already registred" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await db.user.create({
      data: {
        email,
        password: passwordHash,
        name
      }
    });

    const token = jwt.sign(
      { userId: newUser.id },
      process.env.JWT_SECRET || "jsonwebtokenSecretKey",
      { expiresIn: "30d" }
    );

    res.status(201).json({
      message: "Successful registration",
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      }
    });
  } catch (error) {
    console.log("Registration error:", error);
    res.status(500).json({ message: "Internal server error during registration" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "All fields must be filled in" });
      return;
    }

    const user = await db.user.findUnique({ where: {email} });
    if (!user) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || "jsonwebtokenSecretKey",
      { expiresIn: "30d" }
    );

    res.status(200).json({
      message: "Successful login",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.log("Authorization error:", error);
    res.status(500).json({ message: "Internal server error during authorization" });
  }
}