import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import HomeIcon from '@mui/icons-material/Home'
import WorkIcon from '@mui/icons-material/Work'

export const employeeFields = [
  { name: 'name', label: 'Tên Nhân Viên', icon: <WorkIcon /> },
  { name: 'address', label: 'Địa Chỉ', icon: <HomeIcon /> },
  { name: 'email', label: 'Email', icon: <EmailIcon /> },
  { name: 'phone', label: 'Số Điện Thoại', icon: <PhoneIcon /> },
  { name: 'position', label: 'Vị Trí', icon: <WorkIcon /> }
]
