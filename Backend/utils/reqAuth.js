const reqAuth = (req, res, next) => {
  if (!req.session.access_token || !req.session.refresh_token) {
    return res.redirect("/api/auth/login");
  }

  if (Date.now() > req.session.expires_at) {
    return res.redirect("/api/auth/refresh");
  }

  next();
};

module.exports = { reqAuth };
