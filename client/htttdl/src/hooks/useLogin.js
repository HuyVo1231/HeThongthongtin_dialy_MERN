import { useState } from 'react'
import toast from 'react-hot-toast'
import useAuthStore from '../zustand/useAuthStore'
import { login } from './../apis/authAPI'

const useLogin = () => {
  const setAuthUser = useAuthStore((state) => state.setAuthUser)
  const [userName, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    if (!userName || !password) {
      toast.error('Please input full fields.')
      return
    }

    if (userName.length < 6 || password.length < 6) {
      toast.error('Username and password must be at least 6 characters long.')
      return
    }

    // API call
    try {
      const data = await login(userName, password)
      toast.success(data.message)
      setAuthUser(data.accessToken)
    } catch (error) {
      toast.error(error.response.data.message)
      return
    }

    // Reset fields
    setUsername('')
    setPassword('')
  }

  return {
    userName,
    password,
    setUsername,
    setPassword,
    handleSubmit
  }
}

export default useLogin
