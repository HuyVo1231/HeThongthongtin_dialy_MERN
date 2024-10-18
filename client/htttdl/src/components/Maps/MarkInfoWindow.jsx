import { InfoWindow } from '@react-google-maps/api'
import { Box, Button, Typography, CardMedia, Card } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'
import { Description as DescriptionIcon, Store as StoreIcon } from '@mui/icons-material'
import StatisticDialog from './Statistics/StatisticDialog'
import useStatistics from '../../hooks/useStatistics'

const infoWindowStyles = {
  container: {
    minWidth: 300,
    borderRadius: 1,
    boxShadow: 3,
    bgcolor: 'background.paper'
  },
  card: {
    maxWidth: '100%',
    mb: 2
  },
  cardMedia: {
    width: '100%',
    height: '150px',
    objectFit: 'cover'
  },
  typography: {
    display: 'flex',
    alignItems: 'center',
    mb: 1
  },
  icon: {
    mr: 1,
    color: 'primary.main'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    mt: 2,
    gap: 1
  },
  button: {
    backgroundColor: (theme) => theme.palette.error.light,
    '&:hover': {
      backgroundColor: (theme) => theme.palette.error.main
    }
  },
  buttonDelete: {
    borderColor: (theme) => theme.palette.error.light,
    color: (theme) => theme.palette.error.light,
    '&:hover': {
      backgroundColor: (theme) => theme.palette.error.light,
      color: 'white'
    }
  }
}

const MarkInfoWindow = ({
  selectedMarker,
  handleInfoWindowClose,
  handleEditClick,
  handleDeleteMarker
}) => {
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

  return (
    <Box>
      <InfoWindow
        position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
        onCloseClick={handleInfoWindowClose}>
        <Box sx={infoWindowStyles.container}>
          <Card sx={infoWindowStyles.card}>
            <CardMedia
              component='img'
              alt={selectedMarker.name}
              sx={infoWindowStyles.cardMedia}
              image={selectedMarker.cover}
            />
          </Card>
          <Typography variant='h6' sx={infoWindowStyles.typography}>
            <StoreIcon sx={infoWindowStyles.icon} />
            {selectedMarker.name}
          </Typography>
          <Typography sx={infoWindowStyles.typography}>
            <LocationOnIcon sx={infoWindowStyles.icon} />
            {selectedMarker.address}
          </Typography>
          <Typography sx={infoWindowStyles.typography}>
            <PhoneIcon sx={infoWindowStyles.icon} />
            {selectedMarker.phone}
          </Typography>
          <Typography sx={infoWindowStyles.typography}>
            <DescriptionIcon sx={infoWindowStyles.icon} />
            {selectedMarker.description}
          </Typography>
          <Box sx={infoWindowStyles.buttonContainer}>
            <Button variant='contained' onClick={handleEditClick} sx={infoWindowStyles.button}>
              Edit
            </Button>
            <Button variant='contained' onClick={handleOpenStatistic} sx={infoWindowStyles.button}>
              View Details
            </Button>
            <Button
              variant='outlined'
              onClick={handleDeleteMarker}
              sx={infoWindowStyles.buttonDelete}>
              Delete
            </Button>
          </Box>
        </Box>
      </InfoWindow>

      <StatisticDialog
        open={open}
        onClose={handleStatisticClose}
        selectedMarker={selectedMarker}
        statistics={statistics}
        updateStatistics={updateStatistics}
      />
    </Box>
  )
}

export default MarkInfoWindow
