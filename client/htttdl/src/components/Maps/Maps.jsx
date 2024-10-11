import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import { GOOGLE_MAPS_API } from '../../apis/utils/contants'
import CircularProgress from '@mui/material/CircularProgress'
import MarkInfoWindow from './MarkInfoWindow'
import MapModal from '../Modal/GenericModal'
import useMaps from '../../hooks/useMaps'
import { Box, FormControl } from '@mui/material'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { markerFields } from '../../formFields/markerFields'

const Maps = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API
  })

  const {
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
  } = useMaps()

  if (loadError) return <div>Error loading maps</div>
  if (!isLoaded) return <CircularProgress />

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mb: 2 }}>
        <FormControl variant='standard'>
          <Autocomplete
            onChange={(event, value) => setSelectedMarker(value)}
            disablePortal
            options={markers}
            getOptionLabel={(option) => option.name || ''}
            renderInput={(params) => <TextField {...params} label='Cửa Hàng' />}
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                <div>
                  <strong>{option.name}</strong>
                  <br />
                  <span>{option.address}</span>
                </div>
              </li>
            )}
            sx={{ width: 300 }}
          />
        </FormControl>
      </Box>
      <GoogleMap
        mapContainerStyle={{ height: '100vh', width: '100%' }}
        center={{ lat: 10.027162287654289, lng: 105.08171805378122 }}
        zoom={13}
        onClick={handleMapClick}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => handleMarkerClick(marker)}
          />
        ))}
        {selectedMarker && (
          <MarkInfoWindow
            selectedMarker={selectedMarker}
            handleInfoWindowClose={handleInfoWindowClose}
            handleEditClick={handleEditClick}
            handleDeleteMarker={handleDeleteMarker}
          />
        )}
      </GoogleMap>

      {modalOpen && (
        <MapModal
          isLoading={isLoading}
          modalOpen={modalOpen}
          handleClose={handleModalClose}
          currentData={currentMarker}
          isEditing={isEditing}
          handleInputChange={handleInputChange}
          handleFileChange={handleFileChange}
          handleSave={handleSaveNewMarker}
          fields={markerFields}
          title='Cửa Hàng'
          coverImage={currentMarker.cover}
          updateFile={true}
        />
      )}
    </>
  )
}

export default Maps
