const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');
const authMiddleware = require('../middleware/authMiddleware');
router.post('/', authController.createUserAuthentication, (req, res) => {
  return res.status(200).json({ token: res.locals.token });
  //cockie
});
router.get(
  '/',
  authMiddleware,
  authController.getUserAuthenticated,
  (req, res) => {
    return res.status(200).json({ userAuthId: res.locals.userAuth });
  }
);
module.exports = router;
