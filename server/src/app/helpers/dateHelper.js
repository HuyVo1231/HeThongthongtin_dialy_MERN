const formatDate = (dateString) => {
  // Chuyển đổi dateString sang dạng ngày tháng năm theo múi giờ Việt Nam
  const formattedDate = new Date(dateString).toLocaleDateString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })

  // Thay thế các dấu '/' thành dấu '-'
  return formattedDate.replace(/\//g, '-')
}

module.exports = { formatDate }
