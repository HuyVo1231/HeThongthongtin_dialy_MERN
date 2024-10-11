import { Container } from '@mui/material'
import Employees from '../../components/Employees/Employees'

const Employee = () => {
  return (
    <Container maxWidth={false} disableGutters>
      <Employees />
    </Container>
  )
}

export default Employee
