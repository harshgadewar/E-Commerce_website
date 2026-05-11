export const isadmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ messsage: "please login first" });
    } else if (req.user.role != "admin") {
      return res.status(403).json({ message: "Acccess denied , admin only!!" });
    }

    next();
  } catch (e) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
