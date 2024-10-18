import useStatistics from './useStatistics'

const useMarkInfoWindow = (selectedMarker) => {
  const { statistics, getStatistics, setStatistics, open, setOpen, handleStatisticClose } =
    useStatistics()

  const updateStatistics = (newStatistics) => {
    setStatistics(newStatistics)
  }

  const handleOpenStatistic = async () => {
    setOpen(true)
    try {
      const newStatistics = await getStatistics(selectedMarker.id)
      updateStatistics(newStatistics)
    } catch (error) {
      console.error('Error fetching statistics:', error)
    }
  }

  return {
    statistics,
    open,
    handleOpenStatistic,
    handleStatisticClose,
    updateStatistics // Chỉ trả về hàm cần thiết
  }
}

export default useMarkInfoWindow
