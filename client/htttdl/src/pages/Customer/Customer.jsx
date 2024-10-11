import { Container } from '@mui/material'
import Customers from '../../components/Customers/Customers'

const Customer = () => {
  return (
    <Container maxWidth={false} disableGutters>
      <Customers />
    </Container>
  )
}

export default Customer
