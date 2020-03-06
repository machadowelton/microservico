module.exports.buscarPorId = async (id) => {
  const { get } = require('axios')
  const url = `${process.env.CATALOGO_CINEMA_API}/${id}`
  const response = await get(url)
  const { _links, ...content } = response.data
  return content
}

module.exports.buscarPaginado = async (numeroPagina, quantidade, ordenacao) => {
  const { tratarPaginacao } = require('../utils/tratativas')
  const url = tratarPaginacao(`${process.env.CATALOGO_CINEMA_API}`, numeroPagina, quantidade, ordenacao)
  const { get } = require('axios')
  const response = await get(url)
  const { _embedded, page } = response.data
  const conteudoCinemas = _embedded.cinemas
  const cinemas = conteudoCinemas.map((cinema) => {
    const { _links, ...content } = cinema
    return content
  })
  const { tratarPagina } = require('../classes/tratativas')
  const pagina = tratarPagina(page.size, cinemas.lenth, page.totalElements, page.totalPages, page.number)
  const conteudo = { pagina, cinemas }
  return conteudo
}

module.exports.criar = async (cinema) => {
  const url = `${process.env.CATALOGO_CINEMA_API}`
  const { post } = require('axios')
  const response = post(url, cinema)
  const { _links, ...content } = response.data
  return content
}

module.exports.atualizar = async (id, cinema) => {
  await this.buscarPorId(id)
  const url = `${process.env.CATALOGO_CINEMA_API}/${id}`
  const { put } = require('axios')
  const response = await put(url, cinema)
  const { _links, ...content } = response.data
  return content
}
