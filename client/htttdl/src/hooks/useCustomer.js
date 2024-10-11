import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { getUpdatedFields } from '../utils/fieldUtils'
import { useConfirm } from 'material-ui-confirm'
import {
  createNewCustomer,
  getAllCustomers as getAllCustomersAPI,
  editCustomer,
  deleteCustomer
} from '../apis/customerAPI'
import { validateFields } from '../utils/validation'

const useCustomer = () => {
  const confirm = useConfirm()
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setIsLoading] = useState(false)
  const [isEditing, setEditting] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [customers, setAllCustomers] = useState([])
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    email: ''
  })

  const handleModalClose = () => {
    setModalOpen(false)
    setEditting(false)
    setSelectedCustomer(null)
    setCustomerInfo({
      name: '',
      phone: '',
      address: '',
      email: ''
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCustomerInfo((prevCustomer) => ({
      ...prevCustomer,
      [name]: value
    }))
  }

  const handleSaveCustomer = async () => {
    // const { name, address, phone, email } = customerInfo

    if (!validateFields(customerInfo)) {
      return
    }

    setIsLoading(true)

    try {
      let response

      if (isEditing && selectedCustomer) {
        // Sử dụng hàm getUpdatedFields để lấy ra các trường đã thay đổi
        const updatedFields = getUpdatedFields(customerInfo, selectedCustomer, [
          'name',
          'address',
          'phone',
          'email'
        ])

        // Nếu không có thay đổi, thông báo và kết thúc
        if (Object.keys(updatedFields).length === 0) {
          toast.info('Không có thay đổi nào để cập nhật.')
          setIsLoading(false)
          return
        }

        response = await editCustomer(selectedCustomer.id, updatedFields)
        toast.success(response.data?.message || 'Khách hàng đã được cập nhật thành công!')

        // Update state với thông tin đã chỉnh sửa
        const updatedCustomers = customers.map((customer) =>
          customer.id === selectedCustomer.id ? { ...customer, ...updatedFields } : customer
        )
        setAllCustomers(updatedCustomers)
      } else {
        // Add new customer
        response = await createNewCustomer(customerInfo)
        toast.success(response.data?.message || 'Khách hàng đã được thêm thành công!')

        const newCustomer = {
          id: response.data.result.insertId,
          ...customerInfo
        }

        // Update the state with the new customer
        setAllCustomers((prevCustomers) => [...prevCustomers, newCustomer])
      }

      setModalOpen(false)
    } catch (error) {
      // toast.error(error.response?.data?.message || 'Đã xảy ra lỗi.')
    } finally {
      handleModalClose()
      setIsLoading(false)
    }
  }

  const handleEdit = (customer) => {
    setEditting(true)
    setSelectedCustomer(customer)
    setCustomerInfo({
      name: customer.name,
      phone: customer.phone,
      address: customer.address,
      email: customer.email
    })
    setModalOpen(true)
  }

  const handleAddCustomer = () => {
    setModalOpen(true)
  }

  const handleDelete = (idCustomerDelete) => {
    confirm({
      description: 'Hành động này sẽ không thể khôi phục được!',
      title: 'Bạn có chắc là muốn xóa khách hàng này không?'
    })
      .then(() => {
        const customersAfterDelete = customers.filter(
          (customer) => customer.id !== idCustomerDelete
        )
        setAllCustomers(customersAfterDelete)
        toast.success('Xóa marker thành công')
        // Call Api
        deleteCustomer(idCustomerDelete)
        setSelectedCustomer(null)
      })
      .catch(() => {})
  }

  useEffect(() => {
    const getAllCustomers = async () => {
      try {
        const customerData = await getAllCustomersAPI()
        setAllCustomers(customerData)
      } catch (error) {
        toast.error('Failed to load customers.', error)
      }
    }

    getAllCustomers()
  }, [])

  return {
    handleEdit,
    handleAddCustomer,
    handleDelete,
    selectedCustomer,
    setSelectedCustomer,
    isEditing,
    setEditting,
    loading,
    customers,
    setAllCustomers,
    customerInfo,
    setCustomerInfo,
    modalOpen,
    setModalOpen,
    handleModalClose,
    handleInputChange,
    handleSaveCustomer
  }
}

export default useCustomer
