const removeUltimoEComercialOuInterrogacao = (url) => {
  const rgxECom = /&$/
  const rgxInte = /\?$/
  return url.replace(rgxECom, '').replace(rgxInte, '')
}

const url1 = 'http://localhost:8082/rest/cinemas?quantidade=1&porPagina=10&'
const url2 = 'http://localhost:8082/rest/cinemas?&'

console.log(url1)
console.log(url2)

const newUrl1 = removeUltimoEComercialOuInterrogacao(url1)
const newUrl2 = removeUltimoEComercialOuInterrogacao(url2)

console.log(newUrl1)
console.log(newUrl2)
