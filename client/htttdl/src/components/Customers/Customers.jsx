import { Box, Button } from '@mui/material'
import Table from '../../components/Table/Table'
import useCustomer from '../../hooks/useCustomer'
import CustomerModal from '../Modal/GenericModal'
import { customerFields } from '../../formFields/customerFields'

const headers = ['Mã khách hàng', 'Khách hàng', 'Số điện thoại', 'Email', 'Địa chỉ']

const Customers = () => {
  const {
    handleAddCustomer,
    handleEdit,
    handleDelete,
    isLoading,
    isEditing,
    customers,
    customerInfo,
    handleSaveCustomer,
    modalOpen,
    setModalOpen,
    handleModalClose,
    handleInputChange
  } = useCustomer()

  return (
    <div>
      <Box display='flex' flexDirection='column' alignItems='center' width='100%'>
        <Box mt={3}>
          <Box sx={{ float: 'right' }}>
            <Button variant='outlined' color='error' onClick={handleAddCustomer}>
              Thêm khách hàng
            </Button>
          </Box>
          <Table
            headers={headers}
            data={customers || []}
            onEdit={handleEdit}
            onDelete={handleDelete}
            edit={true}
          />
        </Box>

        {modalOpen && (
          <CustomerModal
            modalOpen={modalOpen}
            handleClose={handleModalClose}
            fields={customerFields}
            currentData={customerInfo}
            title={isEditing ? 'Chỉnh sửa khách hàng' : 'Thêm khách hàng'}
            isLoading={isLoading}
            isEditing={isEditing}
            handleInputChange={handleInputChange}
            handleSave={handleSaveCustomer}
          />
        )}
      </Box>
    </div>
  )
}

export default Customers
