const User = require("../models/User");

const reqAuth = async (req, res, next) => {
  if (!req.session.access_token || !req.session.refresh_token) {
    return res.redirect("/api/auth/login");
  }

  if (Date.now() > req.session.expires_at) {
    return res.redirect("/api/auth/refresh");
  }

  // Fetch user from database
  try {
    const user = await User.findOne({ accessToken: req.session.access_token });

    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found, please log in again." });
    }

    req.user = user; // Set req.user so it's available in routes
    next();
  } catch (error) {
    console.error("Error in reqAuth middleware:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { reqAuth };
