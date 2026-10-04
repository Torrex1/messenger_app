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
      res.status(409).json({ message: "This email is already registered" });
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

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("jwt secret key is not defined");
    }

    const token = jwt.sign(
      { userId: newUser.id },
      secret,
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

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("jwt secret key is not defined");
    }

    const token = jwt.sign(
      { userId: user.id },
      secret,
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

export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = await db.user.findUnique({
      where: {
        id: req.userId
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    })

    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch(error) {
    console.log("Get current user error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}