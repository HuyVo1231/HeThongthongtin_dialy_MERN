import { useState } from 'react'
import toast from 'react-hot-toast'
import axiosInstance from '../apis/axiosInstance'
import { useNavigate } from 'react-router-dom'
import { signup } from '../apis/authAPI'

const useSignup = () => {
  const navigate = useNavigate()
  const [userName, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repassword, setRepassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!userName || !password || !repassword) {
      toast.error('Please input full fields.')
      return
    }

    if (userName.length < 6 || password.length < 6) {
      toast.error('Username and password must be at least 6 characters long.')
      return
    }

    if (password !== repassword) {
      toast.error('Password and repassword are not matching.')
      return
    }

    // Call API Sign UP
    try {
      const data = await signup(userName, password)
      toast.success(data.message)
      navigate('/login')
    } catch (error) {
      toast.error(error.response.data.message)
      return
    }
    setUsername('')
    setPassword('')
    setRepassword('')
  }

  return {
    setUsername,
    setPassword,
    setRepassword,
    handleSubmit
  }
}

export default useSignup
