const buscarCinemaPorId = async (id) => {
  const urlconst url = `${process.env.CATALOGO_CINEMA_API}/${id}`
  const { get } = require('axios')
  const response = await get(url)
  const { _links, ...content } = response.data
  return content
}


module.exports.buscarPorId = async (id) => {
  try {
    return await buscarCinemaPorId(id)
  } catch (error) {
    if (!error.response) {
      const err = new Error('Ocorreu um erro ao processar a requisição')
      err.status = 500
      err.statusMessage = 'INTERNAVAL_SERVER_ERROR'
      throw err
    } else if (!error.response.status === 404) {
      const err = new Error(`Nenhum cinema encontrado pelo id: ${id}`)
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
  } catch (error) {
    const err = new Error('Ocorreu um erro ao processar a requisição')
    err.status = 500
    err.statusMessage = 'INTERNAVAL_SERVER_ERROR'
    throw err
  }
}

module.exports.atualizar = async (id, cinema) => {
  try {
    await buscarCinemaPorId(id)
    const url = `${process.env.CATALOGO_CINEMA_API}/${id}`
    const { put } = require('axios')
    const response = await put(url, cinema)
    const { _links, ...content } = response.data
    return content
  } catch (error) {
    if (!error.response) {
      const err = new Error('Ocorreu um erro ao processar a requisição')
      err.status = 500
      err.statusMessage = 'INTERNAVAL_SERVER_ERROR'
      throw err
    } else if (!error.response.status === 404) {
      const err = new Error(`Nenhum cinema encontrado pelo id: ${id}`)
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

module.exports.criar = async (cinema) => {
  try {
    const url = `${process.env.CATALOGO_CINEMA_API}`
    const { post } = require('axios')
    const response = post(url, cinema)
    const { _links, ...content } = response.data
    return content
  } catch (error) {
    const err = new Error('Ocorreu um erro ao processar a requisição')
    err.status = 500
    err.statusMessage = 'INTERNAVAL_SERVER_ERROR'
    throw err   
  }
}