const userRouter = require('./user')
const markerRouter = require('./marker')
const customerRouter = require('./customer')
const employeeRouter = require('./employee')

function route(app) {
  app.use('/user', userRouter)
  app.use('/marker', markerRouter)
  app.use('/customer', customerRouter)
  app.use('/employee', employeeRouter)
}

module.exports = route
