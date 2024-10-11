const mysql = require('mysql')

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dialy'
})

db.connect((err) => {
  if (err) {
    console.error('Lỗi kết nối MySQL: ', err)
  } else {
    console.log('Đã kết nối thành công tới MySQL')
  }
})

module.exports = db
