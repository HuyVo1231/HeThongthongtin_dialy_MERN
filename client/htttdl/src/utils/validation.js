import toast from 'react-hot-toast'
import { validatePhoneNumber } from './helpers'

export const validateFields = (fields) => {
  for (const [fieldName, fieldValue] of Object.entries(fields)) {
    // Chỉ trim nếu fieldValue là chuỗi
    const trimmedValue = typeof fieldValue === 'string' ? fieldValue.trim() : fieldValue

    // Kiểm tra nếu field là số điện thoại
    if (fieldName.toLowerCase().includes('phone')) {
      if (!validatePhoneNumber(trimmedValue)) {
        toast.error('Số điện thoại không hợp lệ. Vui lòng nhập lại.')
        return false
      }
    } else if (typeof trimmedValue === 'string' && !trimmedValue) {
      // Kiểm tra nếu trường chuỗi bị rỗng
      toast.error(`Vui lòng nhập ${fieldName}.`)
      return false
    }
  }
  return true
}
