import { Modal, Box, Button, Typography, CircularProgress } from '@mui/material'
import FormInput from '../FormInput/FormInput'
import GroupAddIcon from '@mui/icons-material/GroupAdd'

const GenericModal = ({
  isLoading,
  currentData,
  modalOpen,
  handleClose,
  isEditing,
  handleInputChange,
  handleSave,
  fields,
  title,
  coverImage,
  handleFileChange,
  updateFile = false
}) => {
  return (
    <Modal
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby='generic-modal'
      aria-describedby='generic-form'>
      <Box
        sx={{
          overflowY: 'auto',
          height: '100%',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 450,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4
        }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            id='generic-modal'
            variant='h6'
            component='h2'
            sx={{ display: 'flex', alignItems: 'center', gap: 2, paddingLeft: '14px' }}>
            <GroupAddIcon />
            {isEditing ? `Chỉnh sửa ${title}` : `Thêm ${title} Mới`}
          </Typography>
        </Box>

        {isLoading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              height: '200px',
              gap: 2
            }}>
            <CircularProgress color='secondary' />
            Loading...
          </Box>
        ) : (
          <>
            <FormInput
              fields={fields}
              handleInputChange={handleInputChange}
              currentData={currentData}
            />

            {/* Hiển thị ảnh cover nếu có */}
            {coverImage && (
              <Box sx={{ textAlign: 'center', marginTop: 2 }}>
                <img
                  src={coverImage}
                  alt='Preview'
                  style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }}
                />
              </Box>
            )}

            {/* Input để tải ảnh lên */}
            {updateFile && <input type='file' onChange={handleFileChange} />}

            <Button
              variant='contained'
              sx={{
                backgroundColor: 'error.light',
                mt: 2,
                display: 'flex',
                justifyContent: 'center',
                width: '100%'
              }}
              onClick={handleSave}>
              {isEditing ? 'Cập nhật' : 'Thêm'}
            </Button>
          </>
        )}
      </Box>
    </Modal>
  )
}

export default GenericModal
