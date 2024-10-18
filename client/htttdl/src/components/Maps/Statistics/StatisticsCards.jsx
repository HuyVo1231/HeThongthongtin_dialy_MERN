import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import PeopleIcon from '@mui/icons-material/People'

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

const StatisticsCards = ({ statistics }) => {
  const stats = [
    {
      label: 'Tổng số hóa đơn',
      value: statistics?.statistics?.totalInvoices || 0,
      icon: <MonetizationOnIcon fontSize='large' style={{ color: '#0088FE' }} />
    },
    {
      label: 'Khách hàng',
      value: statistics?.statistics?.totalCustomers || 0,
      icon: <PeopleIcon fontSize='large' style={{ color: '#00C49F' }} />
    },
    {
      label: 'Sản phẩm bán ra',
      value: statistics?.statistics?.totalProductsSold || 0,
      icon: <MonetizationOnIcon fontSize='large' style={{ color: '#FFBB28' }} />
    },
    {
      label: 'Tổng doanh thu',
      value: statistics?.statistics?.totalRevenue || 0,
      icon: <PeopleIcon fontSize='large' style={{ color: '#FF8042' }} />
    }
  ]

  return (
    <Grid container spacing={2} justifyContent='center' mt={3}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card sx={cardStyles}>
            <CardMedia sx={{ padding: 1 }}>{stat.icon}</CardMedia>
            <CardContent>
              <Typography variant='h6' sx={cardContentStyles}>
                {stat.label}
              </Typography>
              <Typography variant='h5' color='primary' sx={cardContentStyles}>
                {stat.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default StatisticsCards
