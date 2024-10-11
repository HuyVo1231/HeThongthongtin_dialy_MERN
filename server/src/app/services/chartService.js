const { formatDate } = require('../helpers/dateHelper')

const getLineChartData = (invoices, invoice_details) => {
  const data = {}

  invoices.forEach((invoice) => {
    const date = formatDate(invoice.invoice_date)

    // Nếu chưa có ngày thì khởi tạo,
    if (!data[date]) {
      data[date] = {
        revenue: 0,
        products: {}
      }
    }
    // Tính tổng tiền theo ngày
    data[date].revenue += invoice.total_amount

    const detailsInvoice = invoice_details.filter(
      (detail) => detail.invoice_id === invoice.invoice_id
    )

    // Duyệt qua các chi tiết của hóa đơn
    detailsInvoice.forEach((detail) => {
      // Kiểm tra nếu sản phẩm chưa có trong danh sách của ngày đó, khởi tạo dữ liệu
      if (!data[date].products[detail.product_id]) {
        data[date].products[detail.product_id] = {
          quantity: 0,
          product_name: detail.product_name
        }
      }

      data[date].products[detail.product_id].quantity += detail.quantity
    })
  })

  const lineChartData = Object.entries(data).map(([date, info]) => {
    const productQuantities = {}

    Object.keys(info.products).forEach((productId) => {
      const product = info.products[productId]
      productQuantities[product.product_name] = product.quantity
    })

    return {
      date,
      revenue: info.revenue,
      ...productQuantities
    }
  })
  return lineChartData
}

module.exports = { getLineChartData }
