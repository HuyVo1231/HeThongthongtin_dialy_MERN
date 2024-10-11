import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import theme from '~/theme.js'
import { ThemeProvider } from '@mui/material/styles'
import { Toaster } from 'react-hot-toast'
import { ConfirmProvider } from 'material-ui-confirm'

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <ConfirmProvider>
      <App />
      <Toaster />
    </ConfirmProvider>
  </ThemeProvider>
)
