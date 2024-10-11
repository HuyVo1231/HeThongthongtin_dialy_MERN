import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import useLogin from '../../hooks/useLogin'
import { Link as RouterLink } from 'react-router-dom'

export default function Login() {
  const { userName, password, setUsername, setPassword, handleSubmit } = useLogin()

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
            Sign in
          </Typography>
        </Box>
        <form noValidate>
          <TextField
            onChange={(e) => setUsername(e.target.value)}
            value={userName}
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Username'
            autoComplete='email'
            autoFocus
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
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
            Sign In
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: '16px' }}>
            <Box>
              <Link href='#' variant='body2'>
                Forgot password?
              </Link>
            </Box>
            <Box>
              <Link component={RouterLink} to='/signup' variant='body2'>
                {'Dont have an account? Sign up here'}
              </Link>
            </Box>
          </Box>
        </form>
      </div>
    </Container>
  )
}
