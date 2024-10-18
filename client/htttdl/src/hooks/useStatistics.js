import { useState } from 'react'
import { getStatisticMarkerById } from '../apis/markerAPI'
import * as XLSX from 'xlsx'

const useStatistics = (updateStatistics, selectedMarker) => {
  const [open, setOpen] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [tabValue, setTabValue] = useState(0)
  const [statistics, setStatistics] = useState(null)
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [statisticInvoice, setStatisticInvoice] = useState([])
  const [showInvoiceDetails, setShowInvoiceDetails] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState([])

  // Lấy thống kê
  const getStatistics = async (marker_id, startDate = null, endDate = null) => {
    try {
      const data = await getStatisticMarkerById(marker_id, startDate, endDate)
      setStatistics(data.result)
      return data.result
    } catch (error) {
      console.error(error)
    }
  }

  // Hàm xử lý thống kê
  const handleStatistic = async () => {
    const newStatistics = await getStatistics(selectedMarker.id, startDate, endDate)
    updateStatistics(newStatistics)
  }

  const handleStatisticClose = () => {
    setOpen(false)
  }

  // Xử lý thống kê hóa đơn
  const handleStatisticInvoice = async () => {
    const newStatistics = await getStatistics(selectedMarker.id, startDate, endDate)
    // setStatisticInvoice()
    updateStatistics(newStatistics)
  }

  // Xử lý khi click vào hóa đơn
  const handleInvoiceClick = (invoice) => {
    const invoiceId = invoice.invoice_id
    const detailInvoices = statistics?.invoiceDetails.filter(
      (detail) => detail.invoice_id === invoiceId
    )

    setSelectedInvoice(detailInvoices)
    setShowInvoiceDetails(true)
  }

  // Thay đổi tab
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  // Xuất file Excel
  const handleExportExcel = () => {
    if (!statistics) {
      console.error('Statistics is not available.')
      return
    }

    const workbook = XLSX.utils.book_new()

    // Tạo sheet hóa đơn
    const invoiceSheetData = statistics.invoices.map((invoice) => ({
      'Mã hóa đơn': invoice.invoice_id,
      Ngày: invoice.invoice_date,
      'Tổng tiền': invoice.total_amount,
      'Trạng thái': invoice.status,
      'Khách hàng': invoice.customer_name,
      'Nhân viên': invoice.employee_name
    }))
    const invoiceSheet = XLSX.utils.json_to_sheet(invoiceSheetData)
    XLSX.utils.book_append_sheet(workbook, invoiceSheet, 'Hóa đơn')

    // Tạo sheet chi tiết hóa đơn
    const invoiceDetailsSheetData = statistics.invoiceDetails.map((detail) => ({
      'Mã sản phẩm': detail.product_id,
      'Tên sản phẩm': detail.product_name,
      'Số lượng': detail.quantity,
      'Đơn giá': detail.util_price // Đổi thành util_price
    }))
    const invoiceDetailsSheet = XLSX.utils.json_to_sheet(invoiceDetailsSheetData)
    XLSX.utils.book_append_sheet(workbook, invoiceDetailsSheet, 'Chi tiết hóa đơn')

    // Tạo sheet thống kê
    const summarySheetData = [
      {
        'Tổng số hóa đơn': statistics.statistics.totalInvoices,
        'Sản phẩm đã bán': statistics.statistics.totalProductsSold,
        'Tổng doanh thu': statistics.statistics.totalRevenue,
        'Khách hàng': statistics.statistics.totalCustomers
      }
    ]
    const summarySheet = XLSX.utils.json_to_sheet(summarySheetData)
    XLSX.utils.book_append_sheet(workbook, summarySheet, 'Thống kê')

    // Lưu file
    XLSX.writeFile(workbook, 'Thongke.xlsx')
  }

  const closeInvoiceDetails = () => {
    setShowInvoiceDetails(false)
    setSelectedInvoice([])
  }

  return {
    open,
    setOpen,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    tabValue,
    handleTabChange,
    getStatistics,
    statistics,
    setStatistics,
    handleStatistic,
    totalRevenue,
    setTotalRevenue,
    statisticInvoice,
    setStatisticInvoice,
    showInvoiceDetails,
    setShowInvoiceDetails,
    selectedInvoice,
    setSelectedInvoice,
    handleInvoiceClick,
    handleStatisticInvoice,
    handleExportExcel,
    handleStatisticClose,
    closeInvoiceDetails
  }
}

export default useStatistics
