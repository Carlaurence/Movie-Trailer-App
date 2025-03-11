const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secretConfig } = require('../../../config');

exports.createUserAuthentication = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({ msg: "User doesn't exist" });
    } else {
      const comparePassword = await bcryptjs.compare(password, user.password);
      if (!comparePassword)
        return res.status(401).json({ msg: 'email or password incorrect' });

      const payload = {
        userAuth: { id: user.id },
      };

      jwt.sign(
        payload,
        secretConfig.word,
        { expiresIn: '1h' },
        (error, token) => {
          if (error) throw error;
          res.locals.token = token;
          // console.log({ token: res.locals.token });
          next();
        }
      );
    }
  } catch (err) {
    const baseError = {
      message: 'Error trying to authenticate User',
      status: `${err}`,
    };
    return next({ error: err.errors, ...baseError });
  }
};

exports.getUserAuthenticated = async (req, res, next) => {
  const { id } = req.userAuthId;
  try {
    const userAuth = await User.findById(id);
    res.locals.userAuth = userAuth;
    // console.log({ userAuth: res.locals.userAuth });
    next();
  } catch (err) {
    const baseError = {
      message: 'Error trying to authenticate User',
      status: `${err}`,
    };
    return next({ error: err.errors, ...baseError });
  }
};

//Crear Authentication con Cockies, HTTPOnly 
/**
 * const jwt = require('jsonwebtoken');
const { secretConfig } = require('../../../config');

exports.createUserAuthentication = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({ msg: "User doesn't exist" });
    } else {
      const comparePassword = await bcryptjs.compare(password, user.password);
      if (!comparePassword)
        return res.status(401).json({ msg: 'email or password incorrect' });

      const payload = { userAuth: { id: user.id } };

      // Generar el JWT
      jwt.sign(payload, secretConfig.word, { expiresIn: '1h' }, (error, token) => {
        if (error) throw error;

        // Establecer la cookie HttpOnly
        res.cookie('token', token, {
          httpOnly: true, // La cookie no será accesible por JavaScript
          secure: process.env.NODE_ENV === 'production', // Usar 'secure' solo en producción (requiere HTTPS)
          sameSite: 'Strict', // Previene el envío de la cookie en solicitudes entre sitios
          maxAge: 3600000, // 1 hora de duración
        });

        return res.status(200).json({ msg: 'Authentication successful' });
      });
    }
  } catch (err) {
    const baseError = {
      message: 'Error trying to authenticate User',
      status: `${err}`,
    };
    return next({ error: err.errors, ...baseError });
  }
};

 */
