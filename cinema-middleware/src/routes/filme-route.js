const express = require('express')
const router = express.Router()
const axios = require('axios')
const { tratarErro, tratarPagina } = require('../classes/tratativas')

const buscarPorId = async (id) => {
  const url = `${process.env.FILME_API}/${id}`
  const response = await axios.get(url)
  const { _links, ...content } = response.data
  return content
}

router.route('/:id')
  .get(async (req, res) => {
    try {
      const id = req.params.id
      const content = await buscarPorId(id)
      res.json(content)
    } catch (error) {
      if (!error.response) {
        const t = tratarErro('Ocorreu um erro ao processar a requisição', req.originalUrl, process.env.HOST + req.originalUrl, 500, 'INTERNAL_SERVER_ERROR')
        res.status(500).json(t)
      } else {
        if (error.response.status === 404) {
          const t = tratarErro(`Nenhum filme encontrado pelo id: ${req.params.id}`, req.originalUrl, process.env.HOST + req.originalUrl, 404, 'NOT_FOUND')
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
      const { criadoEm, modificadoEm, ...filme } = req.body
      const id = req.params.id
      await buscarPorId(id)
      const url = `${process.env.FILME_API}/${id}`
      const response = await axios.put(url, filme)
      const { _links, ...content } = response.data
      res.status(200).json(content)
    } catch (error) {
      if (!error.response) {
        const t = tratarErro('Ocorreu um erro ao processar a requisição', req.originalUrl, process.env.HOST + req.originalUrl, 500, 'INTERNAL_SERVER_ERROR')
        res.status(500).json(t)
      } else {
        if (error.response.status === 404) {
          const t = tratarErro(`Nenhum filme encontrado pelo id: ${req.params.id}`, req.originalUrl, process.env.HOST + req.originalUrl, 404, 'NOT_FOUND')
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
      const filme = req.body
      const url = `${process.env.FILME_API}`
      const response = await axios.post(url, filme)
      const { _links, ...content } = response.data
      res.status(201).json(content)
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
      const url = paginacao === '?' ? `${process.env.FILME_API}` : `${process.env.FILME_API}${paginacao}`
      const response = await axios.get(url)
      const { _embedded, page } = response.data
      const conteudoFilmes = _embedded.filmes
      const filmes = conteudoFilmes.map((filme) => {
        const { _links, ...content } = filme
        return content
      })
      const pagina = tratarPagina(page.size, filmes.length, page.totalElements, page.totalPages, page.number)
      const conteudo = { pagina, filmes }
      res.status(200).json(conteudo)
    } catch (error) {
      const t = tratarErro('Ocorreu um erro ao processar a requisição', req.originalUrl, process.env.HOST + req.originalUrl, 500, 'INTERNAL_SERVER_ERROR')
      res.status(500).json(t)
    }
  })

module.exports = router
