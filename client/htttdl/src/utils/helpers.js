export const validatePhoneNumber = (phoneNumber) => {
  // Số điện thoại hợp lệ bắt đầu bằng số 0 và tiếp theo là 9 hoặc 10 chữ số
  const phoneRegex = /^0[0-9]{9,10}$/
  return phoneRegex.test(phoneNumber)
}
