require('dotenv').config()
const User = require('../models/User')
const jwt = require('jsonwebtoken')

class UsersController {
  // Lấy tất cả người dùng /user/getAllUsers
  getAllUsers(req, res, next) {
    User.getAll((err, results) => {
      if (err) {
        return res.status(500).json({ error: err })
      }
      res.json(results)
    })
  }

  // Thêm người dùng mới /user/newUser
  createUser(req, res, next) {
    const { username, password } = req.body
    if (!username || !password) {
      return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin.' })
    }

    User.create(username, password, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message })
      }

      // Kiểm tra nếu username đã tồn tại
      if (result.exists) {
        return res.status(409).json({ message: result.message })
      }

      // Trả về nếu tạo người dùng thành công
      res.status(201).json({ message: 'Đăng ký thành công', result: result.result })
    })
  }

  // Đăng nhập /user/login
  login(req, res, next) {
    const { username, password } = req.body
    if (!username || !password) {
      return res.status(400).json({ message: 'Vui lòng cung cấp tên người dùng và mật khẩu.' })
    }

    User.login(username, password, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err })
      }

      if (results.length > 0) {
        // Nếu tìm thấy người dùng
        const accessToken = jwt.sign({ results }, process.env.JWT_ACCESS_SECRET, {
          expiresIn: '1d'
        })
        res.json({ message: 'Đăng nhập thành công', user: results[0], accessToken: accessToken })
      } else {
        // Nếu không tìm thấy người dùng
        res.status(401).json({ message: 'Tên người dùng hoặc mật khẩu không chính xác.' })
      }
    })
  }
}

module.exports = new UsersController()
