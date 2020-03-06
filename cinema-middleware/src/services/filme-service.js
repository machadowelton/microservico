module.exports.buscarPorId = async (id) => {
  const url = `${process.env.FILME_API}/${id}`
  const { get } = require('axios')
  const response = await get(url)
  const { _links, ...content } = response.data
  return content
}

module.exports.atualizar = async (id, filme) => {
  await this.buscarPorId(id)
  const url = `${process.env.FILME_API}/${id}`
  const { put } = require('axios')
  const response = await put(url, filme)
  const { _links, ...content } = response.data
  return content
}

module.exports.buscarPaginado = async (numeroPagina, quantidade, ordenacao) => {
  const { tratarPaginacao } = require('../utils/tratativas')
  const url = tratarPaginacao(`${process.env.FILME_API}`, numeroPagina, quantidade, ordenacao)
  const { get } = require('axios')
  const response = await get(url)
  const { _embedded, page } = response.data
  const conteudoFilmes = _embedded.filmes
  const filmes = conteudoFilmes.map((filme) => {
    const { _links, ...content } = filme
    return content
  })
  const { tratarPagina } = require('../utils/tratativas')
  const pagina = tratarPagina(page.size, filmes.length, page.totalElements, page.totalPages, page.number)
  const conteudo = { pagina, filmes }
  return conteudo
}

module.exports.criar = async (filme) => {
  const url = `${process.env.FILME_API}`
  const { post } = require('axios')
  const response = await post(url, filme)
  const { _links, ...content } = response.data
  return content
}
