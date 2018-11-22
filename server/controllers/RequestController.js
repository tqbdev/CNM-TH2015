const { Request, Driver } = require('../models')
const AppConstant = require('../app.constant')

module.exports = {
  async receiveRequest (req, res) {
    try {
      const request = await Request.create(req.body)
      const requestJson = request.toJSON()

      await request.update({
        status: AppConstant.REQUEST.UNLOCATED,
        locatedAddress: null,
        locatedCoordinate: null
      })

      res.send({
        request: requestJson
      })
    } catch (err) {
      res.status(500).send({
        error: 'Error in request receiver api.'
      })
    }
  },

  async getById (req, res) {
    try {
      const request = await Request.findByPk(req.params.requestId, {
        include: [
          {
            model: Driver
          }
        ]
      })

      if (!request) {
        return res.status(404).send({
          error: 'Not found request has id ' + req.params.requestId
        })
      }

      const requestJson = request.toJSON()
      res.send({
        request: requestJson
      })
    } catch (err) {
      res.status(500).send({
        error: 'Error in get request by id.'
      })
    }
  },

  async updateById (req, res) {
    try {
      if (!req.body.locatedAddress || !req.body.locatedCoordinate) {
        return res.status(405).send({
          error: 'The update information was incorrect'
        })
      }

      const request = await Request.findByPk(req.params.requestId)

      if (!request) {
        return res.status(404).send({
          error: 'Not found request has id ' + req.params.requestId
        })
      }

      await request.update({
        status: AppConstant.REQUEST.LOCATED,
        locatedAddress: req.body.locatedAddress,
        locatedCoordinate: req.body.locatedCoordinate
      })

      const requestJson = request.toJSON()
      res.send({
        request: requestJson
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'Error in get request by id.'
      })
    }
  }
}
