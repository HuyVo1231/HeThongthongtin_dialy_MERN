const express = require('express')
const router = express.Router()
const usersController = require('../app/controllers/UsersController')
const authenticateToken = require('../app/middleware/utillities').authenticateToken

router.get('/getAllUsers', authenticateToken, usersController.getAllUsers)
router.post('/newUser', usersController.createUser)
router.post('/login', usersController.login)
// router.post('/logout', usersController.logout)

module.exports = router
