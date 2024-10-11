import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  Box,
  Grid,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardMedia
} from '@mui/material'
import { Tooltip, Legend } from 'recharts'
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import PeopleIcon from '@mui/icons-material/People'
import BillTable from '../Table/Table'
import useStatistics from '../../hooks/useStatistics'

const titleInvoices = [
  'Mã hóa đơn',
  'Ngày',
  'Tổng tiền',
  'Trạng thái',
  'Số lượng mua',
  'Khách hàng',
  'Nhân viên'
]

const titleProducts = ['Mã sản phẩm', 'Tên sản phẩm', 'Giá', 'Số lượng tồn', 'Mã cửa hàng']

const cardStyles = {
  display: 'flex',
  alignItems: 'center',
  padding: 1,
  boxShadow: 1,
  borderRadius: 2,
  transition: '0.3s',
  '&:hover': {
    boxShadow: 3,
    transform: 'translateY(-5px)'
  }
}

const cardContentStyles = {
  color: '#333',
  maxWidth: '220px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
}

const StatisticDialog = ({ open, onClose, selectedMarker, statistics, updateStatistics }) => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [tabValue, setTabValue] = useState(0)
  const { getStatistics } = useStatistics()

  const handleStatistic = async () => {
    const newStatistics = await getStatistics(selectedMarker.id, startDate, endDate)
    updateStatistics(newStatistics)
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

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

            {/* Chọn ngày */}
            <Box mb={3}>
              <Grid container spacing={2} justifyContent='center'>
                <Grid item xs={12} sm={5}>
                  <TextField
                    label='Từ ngày'
                    type='date'
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    fullWidth
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    label='Đến ngày'
                    type='date'
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    fullWidth
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button onClick={handleStatistic} variant='contained' color='primary' fullWidth>
                    Thống kê
                  </Button>
                </Grid>
              </Grid>
            </Box>

            {/* 4 Cards */}
            <Grid container spacing={2} justifyContent='center' mt={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={cardStyles}>
                  <CardMedia sx={{ padding: 1 }}>
                    <MonetizationOnIcon fontSize='large' style={{ color: '#0088FE' }} />
                  </CardMedia>
                  <CardContent>
                    <Typography variant='h6' sx={cardContentStyles}>
                      Tổng số hóa đơn
                    </Typography>
                    <Typography variant='h5' color='primary' sx={cardContentStyles}>
                      {statistics?.statistics?.totalInvoices}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card sx={cardStyles}>
                  <CardMedia sx={{ padding: 1 }}>
                    <PeopleIcon fontSize='large' style={{ color: '#00C49F' }} />
                  </CardMedia>
                  <CardContent>
                    <Typography variant='h6' sx={cardContentStyles}>
                      Sản phẩm bán ra
                    </Typography>
                    <Typography variant='h5' color='primary' sx={cardContentStyles}>
                      {statistics?.statistics?.totalProductsSold}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card sx={cardStyles}>
                  <CardMedia sx={{ padding: 1 }}>
                    <MonetizationOnIcon fontSize='large' style={{ color: '#FFBB28' }} />
                  </CardMedia>
                  <CardContent>
                    <Typography variant='h6' sx={cardContentStyles}>
                      Tổng doanh thu
                    </Typography>
                    <Typography variant='h5' color='primary' sx={cardContentStyles}>
                      {statistics?.statistics?.totalRevenue}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card sx={cardStyles}>
                  <CardMedia sx={{ padding: 1 }}>
                    <PeopleIcon fontSize='large' style={{ color: '#FF8042' }} />
                  </CardMedia>
                  <CardContent>
                    <Typography variant='h6' sx={cardContentStyles}>
                      Khách hàng
                    </Typography>
                    <Typography variant='h5' color='primary' sx={cardContentStyles}>
                      {statistics?.statistics?.totalCustomers}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Biểu đồ Line Chart */}
            <Typography variant='h6' align='center' gutterBottom sx={{ marginTop: 4 }}>
              Thống kê doanh thu
            </Typography>

            <Box display='flex' justifyContent='center' mb={2}>
              {statistics?.statistics?.lineChartData && (
                <LineChart width={800} height={400} data={statistics.statistics.lineChartData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='date' />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type='monotone'
                    dataKey='revenue'
                    stroke='#0088FE'
                    name='Tổng doanh thu (VND)'
                  />

                  {/* Lưu danh sách sản phẩm duy nhất */}
                  {Array.from(
                    new Set(
                      statistics.statistics.lineChartData.flatMap((dataPoint) =>
                        Object.keys(dataPoint).filter((key) => key !== 'date' && key !== 'revenue')
                      )
                    )
                  ).map((productName) => (
                    <Line
                      key={productName}
                      type='monotone'
                      dataKey={productName}
                      stroke='#FF8042'
                      name={productName}
                    />
                  ))}
                </LineChart>
              )}
            </Box>
          </>
        )}

        {/* Tab Hóa đơn */}
        {tabValue === 1 && (
          <Box mt={3}>
            <BillTable headers={titleInvoices} data={statistics?.invoices} />
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
