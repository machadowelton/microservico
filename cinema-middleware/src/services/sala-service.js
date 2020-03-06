module.exports.buscarPorId = async (id) => {
  const url = `${process.env.CATALOGO_CINEMA_SALA_API}/${id}`
  const { get } = require('axios')
  const response = get(url)
  const { _links, ...content } = response.data
  return content
}

module.exports.buscarPaginadoPorIdCinema = async (id, numeroPagina, quantidade, ordenacao) => {
  const { tratarPaginacao } = require('../utils/tratativas')
  const url = `${process.env.CATALOGO_CINEMA_SALA_API}/search/buscarPorIdCinema?idCinema=${id}&`
  const completeUrl = tratarPaginacao(url, numeroPagina, quantidade, ordenacao)
  const { get } = require('axios')
  const response = await get(completeUrl)
  const { _embedded, page } = response.data
  const conteudoSalas = _embedded.salas
  const salas = conteudoSalas.map((sala) => {
    const { _links, ...content } = sala
    return content
  })
  const { tratarPagina } = require('../utils/tratativas')
  const pagina = tratarPagina(page.size, salas.length, page.totalElements, page.totalPages, page.number)
  const conteudo = { pagina, salas }
  return conteudo
}

module.exports.criar = async (idCinema, sala) => {
  const { buscarPorid } = require('./cinema-service')
  const cinema = await buscarPorid(idCinema)
  const url = `${process.env.CATALOGO_CINEMA_SALA_API}`
  const newSala = {
    ...sala,
    idCinema
  }
  const { post } = require('axios')
  const response = await post(url, newSala)
  const { _links, ...content } = response.data
  const newCinema = addSalaCinema(cinema, content.id)
  const { atualizar } = require('./cinema-service')
  await atualizar(cinema.id, newCinema)
  return content
}

const addSalaCinema = (cinema, idSala) => {
  const { salas, ...rest } = cinema
  salas.push(idSala)
  const content = {
    ...rest,
    salas
  }
  return content
}
