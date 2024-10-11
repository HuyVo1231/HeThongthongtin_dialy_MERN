const Employee = require('../models/Employee')

class EmployeeController {
  // /employee/getAllEmployees
  getAllEmployees(req, res, next) {
    Employee.getAllEmployees((err, results) => {
      if (err) {
        return res.status(500).json({ error: err })
      }
      res.json(results)
    })
  }

  // /employee/createEmployee
  createEmployee(req, res, next) {
    const { name, phone, email, position, address } = req.body

    // Kiểm tra Employee đã tồn tại chưa (dựa trên email)
    Employee.checkEmailExists(email, (err, emailExists) => {
      if (err) {
        return res.status(500).json({ error: true, message: err.message })
      }

      if (emailExists) {
        return res.status(400).json({ error: true, message: 'Email đã tồn tại' })
      }

      // Nếu chưa có email, tạo mới Employee
      Employee.createEmployee({ name, phone, email, position, address }, (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message })
        }
        res.status(201).json({ message: 'Thêm mới nhân viên thành công', result })
      })
    })
  }

  // /employee/editEmployee/:idEmployee
  editEmployee(req, res, next) {
    const { idEmployee } = req.params
    const { name, email, phone, position, address } = req.body

    // Kiểm tra xem nhân viên có tồn tại dựa trên id
    Employee.checkIdExists(idEmployee, (err, employeeExists) => {
      if (err) {
        return res.status(500).json({ error: true, message: err.message })
      }

      if (!employeeExists) {
        return res.status(400).json({ error: true, message: 'Nhân viên không tồn tại' })
      }

      // Chỉ lấy những field nào có giá trị
      const employeeInfo = {}
      if (name) employeeInfo.name = name
      if (email) employeeInfo.email = email
      if (phone) employeeInfo.phone = phone
      if (position) employeeInfo.position = position
      if (address) employeeInfo.address = address

      if (Object.keys(employeeInfo).length === 0) {
        return res.status(400).json({ error: true, message: 'Không có dữ liệu để cập nhật' })
      }

      // Update employee
      Employee.updateEmployee(idEmployee, employeeInfo, (err, result) => {
        if (err) {
          return res.status(500).json({ error: true, message: err.message })
        }

        return res.status(200).json({ message: 'Cập nhật nhân viên thành công', result })
      })
    })
  }

  // /employee/deleteEmployee/:idEmployee
  deleteEmployee(req, res, next) {
    const { idEmployee } = req.params

    // Kiểm tra xem nhân viên có tồn tại không (dựa trên id)
    Employee.checkIdExists(idEmployee, (err, employeeExists) => {
      if (err) {
        return res.status(500).json({ error: true, message: err.message })
      }

      if (!employeeExists) {
        return res.status(404).json({ error: true, message: 'Nhân viên không tồn tại' })
      }

      // Xóa nhân viên
      Employee.deleteEmployee(idEmployee, (err, result) => {
        if (err) {
          return res.status(500).json({ error: true, message: err.message })
        }

        return res.status(200).json({ message: 'Xóa nhân viên thành công', result })
      })
    })
  }
}

module.exports = new EmployeeController()
