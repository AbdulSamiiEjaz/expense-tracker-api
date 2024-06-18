import express from "express";
import userRouter from "./user.routes";

const router = express.Router();

router.get("/healthcheck", (_, res) => {
  return res.status(200).send();
});

router.use(userRouter);

export default router;
