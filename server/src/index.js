const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const route = require('./routes/')
const cors = require('cors')

// Set up CORS options
var corsOptions = {
  origin: process.env.DOMAIN_ORIGIN,
  optionsSuccessStatus: 200
}

// Use CORS middleware
app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

// Route init
route(app)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})