import PhoneIcon from '@mui/icons-material/Phone'
import ImageIcon from '@mui/icons-material/Image'
import EmailIcon from '@mui/icons-material/Email'
import HomeIcon from '@mui/icons-material/Home'

export const customerFields = [
  { name: 'name', label: 'Tên Khách Hàng', icon: <ImageIcon /> },
  { name: 'address', label: 'Địa Chỉ', icon: <HomeIcon /> },
  { name: 'email', label: 'Email', icon: <EmailIcon /> },
  { name: 'phone', label: 'Số Điện Thoại', icon: <PhoneIcon /> }
]
