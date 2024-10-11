import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import { Link as RouterLink } from 'react-router-dom'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import useSignup from '../../hooks/useSignup'

export default function Signup() {
  const { setUsername, setPassword, setRepassword, handleSubmit } = useSignup()

  return (
    <Container maxWidth='xs' sx={{ mt: '80px' }}>
      <div>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Register
          </Typography>
        </Box>
        <form noValidate>
          <TextField
            onChange={(e) => setUsername(e.target.value)}
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Username'
            name='username'
            autoFocus
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
          />
          <TextField
            onChange={(e) => setRepassword(e.target.value)}
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='repassword'
            label='Repassword'
            type='password'
          />
          <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />
          <Button
            onClick={handleSubmit}
            sx={{
              backgroundColor: (theme) => theme.palette.secondary.main
            }}
            type='submit'
            fullWidth
            variant='contained'
            color='primary'>
            Register
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: '16px' }}>
            <Link component={RouterLink} to='/login' variant='body2'>
              {'Already have an account? Login here'}
            </Link>
          </Box>
        </form>
      </div>
    </Container>
  )
}
