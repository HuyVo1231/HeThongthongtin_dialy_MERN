import axiosInstance from './axiosInstance'

export const getAllCustomers = async () => {
  try {
    const response = await axiosInstance.get('/customer/getAllCustomers')
    return response.data
  } catch (error) {
    throw new Error('Lỗi khi lấy danh sách các điểm dữ liệu', error)
  }
}

export const createNewCustomer = async (customerInfo) => {
  try {
    const { name, email, phone, address } = customerInfo
    const response = await axiosInstance.post('/customer/createCustomer', {
      name,
      email,
      phone,
      address
    })
    return response
  } catch (error) {
    if (error.response) {
      throw error.response
    } else {
      // Nếu không có response, ném error chung
      throw new Error('Đã xảy ra lỗi khi gửi yêu cầu.')
    }
  }
}

export const editCustomer = async (customerId, customerInfo) => {
  try {
    const { name, email, phone, address } = customerInfo
    const response = await axiosInstance.put(`/customer/editCustomer/${customerId}`, {
      name,
      email,
      phone,
      address
    })
    return response
  } catch (error) {
    if (error.response) {
      throw error.response
    } else {
      throw new Error('Đã xảy ra lỗi khi gửi yêu cầu cập nhật.')
    }
  }
}

export const deleteCustomer = async (customerId) => {
  try {
    const response = await axiosInstance.delete(`/customer/deleteCustomer/${customerId}`)
    return response
  } catch (error) {
    if (error.response) {
      throw error.response
    } else {
      throw new Error('Đã xảy ra lỗi khi gửi yêu cầu xóa.')
    }
  }
}
