export const getUpdatedFields = (currentData, selectedData, fields) => {
  const updatedFields = {}

  fields.forEach((field) => {
    if (currentData[field] !== selectedData[field]) {
      updatedFields[field] = currentData[field]
    }
  })

  return updatedFields
}
