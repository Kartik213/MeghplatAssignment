const jwt = require("jsonwebtoken");
const User = require("./models/user");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const jwtSecret = process.env.JWT_SECRET || "somethingveryhardtoguess";
      const decoded = jwt.verify(token, jwtSecret);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "User not authorized" });
    }
  }
  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

const isAuthorized = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const jwtSecret = process.env.JWT_SECRET || "somethingveryhardtoguess";
      const decoded = jwt.verify(token, jwtSecret);
      const user = await User.findById(decoded.id).select("-password");
      if(user.isAdmin){
        next();
      }else{
        res.status(401).json({ message: "User not authorized to access admin routes" });
      }
    } catch (error) {
      res.status(401).json({ message: "User not authorized" });
    }
  }
  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect, isAuthorized };
