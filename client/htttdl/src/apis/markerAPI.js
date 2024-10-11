import axiosInstance from './axiosInstance'

export const fetchMarkers = async () => {
  try {
    const response = await axiosInstance.get('/marker/getAllMarkers')
    return response.data.map((marker) => ({
      id: marker.marker_id,
      lat: marker.marker_lat,
      lng: marker.marker_lng,
      name: marker.marker_name,
      address: marker.marker_address,
      phone: marker.marker_phone,
      description: marker.marker_description,
      cover: marker.marker_cover
    }))
  } catch (error) {
    throw new Error('Lỗi khi lấy danh sách các điểm dữ liệu', error)
  }
}

export const addMarkers = async (currentMarker) => {
  try {
    const formData = new FormData()
    formData.append('marker_lat', currentMarker.lat)
    formData.append('marker_lng', currentMarker.lng)
    formData.append('marker_name', currentMarker.name)
    formData.append('marker_address', currentMarker.address)
    formData.append('marker_phone', currentMarker.phone)
    formData.append('marker_description', currentMarker.description)

    // Chuyển đổi Blob URL thành File và thêm vào FormData
    if (currentMarker.cover) {
      const blob = await fetch(currentMarker.cover).then((res) => res.blob())
      formData.append('marker_cover', blob, 'marker-cover.jpg')
    }

    const response = await axiosInstance.post('/marker/newMarker', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  } catch (error) {
    throw new Error('Lỗi khi thêm điểm dữ liệu mới', error)
  }
}

export const updateMarker = async (marker_id, updatedFields) => {
  try {
    const formData = new FormData()

    // Thêm tất cả các field đã cập nhật vào formData
    Object.keys(updatedFields).forEach((key) => {
      formData.append(`marker_${key}`, updatedFields[key])
    })

    // Nếu có ảnh, chuyển đổi Blob URL thành File và thêm vào FormData
    if (updatedFields.cover) {
      const blob = await fetch(updatedFields.cover).then((res) => res.blob())
      formData.append('marker_cover', blob, 'marker-cover.jpg')
    }

    // Gửi dữ liệu qua PUT request
    const response = await axiosInstance.put(`/marker/editMarker/${marker_id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return response.data.message
  } catch (error) {
    throw new Error('Lỗi khi edit dữ liệu', error)
  }
}

export const deleteMarker = async (marker_id) => {
  try {
    const response = await axiosInstance.delete(`/marker/deleteMarker/${marker_id}`)
    return response.data.message
  } catch (error) {
    throw new Error('Lỗi khi xóa marker', error)
  }
}

export const getStatisticMarkerById = async (marker_id, startDate = null, endDate = null) => {
  try {
    const payload = {
      marker_id,
      startDate: startDate || undefined,
      endDate: endDate || undefined
    }

    const response = await axiosInstance.post(`/marker/statisticsMarker/${marker_id}`, payload)
    return response.data
  } catch (error) {
    throw new Error('Lỗi khi lấy dữ liệu thống kê', error)
  }
}
