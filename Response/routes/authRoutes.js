import express from "express";
import { register, login, calculate } from "../controllers/authController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";
import { expensiveFunction } from "../utils/expensiveFunction.js";
import { LRUCache } from "lru-cache";

const router = express.Router();
const cache = new LRUCache({ max: 15 });

router.post("/register", register);
router.post("/login", login);
router.get("/calculate/:value", authenticateToken, (req, res) =>
  calculate(req, res, cache, expensiveFunction)
);

export default router;
