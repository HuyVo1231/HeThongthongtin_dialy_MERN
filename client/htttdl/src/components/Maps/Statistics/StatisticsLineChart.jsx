import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { Box, Typography, List, ListItem, ListItemText, Paper } from '@mui/material'

const StatisticsLineChart = ({ lineChartData }) => {
  if (!lineChartData || lineChartData.length === 0) return null

  // Collect all unique product keys from all data entries
  const allProductNames = Array.from(
    new Set(
      lineChartData.flatMap((data) =>
        Object.keys(data).filter((key) => key !== 'date' && key !== 'revenue')
      )
    )
  )

  // Calculate total sales for each product
  const totalProductSales = allProductNames.reduce((acc, productName) => {
    const totalSales = lineChartData.reduce((sum, data) => {
      return sum + (data[productName] || 0)
    }, 0)
    acc[productName] = totalSales
    return acc
  }, {})

  return (
    <>
      <Typography variant='h6' align='center' gutterBottom sx={{ marginTop: 4 }}>
        Thống kê doanh thu
      </Typography>
      <Typography variant='h6' align='center' gutterBottom sx={{ marginTop: 4 }}>
        Tổng số lượng bán ra theo sản phẩm
      </Typography>
      <Box display='flex' justifyContent='center' mb={4}>
        <Paper elevation={3} sx={{ padding: 3, maxWidth: 500, width: '100%' }}>
          <List>
            {Object.entries(totalProductSales).map(([productName, totalSales]) => (
              <ListItem key={productName} sx={{ justifyContent: 'space-between' }}>
                <ListItemText primary={productName} sx={{ fontWeight: 'bold' }} />
                <Typography variant='body1' sx={{ color: 'green', fontWeight: 'bold' }}>
                  {totalSales} sản phẩm
                </Typography>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
      <Box display='flex' justifyContent='center' mb={2}>
        <LineChart width={800} height={400} data={lineChartData}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type='monotone' dataKey='revenue' stroke='#0088FE' name='Tổng doanh thu (VND)' />
          {allProductNames.map((productName) => (
            <Line
              key={productName}
              type='monotone'
              dataKey={productName}
              stroke='#FFBB28'
              name={`${productName} (VND)`}
            />
          ))}
        </LineChart>
      </Box>
    </>
  )
}

export default StatisticsLineChart
