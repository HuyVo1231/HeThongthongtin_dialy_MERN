import { Container, Box } from '@mui/material'
import Maps from '../../components/Maps/Maps'

const Home = () => {
  return (
    <Container maxWidth={false} disableGutters>
      <Box display='flex' flexDirection='column' alignItems='center' width='100%'>
        <Container maxWidth={false} disableGutters sx={{ mt: '4px', p: 2 }}>
          <Maps />
        </Container>
      </Box>
    </Container>
  )
}

export default Home
