import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button
} from '@mui/material'

const ReusableTable = ({ headers, data, onEdit, onDelete, edit = false }) => {
  return (
    <Paper>
      <MuiTable>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header}>{header}</TableCell>
            ))}
            {edit && <TableCell>Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={row.id || rowIndex}>
              {Object.values(row).map((cell, cellIndex) => (
                <TableCell key={cellIndex}>{cell}</TableCell>
              ))}
              {edit && ( // Chỉ hiển thị nút khi `edit` là true
                <TableCell sx={{ display: 'flex' }}>
                  <Button
                    onClick={() => onEdit(row)}
                    variant='contained'
                    color='primary'
                    aria-label='edit'>
                    Edit
                  </Button>
                  <Button
                    onClick={() => onDelete(row.id)}
                    variant='contained'
                    color='secondary'
                    aria-label='delete'
                    style={{ marginLeft: '8px' }}>
                    Delete
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </Paper>
  )
}

export default ReusableTable
