import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import SignUp from './pages/Signup/Signup'
import useAuthStore from './zustand/useAuthStore'
import Customer from './pages/Customer/Customer'
import Navbar from './components/Navbar/Navbar'
import Employee from './pages/Employee/Employee'

const App = () => {
  const { authUser } = useAuthStore()
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={authUser ? <Home /> : <Navigate to='/login' />}></Route>
        <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />}></Route>
        <Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />}></Route>
        <Route
          path='/quanlykhachhang'
          element={authUser ? <Customer /> : <Navigate to='/login' />}></Route>
        <Route
          path='/quanlynhanvien'
          element={authUser ? <Employee /> : <Navigate to='/login' />}></Route>
      </Routes>
    </Router>
  )
}

export default App
