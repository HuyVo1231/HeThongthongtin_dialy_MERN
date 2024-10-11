import { useState } from 'react'
import { getStatisticMarkerById } from '../apis/markerAPI'

const useStatistics = () => {
  const [statistics, setStatistics] = useState(null)

  const getStatistics = async (marker_id, startDate = null, endDate = null) => {
    try {
      const data = await getStatisticMarkerById(marker_id, startDate, endDate)
      setStatistics(data.result)
      return data.result
    } catch (error) {
      console.error(error)
    }
  }

  return {
    statistics,
    setStatistics,
    getStatistics
  }
}

export default useStatistics
