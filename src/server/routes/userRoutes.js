const express = require('express');
const userController = require('../controllers/userControllers');
const router = express.Router();
router.post('/', userController.createUser, (req, res) => {return res.status(201).json(res.locals.user)});
module.exports = router;
