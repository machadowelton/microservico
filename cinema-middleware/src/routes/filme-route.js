const express = require('express')
const router = express.Router()
const axios = require('axios')
const { tratarErro, tratarPagina } = require('../classes/tratativas')
const logger = require('pino')()

router.route('/:id')
  .get((req, res) => {
    const id = req.params.id
    const { buscaPorId } = require('../services/filme-service')
    buscaPorId(id)
      .then((filme) => {
        res.json(filme)
      })
      .catch((err) => {
        if (!err.response) {
          const t = tratarErro('Ocorreu um erro ao processar a requisição', req.originalUrl, process.env.HOST + req.originalUrl, 500, 'INTERNAL_SERVER_ERROR')
          res.status(500).json(t)
        } else {
          if (err.response.status === 404) {
            const t = tratarErro(`Nenhum filme encontrado pelo id: ${req.params.id}`, req.originalUrl, process.env.HOST + req.originalUrl, 404, 'NOT_FOUND')
            res.status(404).json(t)
          } else {
            const t = tratarErro('Ocorreu um erro ao processar a requisição', req.originalUrl, process.env.HOST + req.originalUrl, 500, 'INTERNAL_SERVER_ERROR')
            res.status(500).json(t)
          }
        }
      })
  })
  .put((req, res) => {
    const id = req.params.id
    const filme = req.body
    const { atualizar } = require('../services/filme-service')
    atualizar(id, filme)
      .then((filmeResponse) => {
        res.json(filmeResponse)
      })
      .catch((err) => {
        if (!err.response) {
          const t = tratarErro('Ocorreu um erro ao processar a requisição', req.originalUrl, process.env.HOST + req.originalUrl, 500, 'INTERNAL_SERVER_ERROR')
          res.status(500).json(t)
        } else {
          if (err.response.status === 404) {
            const t = tratarErro(`Nenhum filme encontrado pelo id: ${req.params.id}`, req.originalUrl, process.env.HOST + req.originalUrl, 404, 'NOT_FOUND')
            res.status(404).json(t)
          } else {
            const t = tratarErro('Ocorreu um erro ao processar a requisição', req.originalUrl, process.env.HOST + req.originalUrl, 500, 'INTERNAL_SERVER_ERROR')
            res.status(500).json(t)
          }
        }
      })
  })

router.route('')
  .post((req, res) => {
    const filme = req.body
    const { criar } = require('../services/filme-service')
    criar(filme)
      .then((filmeResponse) => {
        res.json(filmeResponse)
      })
      .catch((err) => {
        logger.error('Ocorreu um erro ao processar a requisição', err)
        const t = tratarErro('Ocorreu um erro ao processar a requisição', req.originalUrl, process.env.HOST + req.originalUrl, 500, 'INTERNAL_SERVER_ERROR')
        res.status(500).json(t)
      })
  })
  .get(async (req, res) => {
    const { numeroPagina, quantidade, ordenacao } = req.query
    const { buscarPaginado } = require('../services/filme-service')
    buscarPaginado(numeroPagina, quantidade, ordenacao)
      .then((filmes) => {
        res.json(filmes)
      })
      .catch((err) => {
        logger.error('Ocorreu um erro ao processar a requisição', err)
        const t = tratarErro('Ocorreu um erro ao processar a requisição', req.originalUrl, process.env.HOST + req.originalUrl, 500, 'INTERNAL_SERVER_ERROR')
        res.status(500).json(t)
      })
  })

module.exports = router
