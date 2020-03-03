const tratarErro = (msg, path, url, statusCode, statusMessage) => {
  const e = new Erro(msg, path, url, statusCode, statusMessage)
  return e
}

const tratarPagina = (elementoPorPagina, elementosNaPagina, totalElementos, totalPaginas, numeroPagina) => {
  const p = new Pagina(elementoPorPagina, elementosNaPagina, totalElementos, totalPaginas, numeroPagina)
  return p
}

module.exports.tratarErro = tratarErro
module.exports.tratarPagina = tratarPagina

class Erro {
  constructor (msg, path, url, statusCode, statusMessage) {
    this.msg = msg
    this.path = path
    this.url = url
    this.statusCode = statusCode
    this.statusMessage = statusMessage
  }
}

class Pagina {
  constructor (elementoPorPagina, elementosNaPagina, totalElementos, totalPaginas, numeroPagina) {
    this.elementoPorPagina = elementoPorPagina
    this.elementosNaPagina = elementosNaPagina
    this.totalElementos = totalElementos
    this.totalPaginas = totalPaginas
    this.numeroPagina = numeroPagina
  }
}
