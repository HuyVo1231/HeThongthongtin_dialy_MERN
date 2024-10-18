require('dotenv').config()
const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']

  const token = authHeader && authHeader.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Access Token is missing' })

  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
    if (err) return res.status(401).json({ message: 'Invalid Token' })
    req.user = user
    next()
  })
}

module.exports = {
  authenticateToken
}
