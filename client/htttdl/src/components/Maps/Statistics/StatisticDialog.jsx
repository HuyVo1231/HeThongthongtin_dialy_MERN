import { useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Tabs,
  Tab
} from '@mui/material'
import BillTable from '../../Table/Table'
import useStatistics from '../../../hooks/useStatistics'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DatePicker from '../../Date/DatePicker'
import StatisticsLineChart from './StatisticsLineChart'
import StatisticsCards from './StatisticsCards'

// Định nghĩa tiêu đề cho các bảng
const titleInvoices = [
  'Mã hóa đơn',
  'Ngày',
  'Khách hàng',
  'Nhân viên',
  'Tổng tiền',
  'Trạng thái',
  'Mã khách hàng'
]

const titleInvoiceDetails = [
  'Mã hóa đơn chi tiết',
  'Mã hóa đơn',
  'Sản phẩm',
  'Số lượng bán',
  'Đơn giá',
  'Mã sản phẩm'
]

const titleProducts = [
  'Mã sản phẩm',
  'Tên sản phẩm',
  'Số lượng tồn',
  'Số lượng đã bán',
  'Giá',
  'Mã cửa hàng'
]

const StatisticDialog = ({ open, onClose, selectedMarker, statistics, updateStatistics }) => {
  // Sử dụng các hook
  const {
    statisticInvoice,
    setStatisticInvoice,
    totalRevenue,
    setTotalRevenue,
    showInvoiceDetails,
    selectedInvoice,
    handleInvoiceClick,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    setStatistics,
    handleStatistic,
    tabValue,
    handleTabChange,
    handleExportExcel,
    closeInvoiceDetails,
    handleStatisticInvoice
  } = useStatistics(updateStatistics, selectedMarker)

  // Cập nhật dữ liệu khi statistics thay đổi
  useEffect(() => {
    setTotalRevenue(statistics?.statistics?.totalRevenue)
    setStatisticInvoice(statistics?.invoices)
    setStatistics(statistics)
  }, [statistics])

  return (
    <Dialog open={open} onClose={onClose} maxWidth='lg' fullWidth>
      <DialogTitle>{`Thống kê của ${selectedMarker.name}`}</DialogTitle>
      <DialogContent>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label='Thống kê' />
          <Tab label='Hóa đơn' />
          <Tab label='Sản phẩm' />
        </Tabs>

        {/* Tab Thống kê */}
        {tabValue === 0 && (
          <>
            <Typography variant='h6' align='center' gutterBottom sx={{ marginTop: 2 }}>
              Thống kê doanh thu và hoạt động
            </Typography>
            <DatePicker
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              handleStatistic={handleStatistic}
              handleExportExcel={handleExportExcel}
            />
            <StatisticsCards statistics={statistics} />
            <StatisticsLineChart lineChartData={statistics?.statistics?.lineChartData} />
          </>
        )}

        {/* Tab Hóa đơn */}
        {tabValue === 1 && (
          <Box mt={3}>
            {!showInvoiceDetails ? (
              <Box>
                <DatePicker
                  startDate={startDate}
                  setStartDate={setStartDate}
                  endDate={endDate}
                  setEndDate={setEndDate}
                  handleStatistic={handleStatisticInvoice}
                  handleExportExcel={handleExportExcel}
                />
                <BillTable
                  headers={titleInvoices}
                  data={statisticInvoice}
                  onRowClick={handleInvoiceClick}
                  viewDetails={true}
                />
                <Typography variant='h6' align='right' sx={{ mt: 2 }}>
                  Tổng tiền: <strong>{totalRevenue} VND</strong>
                </Typography>
              </Box>
            ) : (
              <Box mt={3}>
                <Button onClick={closeInvoiceDetails} color='secondary' sx={{ gap: 1 }}>
                  <ArrowBackIcon />
                  Quay lại danh sách hóa đơn
                </Button>
                <BillTable headers={titleInvoiceDetails} data={selectedInvoice} />
              </Box>
            )}
          </Box>
        )}

        {/* Tab Sản phẩm */}
        {tabValue === 2 && (
          <Box mt={3}>
            <BillTable headers={titleProducts} data={statistics?.products} />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default StatisticDialog
