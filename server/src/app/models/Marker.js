// models/Marker.js
const db = require('../../config/db')
const { calculateStatistics } = require('../services/statisticsService')
const { getLineChartData } = require('../services/chartService')
const { formatDate } = require('../helpers/dateHelper')

const Marker = {
  // Hàm lấy tất cả markers
  getAll: (callback) => {
    const sql = 'SELECT * FROM markers'
    db.query(sql, (err, results) => {
      if (err) {
        return callback(err)
      }
      return callback(null, results)
    })
  },

  // Hàm thêm Marker mới
  create: (markerData, callback) => {
    const {
      marker_lat,
      marker_lng,
      marker_name,
      marker_cover,
      marker_address,
      marker_phone,
      marker_description
    } = markerData

    const checkSql = 'SELECT * FROM markers WHERE marker_lat = ? AND marker_lng = ?'
    db.query(checkSql, [marker_lat, marker_lng], (err, results) => {
      if (err) {
        return callback(err)
      }

      if (results.length > 0) {
        return callback(null, { exists: true, message: 'Marker tại vị trí này đã tồn tại' })
      }

      const insertSql =
        'INSERT INTO markers (marker_lat, marker_lng, marker_name, marker_cover, marker_address, marker_phone, marker_description) VALUES (?, ?, ?, ?, ?, ?, ?)'
      db.query(
        insertSql,
        [
          marker_lat,
          marker_lng,
          marker_name,
          marker_cover,
          marker_address,
          marker_phone,
          marker_description
        ],
        (err, result) => {
          if (err) {
            return callback(err)
          }
          return callback(null, { exists: false, result })
        }
      )
    })
  },

  // Hàm edit 1 Marker
  edit: (markerData, callback) => {
    const {
      marker_id,
      marker_lat,
      marker_lng,
      marker_name,
      marker_cover,
      marker_address,
      marker_phone,
      marker_description
    } = markerData

    // Kiểm tra marker có tồn tại hay không
    const checkSql = 'SELECT * FROM markers WHERE marker_id = ?'
    db.query(checkSql, [marker_id], (err, results) => {
      if (err) {
        return callback(err)
      }

      if (results.length <= 0) {
        return callback(null, { exists: false, message: 'Marker không tồn tại' })
      }

      // Lấy marker cũ
      const oldMarker = results[0]

      // Chỉ cập nhật các trường không bị null hoặc undefined
      const updateSql = `
      UPDATE markers 
      SET 
        marker_lat = ?, 
        marker_lng = ?, 
        marker_name = ?, 
        marker_cover = ?, 
        marker_address = ?, 
        marker_phone = ?, 
        marker_description = ?
      WHERE marker_id = ?
    `

      db.query(
        updateSql,
        [
          marker_lat || oldMarker.marker_lat,
          marker_lng || oldMarker.marker_lng,
          marker_name || oldMarker.marker_name,
          marker_cover || oldMarker.marker_cover,
          marker_address || oldMarker.marker_address,
          marker_phone || oldMarker.marker_phone,
          marker_description || oldMarker.marker_description,
          marker_id
        ],
        (err, result) => {
          if (err) {
            return callback(err)
          }
          return callback(null, { exists: true, result })
        }
      )
    })
  },

  // Delete 1 marker
  delete: (marker_id, callback) => {
    const sql = 'DELETE FROM markers WHERE marker_id = ?'
    db.query(sql, [marker_id], (err, result) => {
      if (err) {
        return callback(err)
      }
      return callback(null, result)
    })
  },

  // Get statistic at marker with invoice details and products
  getStatisticById: (marker_id, startDate, endDate, callback) => {
    // Khởi tạo điều kiện ngày mặc định: từ 1 năm trước đến ngày hiện tại
    let dateCondition = ''
    const currentDate = new Date().toISOString().split('T')[0]
    const pastDate = new Date()
    pastDate.setDate(pastDate.getDate() - 365)
    const pastDateFormatted = pastDate.toISOString().split('T')[0]

    // Nếu có startDate và endDate, sử dụng chúng để tạo điều kiện lọc
    if (startDate && endDate) {
      dateCondition = `AND invoice_date BETWEEN '${startDate}' AND '${endDate}'`
    } else {
      // Nếu không, sử dụng điều kiện từ 1 năm trước đến hiện tại
      dateCondition = `AND invoice_date BETWEEN '${pastDateFormatted}' AND '${currentDate}'`
    }

    // Truy vấn lấy thông tin invoices với điều kiện marker_id và khoảng thời gian
    const sql = `
    SELECT invoices.id AS invoice_id, invoices.invoice_date,  
           invoices.total_amount, invoices.status, 
           customers.id AS customer_id,
           customers.name AS customer_name, 
           employees.name AS employee_name
    FROM invoices 
    JOIN customers ON invoices.customer_id = customers.id 
    JOIN employees ON invoices.employee_id = employees.id
    WHERE invoices.marker_id = ?
    ${dateCondition}
    ORDER BY invoices.invoice_date DESC
  `

    // Lấy danh sách invoices bằng marker_id
    db.query(sql, [marker_id], (err, invoices) => {
      if (err) {
        return callback(err) // Nếu có lỗi, trả về callback với lỗi
      }

      // Nếu không có invoice nào, trả về kết quả rỗng
      if (invoices.length === 0) {
        return callback(null, { invoices: [], invoiceDetails: [], products: [], statistics: {} })
      }

      // Format lại ngày tháng cho các hóa đơn
      const invoicesFormatDate = invoices.map((inv) => ({
        ...inv,
        invoice_date: formatDate(inv.invoice_date)
      }))

      // Lấy danh sách invoice_id để truy vấn các chi tiết hóa đơn
      const invoiceIds = invoices.map((inv) => inv.invoice_id)

      // Truy vấn lấy chi tiết của các hóa đơn dựa trên invoice_id
      const detailSql = `
      SELECT invoice_details.*, products.name AS product_name
      FROM invoice_details
      JOIN products ON invoice_details.product_id = products.id
      WHERE invoice_details.invoice_id IN (?)
    `
      db.query(detailSql, [invoiceIds], (err, invoiceDetails) => {
        if (err) {
          return callback(err) // Nếu có lỗi trong truy vấn chi tiết hóa đơn
        }

        // Tính toán số liệu thống kê từ invoices và invoiceDetails
        const statistics = calculateStatistics(invoices, invoiceDetails)

        // Truy vấn lấy thông tin sản phẩm dựa trên marker_id
        const productSql = `
        SELECT * 
        FROM products
        WHERE marker_id = ?
      `
        db.query(productSql, [marker_id], (err, products) => {
          if (err) {
            return callback(err) // Nếu có lỗi khi truy vấn sản phẩm
          }

          // Chuyển dữ liệu thành LineChart. Tính toán dữ liệu biểu đồ đường từ invoices và invoiceDetails
          const lineChartData = getLineChartData(invoices, invoiceDetails)

          // Trả về kết quả gồm invoices, chi tiết hóa đơn, sản phẩm và số liệu thống kê
          const result = {
            invoices: invoicesFormatDate,
            invoiceDetails: invoiceDetails,
            products: products,
            statistics: {
              ...statistics,
              lineChartData
            }
          }
          return callback(null, result)
        })
      })
    })
  }
}

module.exports = Marker
