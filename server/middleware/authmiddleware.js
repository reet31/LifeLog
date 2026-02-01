import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  console.log("TOKEN:", token);

  if (!token) {
    return res.status(401).json({ authenticated: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("DECODED USER:", decoded); 
    req.user = decoded;

    next();
  } catch (err) {
     console.error("JWT ERROR:", err.message);
    return res.status(401).json({ authenticated: false });
  }
};
