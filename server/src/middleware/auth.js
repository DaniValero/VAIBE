const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers["x-auth-token"];
  if (!token) return res.status(401).send("No hay token de acceso");

  try {
    const payload = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = payload;
    next();
  } catch (err) {
    res.status(400).send("Token invalido");
  }
};
