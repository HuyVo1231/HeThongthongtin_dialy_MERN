const calculateStatistics = (invoices, invoiceDetails) => {
  const uniqueCustomers = new Set()
  let totalProductsSold = 0
  let totalRevenue = 0
  invoices.forEach((invoice) => {
    uniqueCustomers.add(invoice.customer_id)
    totalRevenue += invoice.total_amount
  })

  invoiceDetails.forEach((detail) => {
    totalProductsSold += detail.quantity
  })

  return {
    totalInvoices: invoices.length,
    totalCustomers: uniqueCustomers.size,
    totalProductsSold,
    totalRevenue
  }
}

module.exports = { calculateStatistics }
