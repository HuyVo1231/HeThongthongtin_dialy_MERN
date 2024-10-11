import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'
import ImageIcon from '@mui/icons-material/Image'
import PublicIcon from '@mui/icons-material/Public'
import DescriptionIcon from '@mui/icons-material/Description'

export const markerFields = [
  { name: 'name', label: 'Tên Cửa Hàng', icon: <ImageIcon /> },
  { name: 'address', label: 'Địa Chỉ', icon: <LocationOnIcon /> },
  { name: 'phone', label: 'Số Điện Thoại', icon: <PhoneIcon /> },
  { name: 'description', label: 'Mô tả', icon: <DescriptionIcon />, multiline: true },
  { name: 'lat', label: 'Vĩ độ (Latitude)', icon: <PublicIcon /> },
  { name: 'lng', label: 'Kinh độ (Longitude)', icon: <PublicIcon /> }
]
