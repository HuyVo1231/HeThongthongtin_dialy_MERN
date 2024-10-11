import { TextField, Box, InputAdornment } from '@mui/material'

const FormInput = ({ fields, handleInputChange, currentData }) => {
  return (
    <Box>
      {fields.map((field) => (
        <TextField
          key={field.name}
          label={field.label}
          name={field.name}
          value={currentData[field.name]}
          onChange={handleInputChange}
          fullWidth
          margin='normal'
          multiline={field.multiline || false}
          InputProps={{
            startAdornment: field.icon ? (
              <InputAdornment position='start'>{field.icon}</InputAdornment>
            ) : null
          }}
        />
      ))}
    </Box>
  )
}

export default FormInput
