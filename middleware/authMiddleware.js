import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // Get the Authorization header
  const authHeader = req.header("Authorization");

  // Check if Authorization header exists
  if (!authHeader) {
    return res.status(401).json({ message: "Access Denied" });
  }

  // Extract the token - handle both with and without "Bearer " prefix
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.substring(7) // Remove "Bearer " prefix
    : authHeader;

  try {
    // Verify the token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Add user data to request
    req.user = verified;

    // Proceed to the next middleware/route handler
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    res.status(401).json({ message: "Invalid Token" });
  }
};

export default authMiddleware;