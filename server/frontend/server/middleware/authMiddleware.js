import "dotenv/config";
import pkg from 'jsonwebtoken';
const { verify } = pkg;


function authMiddleware(req, res, next) {
  const token = req.header("token");

  if (!token) {
    return res.status(401).json({ error: "Não autorizado: Token em falta" });
  }

  try {
    const decoded = verify(token, process.env.jwtKEY);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Não autorizado: Token inválido" });
  }
}

export default authMiddleware;
