import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userModel } from "../models/User.js";

const SECRET_KEY = process.env.SECRET_KEY || "tHisIsAseCrEtKeY";

export const register = async (req, res) => {
  const { username, password } = req.body;
  const existing = await userModel.findOne({ username });
  if (existing) return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  await userModel.create({ username, password: hashedPassword });
  res.json({ message: "User registered successfully" });
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await userModel.findOne({ username });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ username: user.username }, SECRET_KEY);
  res.status(200).json({ message: "Login successful", token });
};

export const calculate = async (req, res, cache, expensiveFunction) => {
  const input = parseInt(req.params.value);
  const start = Date.now();
  let result, cacheStatus;

  if (cache.has(input)) {
    result = cache.get(input);
    cacheStatus = "HIT";
  } else {
    result = await expensiveFunction(input);
    cacheStatus = "MISS";
    cache.set(input, result);
  }

  const latency = Date.now() - start;
  console.log(`[${new Date().toISOString()}] Input: ${input}, Result: ${result}, Cache: ${cacheStatus}, Latency: ${latency}ms`);

  res.json({ result, cache: cacheStatus, latency: `${latency}ms` });
};
