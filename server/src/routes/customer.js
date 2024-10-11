const express = require('express')
const router = express.Router()
const customersController = require('../app/controllers/CustomersController')
const authenticateToken = require('../app/middleware/utillities').authenticateToken

router.get('/getAllCustomers', customersController.getAllCustomers)
router.post('/createCustomer', customersController.createCustomer)
router.put('/editCustomer/:idCustomer', customersController.editCustomer)
router.delete('/deleteCustomer/:idCustomer', customersController.deleteCustomer)

module.exports = router
