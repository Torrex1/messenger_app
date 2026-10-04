import { type Request, type Response, type NextFunction } from "express"
import jwt from "jsonwebtoken"

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
):void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ messagee: "Authorization header is missing" });
    return;
  }

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    res.status(401).json({ message: "Invalid authorization format" });
    return;
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("jwt secret key is not defined");
  }

  try {
    const decoded = jwt.verify(token, secret);

    if (typeof decoded !== "object" || !("userId" in decoded)) {
      res.status(401).json({ message: "Invalid token payload" });
      return;
    }

    req.userId = decoded.userId;
    next();
  } catch(error) {
    res.status(401).json({ message: "Invalid or expired token" })
  }
}