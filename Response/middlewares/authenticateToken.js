import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.SECRET_KEY || "tHisIsAseCrEtKeY";

export const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "Unauthorized: Token missing" });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden: Token invalid" });
    req.user = decoded;
    next();
  });
};
