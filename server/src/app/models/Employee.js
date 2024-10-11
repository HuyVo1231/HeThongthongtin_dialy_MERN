const db = require('../../config/db')

const Employee = {
  // Lấy tất cả nhân viên
  getAllEmployees: (callback) => {
    const sql = 'SELECT * FROM employees'
    db.query(sql, (err, results) => {
      if (err) {
        return callback(err)
      }
      return callback(null, results)
    })
  },

  // Tạo nhân viên mới
  createEmployee: (employeeInfo, callback) => {
    const sql =
      'INSERT INTO employees (name, phone, email, position, address) VALUES (?, ?, ?, ?, ?)'
    const { name, phone, email, position, address } = employeeInfo
    db.query(sql, [name, phone, email, position, address], (err, results) => {
      if (err) {
        return callback(err)
      }
      return callback(null, results)
    })
  },

  // Cập nhật nhân viên
  updateEmployee: (id, employeeInfo, callback) => {
    const fields = []
    const values = []

    if (employeeInfo.name) {
      fields.push('name = ?')
      values.push(employeeInfo.name)
    }
    if (employeeInfo.phone) {
      fields.push('phone = ?')
      values.push(employeeInfo.phone)
    }
    if (employeeInfo.email) {
      fields.push('email = ?')
      values.push(employeeInfo.email)
    }
    if (employeeInfo.position) {
      fields.push('position = ?')
      values.push(employeeInfo.position)
    }
    if (employeeInfo.address) {
      fields.push('address = ?')
      values.push(employeeInfo.address)
    }

    if (fields.length === 0) {
      return callback(new Error('Không có dữ liệu để cập nhật'))
    }

    values.push(id)
    const sql = `UPDATE employees SET ${fields.join(', ')} WHERE id = ?`

    db.query(sql, values, (err, result) => {
      if (err) {
        return callback(err)
      }
      return callback(null, result)
    })
  },

  // Xóa nhân viên
  deleteEmployee: (idEmployee, callback) => {
    const sql = 'DELETE FROM employees WHERE id = ?'
    db.query(sql, [idEmployee], (err, result) => {
      if (err) {
        return callback(err)
      }
      return callback(null, result)
    })
  },

  // Kiểm tra nhân viên đã tồn tại bằng Email
  checkEmailExists: (email, callback) => {
    const sql = 'SELECT * FROM employees WHERE email = ?'
    db.query(sql, [email], (err, result) => {
      if (err) {
        return callback(err)
      }

      const emailExists = result.length > 0
      return callback(null, emailExists)
    })
  },

  // Kiểm tra nhân viên đã tồn tại bằng ID
  checkIdExists: (idEmployee, callback) => {
    const sql = 'SELECT * FROM employees WHERE id = ?'
    db.query(sql, [idEmployee], (err, result) => {
      if (err) {
        return callback(err)
      }

      const employeeExists = result.length > 0
      return callback(null, employeeExists)
    })
  }
}

module.exports = Employee
