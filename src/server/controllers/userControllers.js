const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const userController = {};
userController.createUser = async (req, res, next) => {
  const { name, lastname, email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (user) {
        console.log("User couldn't be created. Another user was previously created")
        return res.status(200).json({msg: "User couldn't be created. Another user was previously created"});
    } else {
      user = new User({ name, lastname, email, password });
      user.password = await bcryptjs.hash(req.body.password, 10);
      const savedUser = await user.save();
      res.locals.user = savedUser;
      next();
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      const baseError = {
        message: 'ValidationError',
        status: `${err}`,
      };
      return next({ error: err.errors, ...baseError });
    } else {
      const baseError = {
        message: 'Error trying to create new User',
        status: `${err}`,
      };
      return next({ error: err.errors, ...baseError });
    }
  }
};

module.exports = userController;
