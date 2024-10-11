import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { addMarkers, deleteMarker, fetchMarkers, updateMarker } from '../apis/markerAPI'
import { useConfirm } from 'material-ui-confirm'
import { getUpdatedFields } from '../utils/fieldUtils'
import { validateFields } from '../utils/validation'

const useMaps = () => {
  const confirm = useConfirm()
  const [markers, setMarkers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedMarker, setSelectedMarker] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [currentMarker, setCurrentMarker] = useState({
    id: null,
    lat: null,
    lng: null,
    name: '',
    address: '',
    phone: '',
    description: '',
    cover: ''
  })

  const handleMapClick = (event) => {
    if (modalOpen) {
      setModalOpen(false)
      return
    }
    if (selectedMarker) {
      setSelectedMarker(null)
      return
    }
    setCurrentMarker({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      name: '',
      address: '',
      phone: '',
      description: '',
      cover: ''
    })
    setIsEditing(false)
    setModalOpen(true)
  }

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker)
  }

  const handleInfoWindowClose = () => {
    setSelectedMarker(null)
  }

  const handleDeleteMarker = () => {
    confirm({
      description: 'Hành động này sẽ không thể khôi phục được!',
      title: 'Bạn có chắc là muốn xóa marker này không?'
    })
      .then(() => {
        const markersAfterDelete = markers.filter((marker) => marker.id !== selectedMarker.id)
        setMarkers(markersAfterDelete)
        toast.success('Xóa marker thành công')

        // Call Api
        deleteMarker(selectedMarker.id)
        setSelectedMarker(null)
      })
      .catch(() => {})
  }

  const handleModalClose = () => {
    setModalOpen(false)
    setCurrentMarker({
      id: null,
      lat: null,
      lng: null,
      name: '',
      address: '',
      phone: '',
      description: '',
      cover: ''
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCurrentMarker((prevMarker) => ({
      ...prevMarker,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setCurrentMarker((prevMarker) => ({
        ...prevMarker,
        cover: imageUrl
      }))
    }
  }

  const handleEditClick = () => {
    setIsEditing(true)
    setCurrentMarker(selectedMarker)
    setModalOpen(true)
  }

  const handleSaveNewMarker = async () => {
    // const { name, address, phone, lat, lng, cover } = currentMarker

    // Kiểm tra các field hợp lệ
    if (!validateFields(currentMarker)) {
      return
    }

    setIsLoading(true)

    try {
      if (isEditing) {
        const updated = await updateExistingMarker(
          currentMarker,
          markers,
          setMarkers,
          setSelectedMarker
        )

        // Nếu không có thay đổi, kết thúc
        if (!updated) {
          setIsLoading(false)
          return
        }
      } else {
        await saveNewMarker(currentMarker, markers, setMarkers, setSelectedMarker)
        toast.success('Marker đã được lưu thành công!')
      }
    } catch (error) {
      // toast.error('Lỗi thêm marker Vui lòng kiểm tra lại.', error)
    } finally {
      setIsLoading(false)
      resetMarkerState()
    }
  }

  const saveNewMarker = async (currentMarker, markers, setMarkers, setSelectedMarker) => {
    // Gửi dữ liệu lên server
    const response = await addMarkers(currentMarker)

    // Kiểm tra phản hồi
    if (response && response.result && response.result.insertId) {
      const newMarker = { ...currentMarker, id: response.result.insertId }

      // Cập nhật danh sách markers
      setMarkers((prevMarkers) => [...prevMarkers, newMarker])
      setSelectedMarker(newMarker)
    } else {
      throw new Error('Failed to get new marker ID')
    }
  }

  const updateExistingMarker = async (currentMarker, markers, setMarkers, setSelectedMarker) => {
    const selectedMarker = markers.find((marker) => marker.id === currentMarker.id) || {}

    // Sử dụng hàm getUpdatedFields với danh sách các field cần kiểm tra
    const updatedFields = getUpdatedFields(currentMarker, selectedMarker, [
      'name',
      'address',
      'phone',
      'lat',
      'lng',
      'description',
      'cover'
    ])

    // Nếu không có thay đổi, thông báo cho người dùng và kết thúc
    if (Object.keys(updatedFields).length === 0) {
      toast.info('Không có thay đổi nào để cập nhật.')
      return false
    }

    // Gửi yêu cầu cập nhật marker với các trường đã thay đổi
    await updateMarker(currentMarker.id, updatedFields)
    toast.success('Marker đã được cập nhật thành công!')

    // Cập nhật danh sách markers và selectedMarker
    const updatedMarkers = markers.map((marker) =>
      marker.id === currentMarker.id ? { ...marker, ...updatedFields } : marker
    )
    setMarkers(updatedMarkers)

    if (selectedMarker.id === currentMarker.id) {
      setSelectedMarker({ ...selectedMarker, ...updatedFields })
    }

    return true
  }

  const resetMarkerState = () => {
    setCurrentMarker({
      id: null,
      lat: null,
      lng: null,
      name: '',
      address: '',
      phone: '',
      description: '',
      cover: ''
    })
    setModalOpen(false)
    setIsEditing(false)
  }

  useEffect(() => {
    const loadMarkers = async () => {
      try {
        const markersData = await fetchMarkers()
        setMarkers(markersData)
      } catch (error) {
        toast.error('Failed to load markers.', error)
      }
    }

    loadMarkers()
  }, [])

  return {
    markers,
    isLoading,
    selectedMarker,
    currentMarker,
    isEditing,
    modalOpen,
    setSelectedMarker,
    handleDeleteMarker,
    handleMapClick,
    handleMarkerClick,
    handleInfoWindowClose,
    handleModalClose,
    handleInputChange,
    handleFileChange,
    handleSaveNewMarker,
    handleEditClick
  }
}

export default useMaps
