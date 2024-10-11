const Customer = require('../models/Customer')

class CustomerController {
  // http://localhost:3000/customer/getAllCustomers
  getAllCustomers(req, res, next) {
    Customer.getAllCustomers((err, results) => {
      if (err) {
        return res.status(500).json({ error: err })
      }
      res.json(results)
    })
  }

  // http://localhost:3000/customer/createCustomer
  createCustomer(req, res, next) {
    const { name, phone, email, address } = req.body

    // Kiểm tra Customer đã tồn tại chưa (dựa trên email)
    Customer.checkEmailExists(email, (err, emailExists) => {
      if (err) {
        return res.status(500).json({ error: true, message: err.message })
      }

      if (emailExists) {
        return res.status(400).json({ error: true, message: 'Email đã tồn tại' })
      }

      // Nếu chưa có email, tạo mới Customer
      Customer.createCustomer({ name, phone, email, address }, (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message })
        }
        res.status(201).json({ message: 'Thêm mới khách hàng thành công', result })
      })
    })
  }

  // http://localhost:3000/customer/editCustomer/:idCustomer
  editCustomer(req, res, next) {
    const { idCustomer } = req.params
    const { name, email, phone, address } = req.body

    // Kiểm tra xem khách hàng có tồn tại dựa trên id
    Customer.checkIdExists(idCustomer, (err, customerExists) => {
      if (err) {
        return res.status(500).json({ error: true, message: err.message })
      }

      if (!customerExists) {
        return res.status(400).json({ error: true, message: 'Khách hàng không tồn tại' })
      }

      // Chỉ lấy những field nào có giá trị
      const customerInfo = {}
      if (name) customerInfo.name = name
      if (email) customerInfo.email = email
      if (phone) customerInfo.phone = phone
      if (address) customerInfo.address = address

      if (Object.keys(customerInfo).length === 0) {
        return res.status(400).json({ error: true, message: 'Không có dữ liệu để cập nhật' })
      }

      // Update customer
      Customer.updateCustomer(idCustomer, customerInfo, (err, result) => {
        if (err) {
          return res.status(500).json({ error: true, message: err.message })
        }

        return res.status(200).json({ message: 'Cập nhật khách hàng thành công', result })
      })
    })
  }

  // http://localhost:3000/customer/deleteCustomer/:idCustomer
  deleteCustomer(req, res, next) {
    const { idCustomer } = req.params

    // Kiểm tra xem khách hàng có tồn tại không (dựa trên id)
    Customer.checkIdExists(idCustomer, (err, customerExists) => {
      if (err) {
        return res.status(500).json({ error: true, message: err.message })
      }

      if (!customerExists) {
        return res.status(404).json({ error: true, message: 'Khách hàng không tồn tại' })
      }

      // Xóa khách hàng
      Customer.deleteCustomer(idCustomer, (err, result) => {
        if (err) {
          return res.status(500).json({ error: true, message: err.message })
        }

        return res.status(200).json({ message: 'Xóa khách hàng thành công', result })
      })
    })
  }
}

module.exports = new CustomerController()
