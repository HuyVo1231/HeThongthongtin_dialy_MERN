const userRouter = require('./user')
const markerRouter = require('./marker')
const customerRouter = require('./customer')
const employeeRouter = require('./employee')
const { authenticateToken } = require('../app/middleware/utillities')

function route(app) {
  app.use('/user', userRouter)
  app.use('/marker', authenticateToken, markerRouter)
  app.use('/customer', authenticateToken, customerRouter)
  app.use('/employee', authenticateToken, employeeRouter)
}

module.exports = route
