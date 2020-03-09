const buscarFilmePorId = async (id) => {
  const url = `${process.env.FILME_API}/${id}`
  const { get } = require('axios')
  const response = get(url)
  const { _links, ...content } = response.data
  return content
}

module.exports.buscarPorId = async (id) => {
  try {
    return await buscarFilmePorId(id)
  } catch (error) {
    if (!error.response) {
      const err = new Error('Ocorreu um erro ao processar a requisição')
      err.status = 500
      err.statusMessage = 'INTERNAVAL_SERVER_ERROR'
      throw err
    } else if (!error.response.status === 404) {
      const err = new Error(`Nenhum filmes encontrado pelo id: ${id}`)
      err.status = 404
      err.statusMessage = 'NOT_FOUND'
      throw err
    } else {
      const err = new Error('Ocorreu um erro ao processar a requisição')
      err.status = 500
      err.statusMessage = 'INTERNAVAL_SERVER_ERROR'
      throw err
    }
  }
}

module.exports.buscarPaginado = async (numeroPagina, quantidade, ordenacao) => {
  try {
    const { tratarPaginacao } = require('../utils/tratativas')
    const url = tratarPaginacao(process.env.FILME_API, numeroPagina, quantidade, ordenacao)
    const { get } = require('axios')
    const response = get(url)
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
  } catch (error) {
    const err = new Error('Ocorreu um erro ao processar a requisição')
    err.status = 500
    err.statusMessage = 'INTERNAVAL_SERVER_ERROR'
    throw err
  }
}


module.exports.atualizar = async (id, filme) => {
  try {
    await buscarFilmePorId(id)
    const url = `${process.env.FILME_API}/${id}`
    const { put } = require('axios')
    const response = await put(url, filme)
    const { _links, ...content } = response.data
    return content
  } catch (error) {
    if (!error.response) {
      const err = new Error('Ocorreu um erro ao processar a requisição')
      err.status = 500
      err.statusMessage = 'INTERNAVAL_SERVER_ERROR'
      throw err
    } else if (!error.response.status === 404) {
      const err = new Error(`Nenhuma sfilmes encontrado pelo id: ${id}`)
      err.status = 404
      err.statusMessage = 'NOT_FOUND'
      throw err
    } else {
      const err = new Error('Ocorreu um erro ao processar a requisição')
      err.status = 500
      err.statusMessage = 'INTERNAVAL_SERVER_ERROR'
      throw err
    }     
  }
}

module.exports.criar = async (filme) => {
  try {
    const url = process.env.FILME_API
    const { post } = require('axios')
    const response = await post(url)
    const { _links, ...content } = response.data
    return content
  } catch (error) {
    const err = new Error('Ocorreu um erro ao processar a requisição')
    err.status = 500
    err.statusMessage = 'INTERNAVAL_SERVER_ERROR'
    throw err
  }
}