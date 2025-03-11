const jwt = require('jsonwebtoken');
const { secretConfig } = require('../../../config');
module.exports = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'there is no token' });
  try {
    const jwtPayload = await jwt.verify(token, secretConfig.word);
    //jwtPayload should return payload = { userAuth: { id: user.id }}
    /**
     * jwtPayload: {
        userAuth: { id: '675a772d6bc0066b9fa2356d' },
        iat: 1734016192,
        exp: 1734019792
        }
     */
    //set headers
    req.userAuthId = jwtPayload.userAuth; // { id: '675a772d6bc0066b9fa2356d' }
    next();
  } catch (err) {
    console.error('Catch error:', err);
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ msg: 'token expired' });
    } else if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ msg: 'invalid token' });
    } else {
      return res.status(500).json({ msg: 'server error trying to auth user' });
    }
  }
};

//Middleware para validar token desde la cockies
/**
 * const jwt = require('jsonwebtoken');
const { secretConfig } = require('../../../config');

module.exports = async (req, res, next) => {
  const token = req.cookies.token; // Recupera el token de la cookie

  if (!token) {
    return res.status(401).json({ msg: 'Token is missing or expired' });
  }

  try {
    const decoded = jwt.verify(token, secretConfig.word);
    req.userAuthId = decoded.userAuth; // Añadir el payload al objeto request
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    return res.status(401).json({ msg: 'Invalid or expired token' });
  }
};

 */
