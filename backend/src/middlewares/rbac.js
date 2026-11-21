const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    // req.user should be populated by an auth middleware
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: "Forbidden. Insufficient permissions." 
      });
    }

    next();
  };
};

module.exports = { checkRole };
