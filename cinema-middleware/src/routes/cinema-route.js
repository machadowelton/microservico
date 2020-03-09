const express = require('express')
const router = express.Router()

router.route('/:id')
  .get((req, res) => {
    const id = req.params.id
    const { buscarPorId } = require('../services/cinema-service')
    buscarPorId(id)
      .then((cinema) => res.json(cinema))
      .catch((err) => {
        const { tratarErro } = require('../utils/tratativas')
        const retorno = tratarErro(err.message, req.originalUrl, `${process.env.HOST}${req.originalUrl}`, err.status, err.statusMessage)
        res.status(err.status).json(retorno)
      })
  })
  .put((req, res) => {
    const id = req.params.id
    const cinema = req.body
    const { atualizar } = require('../services/cinema-service')
    atualizar(id, cinema)
      .then((cinemaRetorno) => res.json(cinemaRetorno))
      .catch((err) => {
        const { tratarErro } = require('../utils/tratativas')
        const retorno = tratarErro(err.message, req.originalUrl, `${process.env.HOST}${req.originalUrl}`, err.status, err.statusMessage)
        res.status(err.status).json(retorno)
      })
  })

router.route('')
  .get((req, res) => {
    const { numeroPagina, quantidade, ordenacao } = req.query
    const { buscarPaginado } = require('../services/cinema-service')
    buscarPaginado(numeroPagina, quantidade, ordenacao)
      .then((cinemas) => res.json(cinemas))
      .catch((err) => {
        const { tratarErro } = require('../utils/tratativas')
        const retorno = tratarErro(err.message, req.originalUrl, `${process.env.HOST}${req.originalUrl}`, err.status, err.statusMessage)
        res.status(err.status).json(retorno)
      })
  })
  .post((req, res) => {
    const cinema = req.body
    const { criar } = require('../services/cinema-service')
    criar(cinema)
      .then((cinemaRetorno) => res.json(cinemaRetorno))
      .catch((err) => {
        const { tratarErro } = require('../utils/tratativas')
        const retorno = tratarErro(err.message, req.originalUrl, `${process.env.HOST}${req.originalUrl}`, err.status, err.statusMessage)
        res.status(err.status).json(retorno)
      })
  })

module.exports = router