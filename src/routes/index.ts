import express from "express";
import userRouter from "./user.routes";
import authRouter from "./auth.routes";
import categoryRouter from "./category.routes";
import expenseRouter from "./expense.routes";

const router = express.Router();

router.get("/healthcheck", (_, res) => {
  return res.status(200).send();
});

router.use(userRouter);
router.use(authRouter);
router.use(categoryRouter);
router.use(expenseRouter);

export default router;
