const express = require('express')
const router = express.Router()
const employeeController = require('../app/controllers/EmployeesController')
const authenticateToken = require('../app/middleware/utillities').authenticateToken

router.get('/getAllEmployees', employeeController.getAllEmployees)
router.post('/createEmployee', employeeController.createEmployee)
router.put('/editEmployee/:idEmployee', employeeController.editEmployee)
router.delete('/deleteEmployee/:idEmployee', employeeController.deleteEmployee)

module.exports = router
