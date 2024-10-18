export const validatePhoneNumber = (phoneNumber) => {
  // Số điện thoại hợp lệ bắt đầu bằng số 0 và tiếp theo là 9 hoặc 10 chữ số
  const phoneRegex = /^0[0-9]{9,10}$/
  return phoneRegex.test(phoneNumber)
}

export const parseDate = (dateString) => {
  // 17-10-2024
  const [day, month, year] = dateString.split('-')
  //2024-10-17
  return new Date(`${year}-${month}-${day}`)
}
