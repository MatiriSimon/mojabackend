import { Router, Request, Response } from "express";

const router = Router();

router.get("/ping", (req: Request, res: Response): void => {
  res.json({ message: "pong" });
});

export default router;
