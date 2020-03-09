const express = require('express')
const router = express.Router()

router.route('/:id')
  .get((req, res) => {
    const { id, idCinema } = req.params
    const { buscarPorIdEIdCinema } = require('../services/sala-service')
    buscarPorIdEIdCinema(id, idCinema)
      .then((cinema) => res.json(cinema))
      .catch((err) => {
        const { tratarErro } = require('../utils/tratativas')
        const retorno = tratarErro(err.message, req.originalUrl, `${process.env.HOST}${req.originalUrl}`, err.status, err.statusMessage)
        res.status(err.status).json(retorno)
      })
  })
  .put((req, res) => {
    const { id, idCinema } = req.params
    const sala = req.body
    const { atualizar } = require('../services/sala-service')
    atualizar(id, idCinema, sala)
      .then((salaRetorno) => res.json(salaRetorno))
      .catch((err) => {
        const { tratarErro } = require('../utils/tratativas')
        const retorno = tratarErro(err.message, req.originalUrl, `${process.env.HOST}${req.originalUrl}`, err.status, err.statusMessage)
        res.status(err.status).json(retorno)
      })
  })

router.route('')
  .get((req, res) => {
    const { numeroPagina, quantidade, ordenacao } = req.query
    const { idCinema } = req.params
    const { buscarPorIdCinemaPaginado } = require('../services/sala-service')
    buscarPorIdCinemaPaginado(idCinema, numeroPagina, quantidade, ordenacao)
      .then((salas) => res.json(salas))
      .catch((err) => {
        const { tratarErro } = require('../utils/tratativas')
        const retorno = tratarErro(err.message, req.originalUrl, `${process.env.HOST}${req.originalUrl}`, err.status, err.statusMessage)
        res.status(err.status).json(retorno)
      })
  })
  .post((req, res) => {
    const { idCinema } = req.params
    const sala = req.body
    const { criar } = require('../services/sala-service')
    criar(idCinema, sala)
      .then((salaRetono) => res.json(salaRetono))
      .catch((err) => {
        const { tratarErro } = require('../utils/tratativas')
        const retorno = tratarErro(err.message, req.originalUrl, `${process.env.HOST}${req.originalUrl}`, err.status, err.statusMessage)
        res.status(err.status).json(retorno)
      })
  })

module.exports = router