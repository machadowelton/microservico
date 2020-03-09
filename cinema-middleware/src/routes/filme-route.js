const express = require('express')
const router = express.Router()

router.route('/:id')
  .get((req, res) => {
    const id = req.params.id
    const { buscarPorId } = require('../services/filme-service')
    buscarPorId(id)
      .then((filme) => res.json(filme))
      .catch((err) => {
        const { tratarErro } = require('../utils/tratativas')
        const retorno = tratarErro(err.message, req.originalUrl, `${process.env.HOST}${req.originalUrl}`, err.status, err.statusMessage)
        res.status(err.status).json(retorno)
      })
  })
  .put((req, res) => {
    const id = req.params.id
    const filme = req.body
    const { atualizar } = require('../services/filme-service')
    atualizar(id, filme)
      .then((filmeRetorno) => res.json(filmeRetorno))
      .catch((err) => {
        const { tratarErro } = require('../utils/tratativas')
        const retorno = tratarErro(err.message, req.originalUrl, `${process.env.HOST}${req.originalUrl}`, err.status, err.statusMessage)
        res.status(err.status).json(retorno)
      })
  })

router.route('')
  .get((req, res) => {
    const { numeroPagina, quantidade, ordenacao } = req.query
    const { buscarPaginado } = require('../services/filme-service')
    buscarPaginado(numeroPagina, quantidade, ordenacao)
      .then((filmes) => res.json(filmes))
      .catch((err) => {
        const { tratarErro } = require('../utils/tratativas')
        const retorno = tratarErro(err.message, req.originalUrl, `${process.env.HOST}${req.originalUrl}`, err.status, err.statusMessage)
        res.status(err.status).json(retorno)
      })
  })
  .post((req, res) => {
    const filme = req.body
    const { criar } = require('../services/filme-service')
    criar(filme)
      .then((filmeRetorno) => res.json(filmeRetorno))
      .catch((err) => {
        const { tratarErro } = require('../utils/tratativas')
        const retorno = tratarErro(err.message, req.originalUrl, `${process.env.HOST}${req.originalUrl}`, err.status, err.statusMessage)
        res.status(err.status).json(retorno)
      })
  })

module.exports = router
