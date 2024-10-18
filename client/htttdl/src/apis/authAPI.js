import toast from 'react-hot-toast'
import axiosInstance from './axiosInstance'

export const login = async (username, password) => {
  try {
    const response = await axiosInstance.post('/user/login', {
      username,
      password
    })
    return response.data
  } catch (error) {
    toast.error(error.response.data.message)
    throw new Error(error.response?.data?.message || 'Error while login')
  }
}

export const signup = async (username, password) => {
  try {
    const response = await axiosInstance.post('/user/newUser', {
      username: username,
      password: password
    })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error while signup')
  }
}
