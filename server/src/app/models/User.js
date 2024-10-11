const db = require('../../config/db')

const User = {
  // Hàm lấy tất cả người dùng
  getAll: (callback) => {
    const sql = 'SELECT * FROM users'
    db.query(sql, (err, results) => {
      if (err) {
        return callback(err)
      }
      return callback(null, results)
    })
  },

  // Hàm thêm người dùng mới
  create: (username, password, callback) => {
    // Kiểm tra xem username đã tồn tại chưa
    const checkSql = 'SELECT * FROM users WHERE username = ?'
    db.query(checkSql, [username], (err, results) => {
      if (err) {
        return callback(err)
      }

      // Nếu username đã tồn tại, trả về lỗi với thông báo chi tiết
      if (results.length > 0) {
        return callback(null, { exists: true, message: 'Username đã tồn tại' })
      }

      // Nếu username không tồn tại, thực hiện thêm người dùng mới
      const insertSql = 'INSERT INTO users (username, password) VALUES (?, ?)'
      db.query(insertSql, [username, password], (err, result) => {
        if (err) {
          return callback(err)
        }
        return callback(null, { exists: false, result })
      })
    })
  },

  // Hàm kiểm tra thông tin đăng nhập
  login: (username, password, callback) => {
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?'
    db.query(sql, [username, password], (err, results) => {
      if (err) {
        return callback(err)
      }
      return callback(null, results)
    })
  }
}

module.exports = User
