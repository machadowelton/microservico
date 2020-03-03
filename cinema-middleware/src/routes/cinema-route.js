const express = require('express')
const router = express.Router()
const axios = require('axios')
const { tratarErro, tratarPagina } = require('../classes/tratativas')

const buscarPorId = async (id) => {
  const url = `${process.env.CATALOGO_CINEMA_API}/${id}`
  const response = await axios.get(url)
  const { _links, ...content } = response.data
  return content
}

router.route('/:id')
  .get(async (req, res) => {
    try {
      const id = req.params.id
      const content = await buscarPorId(id)
      res.status(200).json(content)
    } catch (error) {
      if (!error.response) {
        const t = tratarErro('Ocorreu um erro ao processar a requisição', req.originalUrl, process.env.HOST + req.originalUrl, 500, 'INTERNAL_SERVER_ERROR')
        res.status(500).json(t)
      } else {
        if (error.response.status === 404) {
          const t = tratarErro('Nenhum cinema encontrado pelo id: ' + req.params.id, req.originalUrl, process.env.CATALOGO_CINEMA_API + req.originalUrl, 404, 'NOT_FOUND')
          res.status(404).json(t)
        } else {
          const t = tratarErro('Ocorreu um erro ao processar a requisição', req.originalUrl, process.env.HOST + req.originalUrl, 500, 'INTERNAL_SERVER_ERROR')
          res.status(500).json(t)
        }
      }
    }
  })
  .put(async (req, res) => {
    try {
      const { criadoEm, modificadoEm, ...cinema } = req.body
      const id = req.params.id
      await buscarPorId(id)
      const url = `${process.env.CATALOGO_CINEMA_API}/${id}`
      const response = await axios.put(url, cinema)
      const { _links, ...content } = response.data
      res.status(200).json(content)
    } catch (error) {
      if (!error.response) {
        const t = tratarErro('Ocorreu um erro ao processar a requisição', req.originalUrl, process.env.HOST + req.originalUrl, 500, 'INTERNAL_SERVER_ERROR')
        res.status(500).json(t)
      } else {
        if (error.response.status === 404) {
          const t = tratarErro('Nenhum cinema encontrado pelo id: ' + req.params.id, req.originalUrl, process.env.CATALOGO_CINEMA_API + req.originalUrl, 404, 'NOT_FOUND')
          res.status(404).json(t)
        } else {
          const t = tratarErro('Ocorreu um erro ao processar a requisição', req.originalUrl, process.env.HOST + req.originalUrl, 500, 'INTERNAL_SERVER_ERROR')
          res.status(500).json(t)
        }
      }
    }
  })

router.route('')
  .post(async (req, res) => {
    try {
      const cinema = req.body
      const url = `${process.env.CATALOGO_CINEMA_API}`
      const response = await axios.post(url, cinema)
      const { _links, ...content } = response.data
      res.status(200).json(content)
    } catch (error) {
      const t = tratarErro('Ocorreu um erro ao processar a requisição', req.originalUrl, process.env.HOST + req.originalUrl, 500, 'INTERNAL_SERVER_ERROR')
      res.status(500).json(t)
    }
  })
  .get(async (req, res) => {
    try {
      const { numeroPagina, quantidade, ordenacao } = req.query
      let paginacao = '?'
      if (numeroPagina) paginacao += `page=${numeroPagina}&`
      if (quantidade) paginacao += `size=${quantidade}&`
      if (ordenacao) paginacao += `sort=${ordenacao}`
      const url = paginacao === '?' ? `${process.env.CATALOGO_CINEMA_API}` : `${process.env.CATALOGO_CINEMA_API}${paginacao}`
      const response = await axios.get(url)
      const { _emedded, page } = response.data
      const conteudoCinemas = _emedded.cinemas
      const cinemas = conteudoCinemas.map((cinema) => {
        const { _links, ...content } = cinema
        return content
      })
      const pagina = tratarPagina(page.size, cinemas.lenth, page.totalElements, page.totalPages, page.number)
      const conteudo = { pagina, cinemas }
      res.status(201).json(conteudo)
    } catch (error) {
      const t = tratarErro('Ocorreu um erro ao processar a requisição', req.originalUrl, process.env.HOST + req.originalUrl, 500, 'INTERNAL_SERVER_ERROR')
      res.status(500).json(t)
    }
  })
