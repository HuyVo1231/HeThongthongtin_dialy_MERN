const db = require('../../config/db')

const Customer = {
  // Lấy tất cả khách hàng
  getAllCustomers: (callback) => {
    const sql = 'SELECT * FROM customers'
    db.query(sql, (err, results) => {
      if (err) {
        return callback(err)
      }
      return callback(null, results)
    })
  },

  // Tạo khách hàng mới
  createCustomer: (customerInfo, callback) => {
    const sql = 'INSERT INTO customers (name, phone, email, address) VALUES (?, ?, ?, ?)'
    const { name, phone, email, address } = customerInfo
    db.query(sql, [name, phone, email, address], (err, results) => {
      if (err) {
        return callback(err)
      }
      return callback(null, results)
    })
  },

  // Cập nhật khách hàng
  updateCustomer: (id, customerInfo, callback) => {
    const fields = []
    const values = []

    if (customerInfo.name) {
      fields.push('name = ?')
      values.push(customerInfo.name)
    }
    if (customerInfo.phone) {
      fields.push('phone = ?')
      values.push(customerInfo.phone)
    }
    if (customerInfo.email) {
      fields.push('email = ?')
      values.push(customerInfo.email)
    }
    if (customerInfo.address) {
      fields.push('address = ?')
      values.push(customerInfo.address)
    }

    if (fields.length === 0) {
      return callback(new Error('Không có dữ liệu để cập nhật'))
    }

    values.push(id)
    const sql = `UPDATE customers SET ${fields.join(', ')} WHERE id = ?`

    db.query(sql, values, (err, result) => {
      if (err) {
        return callback(err)
      }
      return callback(null, result)
    })
  },

  // Xóa khách hàng
  deleteCustomer: (idCustomer, callback) => {
    const sql = 'DELETE FROM customers WHERE id = ?'
    db.query(sql, [idCustomer], (err, result) => {
      if (err) {
        return callback(err)
      }
      return callback(null, result)
    })
  },

  // Kiểm tra customer đã tồn tại bằng Email
  checkEmailExists: (email, callback) => {
    const sql = 'SELECT * FROM customers WHERE email = ?'
    db.query(sql, [email], (err, result) => {
      if (err) {
        return callback(err)
      }

      const emailExists = result.length > 0
      return callback(null, emailExists)
    })
  },

  // Kiểm tra customer đã tồn tại bằng ID
  checkIdExists: (idCustomer, callback) => {
    const sql = 'SELECT * FROM customers WHERE id = ?'
    db.query(sql, [idCustomer], (err, result) => {
      if (err) {
        return callback(err)
      }

      const customerExists = result.length > 0
      return callback(null, customerExists)
    })
  }
}

module.exports = Customer
