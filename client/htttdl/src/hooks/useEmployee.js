import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { getUpdatedFields } from '../utils/fieldUtils'
import { useConfirm } from 'material-ui-confirm'
import {
  createNewEmployee,
  getAllEmployees as getAllEmployeesAPI,
  editEmployee,
  deleteEmployee
} from '../apis/employeeAPI'
import { validateFields } from '../utils/validation'

const useEmployee = () => {
  const confirm = useConfirm()
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setIsLoading] = useState(false)
  const [isEditing, setEditting] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [employees, setAllEmployees] = useState([])
  const [employeeInfo, setEmployeeInfo] = useState({
    name: '',
    phone: '',
    address: '',
    email: '',
    position: ''
  })

  const handleModalClose = () => {
    setModalOpen(false)
    setEditting(false)
    setSelectedEmployee(null)
    setEmployeeInfo({
      name: '',
      phone: '',
      address: '',
      email: '',
      position: ''
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEmployeeInfo((prevEmployee) => ({
      ...prevEmployee,
      [name]: value
    }))
  }

  const handleSaveEmployee = async () => {
    // const { name, address, phone, email, position } = employeeInfo

    if (!validateFields(employeeInfo)) {
      return
    }

    setIsLoading(true)

    try {
      let response

      if (isEditing && selectedEmployee) {
        const updatedFields = getUpdatedFields(employeeInfo, selectedEmployee, [
          'name',
          'address',
          'phone',
          'email',
          'position'
        ])

        if (Object.keys(updatedFields).length === 0) {
          toast.info('Không có thay đổi nào để cập nhật.')
          setIsLoading(false)
          return
        }

        response = await editEmployee(selectedEmployee.id, updatedFields)
        toast.success(response.data?.message || 'Nhân viên đã được cập nhật thành công!')

        const updatedEmployees = employees.map((employee) =>
          employee.id === selectedEmployee.id ? { ...employee, ...updatedFields } : employee
        )
        setAllEmployees(updatedEmployees)
      } else {
        response = await createNewEmployee(employeeInfo)
        toast.success(response.data?.message || 'Nhân viên đã được thêm thành công!')

        const newEmployee = {
          id: response.data.result.insertId,
          ...employeeInfo
        }

        setAllEmployees((prevEmployees) => [...prevEmployees, newEmployee])
      }

      setModalOpen(false)
    } catch (error) {
      // toast.error(error.response?.data?.message || 'Chưa')
    } finally {
      handleModalClose()
      setIsLoading(false)
    }
  }

  const handleEdit = (employee) => {
    setEditting(true)
    setSelectedEmployee(employee)
    setEmployeeInfo({
      name: employee.name,
      phone: employee.phone,
      address: employee.address,
      email: employee.email,
      position: employee.position
    })
    setModalOpen(true)
  }

  const handleAddEmployee = () => {
    setModalOpen(true)
  }

  const handleDelete = (idEmployeeDelete) => {
    confirm({
      description: 'Hành động này sẽ không thể khôi phục được!',
      title: 'Bạn có chắc là muốn xóa nhân viên này không?'
    })
      .then(() => {
        const employeesAfterDelete = employees.filter(
          (employee) => employee.id !== idEmployeeDelete
        )
        setAllEmployees(employeesAfterDelete)
        toast.success('Xóa nhân viên thành công')
        deleteEmployee(idEmployeeDelete)
        setSelectedEmployee(null)
      })
      .catch(() => {})
  }

  useEffect(() => {
    const getAllEmployees = async () => {
      try {
        const employeeData = await getAllEmployeesAPI()
        setAllEmployees(employeeData)
      } catch (error) {
        toast.error('Failed to load employees.', error)
      }
    }

    getAllEmployees()
  }, [])

  return {
    handleEdit,
    handleAddEmployee,
    handleDelete,
    selectedEmployee,
    setSelectedEmployee,
    isEditing,
    setEditting,
    loading,
    employees,
    setAllEmployees,
    employeeInfo,
    setEmployeeInfo,
    modalOpen,
    setModalOpen,
    handleModalClose,
    handleInputChange,
    handleSaveEmployee
  }
}

export default useEmployee
