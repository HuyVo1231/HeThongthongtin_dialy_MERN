const express = require('express')
const router = express.Router()
const markersController = require('../app/controllers/MarkersController')
const authenticateToken = require('../app/middleware/utillities').authenticateToken
const { storage } = require('../config/multerConfig')
const multer = require('multer')
const upload = multer({ storage })

router.get('/getAllMarkers', markersController.getAllMarkers)
router.post('/newMarker', upload.single('marker_cover'), markersController.createMarker)
router.put('/editMarker/:marker_id', upload.single('marker_cover'), markersController.editMarker)
router.delete('/deleteMarker/:marker_id', markersController.deleteMarker)
router.post('/statisticsMarKer/:marker_id', markersController.getMarkerStatistics)

module.exports = router
