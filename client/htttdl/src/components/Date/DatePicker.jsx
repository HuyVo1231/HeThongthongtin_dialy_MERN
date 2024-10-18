import { Button, TextField, Box, Grid } from '@mui/material'

const DatePicker = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  handleStatistic,
  handleExportExcel
}) => {
  return (
    <Box mb={3}>
      <Grid container spacing={2} justifyContent='center' alignItems='center'>
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
          <Button
            onClick={handleStatistic}
            variant='contained'
            color='primary'
            fullWidth
            sx={{
              backgroundColor: '#1976d2',
              color: '#fff',
              marginBottom: 2,
              padding: '10px',
              '&:hover': {
                backgroundColor: '#115293'
              }
            }}>
            Thống kê
          </Button>
          <Button
            onClick={handleExportExcel}
            variant='contained'
            color='secondary'
            fullWidth
            sx={{
              backgroundColor: '#d32f2f',
              color: '#fff',
              padding: '10px',
              '&:hover': {
                backgroundColor: '#9a0007'
              }
            }}>
            Xuất Excel
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default DatePicker
