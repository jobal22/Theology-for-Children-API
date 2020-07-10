const express = require('express')
const PlantitlesService = require('./plantitle-service')
const logger = require('../logger')

const PlantitlesRouter = express.Router()
const jsonParser = express.json()


PlantitlesRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    PlantitlesService.getAllPlantitles(knexInstance)
      .then(plantitles => {
          res.json(plantitles)
      })
      .catch(next)
  })

  PlantitlesRouter
  .route('/:plantitleId')
  .all((req, res, next) => {
    PlantitlesService.getById(
      req.app.get('db'),
      req.params.plantitleId
    )
      .then(plantitle => {
        if (!plantitle) {
          return res.status(404).json({
            error: { message: `Plan Title doesn't exist` }
          })
        }
        res.plantitle = plantitle
        next()
      })
      .catch(next)
  })

  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    PlantitlesService.getById(knexInstance, req.params.plantitleId)
      .then(plantitle => {
        if (!plantitle) {
          return res.status(404).json({
            error: { message: `Plan Title doesn't exist` }
          })
        }
        res.json(plantitle)
      })
      .catch(next)
  })

module.exports = PlantitlesRouter