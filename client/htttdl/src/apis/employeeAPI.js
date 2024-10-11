import axiosInstance from './axiosInstance'

export const getAllEmployees = async () => {
  try {
    const response = await axiosInstance.get('/employee/getAllEmployees')
    return response.data
  } catch (error) {
    throw new Error('Lỗi khi lấy danh sách nhân viên', error)
  }
}

export const createNewEmployee = async (employeeInfo) => {
  try {
    const { name, email, phone, address, position } = employeeInfo
    const response = await axiosInstance.post('/employee/createEmployee', {
      name,
      email,
      phone,
      address,
      position
    })
    return response
  } catch (error) {
    if (error.response) {
      throw error.response
    } else {
      throw new Error('Đã xảy ra lỗi khi gửi yêu cầu.')
    }
  }
}

export const editEmployee = async (employeeId, employeeInfo) => {
  try {
    const { name, email, phone, address, position } = employeeInfo
    const response = await axiosInstance.put(`/employee/editEmployee/${employeeId}`, {
      name,
      email,
      phone,
      address,
      position
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

export const deleteEmployee = async (employeeId) => {
  try {
    const response = await axiosInstance.delete(`/employee/deleteEmployee/${employeeId}`)
    return response
  } catch (error) {
    if (error.response) {
      throw error.response
    } else {
      throw new Error('Đã xảy ra lỗi khi gửi yêu cầu xóa.')
    }
  }
}
