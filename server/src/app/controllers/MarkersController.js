const Marker = require('../models/Marker')
const jwt = require('jsonwebtoken')

class MarkersController {
  // Lấy tất cả markers marker/getAllMarkers
  getAllMarkers(req, res, next) {
    Marker.getAll((err, results) => {
      if (err) {
        return res.status(500).json({ error: err })
      }
      res.json(results)
    })
  }

  // Thêm Marker mới marker/newMarker
  createMarker(req, res, next) {
    const {
      marker_lat,
      marker_lng,
      marker_name,
      marker_address,
      marker_phone,
      marker_description
    } = req.body
    if (
      !marker_lat ||
      !marker_lng ||
      !marker_name ||
      !marker_address ||
      !marker_phone ||
      !marker_description
    ) {
      return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin Marker.' })
    }

    const marker_cover = req.file ? req.file.path : null

    if (!marker_cover) {
      return res.status(400).json({ message: 'Vui lòng cung cấp ảnh Marker.' })
    }

    Marker.create(
      {
        marker_lat,
        marker_lng,
        marker_name,
        marker_cover,
        marker_address,
        marker_phone,
        marker_description
      },
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message })
        }

        // Kiểm tra nếu marker đã tồn tại
        if (result.exists) {
          return res.status(409).json({ message: 'Marker tại vị trí này đã tồn tại' })
        }

        // Marker được tạo thành công
        res.status(201).json({
          message: 'Marker đã được tạo thành công',
          result: result.result
        })
      }
    )
  }

  // marker/editMarker/:marker_id  - Edit 1 marker
  editMarker(req, res, next) {
    const { marker_id } = req.params
    const {
      marker_lat,
      marker_lng,
      marker_name,
      marker_address,
      marker_phone,
      marker_description
    } = req.body
    const marker_cover = req.file ? req.file.path : null

    // Gọi đến model để kiểm tra marker có tồn tại hay không và cập nhật thông tin marker
    Marker.edit(
      {
        marker_id,
        marker_lat: marker_lat || null,
        marker_lng: marker_lng || null,
        marker_name: marker_name || null,
        marker_cover: marker_cover || null,
        marker_address: marker_address || null,
        marker_phone: marker_phone || null,
        marker_description: marker_description || null
      },
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message })
        }

        // Kiểm tra nếu marker không tồn tại
        if (!result.exists) {
          return res.status(404).json({ message: 'Marker không tồn tại' })
        }

        // Marker được cập nhật thành công
        res.status(200).json({
          message: 'Marker đã được cập nhật thành công',
          result: result.result
        })
      }
    )
  }

  // marker/deleteMarker/:marker_id - Delte 1 marker
  deleteMarker(req, res, next) {
    const { marker_id } = req.params
    Marker.delete(marker_id, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message })
      }
      res.status(200).json({
        message: 'Marker đã được xóa thành công',
        result: result.result
      })
    })
  }

  // /marker/getMarkerStatistics/:marker_id - Get statistics at marker
  getMarkerStatistics(req, res, next) {
    const { marker_id } = req.params
    const { startDate, endDate } = req.body

    Marker.getStatisticById(marker_id, startDate, endDate, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message })
      }
      res.status(200).json({
        message: 'Lấy dữ liệu by ID thành công',
        result: result
      })
    })
  }
}

module.exports = new MarkersController()
