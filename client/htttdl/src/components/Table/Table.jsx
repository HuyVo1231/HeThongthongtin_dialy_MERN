import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button
} from '@mui/material'

const ReusableTable = ({
  headers,
  viewDetails = false,
  data,
  onEdit,
  onDelete,
  edit = false,
  onRowClick
}) => {
  return (
    <Paper>
      <MuiTable>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header}>{header}</TableCell>
            ))}
            {edit && <TableCell>Actions</TableCell>}
            {viewDetails && <TableCell>Chi tiết</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={row.id || rowIndex}>
              {Object.values(row).map((cell, cellIndex) => (
                <TableCell key={cellIndex}>{cell}</TableCell>
              ))}
              {edit && ( // Chỉ hiển thị nút Edit và Delete khi `edit` là true
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
              {viewDetails && (
                <TableCell>
                  <Button onClick={() => onRowClick(row)} variant='contained' color='info'>
                    Xem chi tiết
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
