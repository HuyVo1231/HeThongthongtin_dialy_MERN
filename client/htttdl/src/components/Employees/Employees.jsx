import { Box, Button } from '@mui/material'
import Table from '../Table/Table'
import EmployeeModal from '../Modal/GenericModal'
import { employeeFields } from '../../formFields/employeeFields'
import useEmployee from '../../hooks/useEmployee'

const headers = ['Mã nhân viên', 'Tên nhân viên', 'Số điện thoại', 'Email', 'Địa chỉ', 'Vị trí']

const Employees = () => {
  const {
    handleAddEmployee,
    handleEdit,
    handleDelete,
    isLoading,
    isEditing,
    employees,
    employeeInfo,
    handleSaveEmployee,
    modalOpen,
    handleModalClose,
    handleInputChange
  } = useEmployee()

  return (
    <div>
      <Box display='flex' flexDirection='column' alignItems='center' width='100%'>
        <Box mt={3}>
          <Box sx={{ float: 'right' }}>
            <Button variant='outlined' color='error' onClick={handleAddEmployee}>
              Thêm nhân viên
            </Button>
          </Box>
          <Table
            headers={headers}
            data={employees || []}
            onEdit={handleEdit}
            onDelete={handleDelete}
            edit={true}
          />
        </Box>

        {modalOpen && (
          <EmployeeModal
            modalOpen={modalOpen}
            handleClose={handleModalClose}
            fields={employeeFields}
            currentData={employeeInfo}
            title={isEditing ? 'Chỉnh sửa nhân viên' : 'Thêm nhân viên'}
            isLoading={isLoading}
            isEditing={isEditing}
            handleInputChange={handleInputChange}
            handleSave={handleSaveEmployee}
          />
        )}
      </Box>
    </div>
  )
}

export default Employees
