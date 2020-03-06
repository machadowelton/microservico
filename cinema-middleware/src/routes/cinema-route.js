const express = require('express')
const router = express.Router()
const logger = require('pino')()
const { tratarErro } = require('../classes/tratativas')

router.route('/:id')
  .get((req, res) => {
    const { buscarPorId } = require('../services/cinema-service')
    const id = req.params.id
    buscarPorId(id)
      .then((cinema) => {
        res.json(cinema)
      })
      .catch((err) => {
        if (!err.response) {
          const t = tratarErro('Ocorreu um erro ao processar a requisição', req.originalUrl, process.env.HOST + req.originalUrl, 500, 'INTERNAL_SERVER_ERROR')
          logger.error('Ocorreu um erro ao processar a requisição', err)
          res.status(500).json(t)
        } else {
          if (err.response.status === 404) {
            const t = tratarErro('Nenhum cinema encontrado pelo id: ' + req.params.id, req.originalUrl, process.env.CATALOGO_CINEMA_API + req.originalUrl, 404, 'NOT_FOUND')
            res.status(404).json(t)
          } else {
            const t = tratarErro('Ocorreu um erro ao processar a requisição', req.originalUrl, process.env.HOST + req.originalUrl, 500, 'INTERNAL_SERVER_ERROR')
            logger.error('Ocorreu um erro ao processar a requisição', err)
            res.status(500).json(t)
          }
        }
      })
  })
  .put((req, res) => {
    const id = req.params.id
    const cinema = req.body
    const { atualizar } = require('../services/cinema-service')
    atualizar(id, cinema)
      .then((cinemaReponse) => {
        res.json(cinemaReponse)
      })
      .catch((err) => {
        if (!err.response) {
          const t = tratarErro('Ocorreu um erro ao processar a requisição', req.originalUrl, process.env.HOST + req.originalUrl, 500, 'INTERNAL_SERVER_ERROR')
          logger.error('Ocorreu um erro ao processar a requisição', err)
          res.status(500).json(t)
        } else {
          if (err.response.status === 404) {
            const t = tratarErro('Nenhum cinema encontrado pelo id: ' + req.params.id, req.originalUrl, process.env.CATALOGO_CINEMA_API + req.originalUrl, 404, 'NOT_FOUND')
            res.status(404).json(t)
          } else {
            const t = tratarErro('Ocorreu um erro ao processar a requisição', req.originalUrl, process.env.HOST + req.originalUrl, 500, 'INTERNAL_SERVER_ERROR')
            logger.error('Ocorreu um erro ao processar a requisição', err)
            res.status(500).json(t)
          }
        }
      })
  })

router.route('')
  .post((req, res) => {
    const cinema = req.body
    const { criar } = require('../services/cinema-service')
    criar(cinema)
      .then((cinemaResponse) => {
        res.json(cinemaResponse)
      })
      .catch((err) => {
        logger.error('Ocorreu um erro ao processar a requisição', err)
        const t = tratarErro('Ocorreu um erro ao processar a requisição', req.originalUrl, process.env.HOST + req.originalUrl, 500, 'INTERNAL_SERVER_ERROR')
        res.status(500).json(t)
      })
  })
  .get((req, res) => {
    const { numeroPagina, quantidade, ordenacao } = req.query
    const { buscarPaginado } = require('../services/cinema-service')
    buscarPaginado(numeroPagina, quantidade, ordenacao)
      .then((cinemas) => {
        res.json(cinemas)
      })
      .catch((err) => {
        logger.error('Ocorreu um erro ao processar a requisição', err)
        const t = tratarErro('Ocorreu um erro ao processar a requisição', req.originalUrl, process.env.HOST + req.originalUrl, 500, 'INTERNAL_SERVER_ERROR')
        res.status(500).json(t)
      })
  })

module.exports = router
