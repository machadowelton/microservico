const buscarSalaPorIdEIdCinema = async (id, idCinema) => {
  const url = `${process.env.CATALOGO_CINEMA_SALA_API}/search/buscarPorIdEIdCinema?id=${id}&idCinema=${idCinema}`
  const { get } = require('axios')
  const response = await get(url)
  const { _links, ...content } = response.data
  return content
}


module.exports.buscarPorIdEIdCinema = async (id, idCinema) => {
  try {
    return await buscarSalaPorIdEIdCinema(id, idCinema)
  } catch (error) {
    if (!error.response) {
      const err = new Error('Ocorreu um erro ao processar a requisição')
      err.status = 500
      err.statusMessage = 'INTERNAVAL_SERVER_ERROR'
      throw err
    } else if (!error.response.status === 404) {
      const err = new Error(`Nenhuma sala encontrada pelo id: ${id} e idCinema: ${idCinema}`)
      err.status = 404
      err.statusMessage = 'NOT_FOUND'
      throw err
    }
  }
}

module.exports.buscarPorIdCinemaPaginado = async (
  idCinema,
  numeroPagina,
  quantidade,
  ordenacao
) => {
  try {
    const { tratarPaginacao } = require('../utils/tratativas')
    const url = tratarPaginacao(
      `${process.env.CATALOGO_CINEMA_SALA_API}/search/buscarPorIdCinema?idCinema=${idCinema}&`,
      numeroPagina,
      quantidade,
      ordenacao
    )
    const { get } = require('axios')
    const response = await get(url)
    const { _embedded, page } = response.data
    const conteudoSala = _embedded.salas
    const salas = conteudoSala.map(sala => {
      const { _links, ...content } = sala
      return content
    })
    const { tratarPagina } = require('../utils/tratativas')
    const pagina = tratarPagina(
      page.size,
      salas.length,
      page.totalElements,
      page.totalPages,
      page.number
    )
    const conteudo = { pagina, salas }
    return conteudo
  } catch (error) {
    if (!error.response) {
      const err = new Error('Ocorreu um erro ao processar a requisição')
      err.status = 500
      err.statusMessage = 'INTERNAVAL_SERVER_ERROR'
      throw err
    } else if (!error.response.status === 404) {
      const err = new Error(
        `Nenhuma sala encontrada pelo id: ${id} e idCinema: ${idCinema}`
      )
      err.status = 404
      err.statusMessage = 'NOT_FOUND'
      throw err
    }
  }
}

module.exports.criar = async (idCinema, sala) => {
  try {
    const { buscarPorId } = require('./cinema-service')
    await buscarPorId(idCinema)
    const novaSala = { ...sala, idCinema }
    const url = `${process.env.CATALOGO_CINEMA_SALA_API}`
    const { post } = require('axios')
    const response = await post(url, novaSala)
    const { _links, ...content } = response.data
    return content
  } catch (error) {
    const err = new Error('Ocorreu um erro ao processar a requisição')
    err.status = 500
    err.statusMessage = 'INTERNAVAL_SERVER_ERROR'
    throw err
  }
}

module.exports.atualizar = async (id, idCinema, sala) => {
  try {
    await buscarSalaPorIdEIdCinema(id, idCinema)
    const url = `${process.env.CATALOGO_CINEMA_SALA_API}`
    const { put } = require('axios')
    const { response } = await put(url, sala)
    const { _links, ...content } = response.data
    return content
  } catch (error) {
    if (!error.response) {
      const err = new Error('Ocorreu um erro ao processar a requisição')
      err.status = 500
      err.statusMessage = 'INTERNAVAL_SERVER_ERROR'
      throw err
    } else if (!error.response.status === 404) {
      const err = new Error(
        `Nenhuma sala encontrada pelo id: ${id} e idCinema: ${idCinema}`
      )
      err.status = 404
      err.statusMessage = 'NOT_FOUND'
      throw err
    }    
  }
}
