const express = require('express')
const compression = require('compression')
const bodyparser = require('body-parser')
const { tratarErro } = require('./src/classes/tratativas')
require('dotenv').config()

const app = express()

app.use(compression())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
const port = process.env.PORT || 8000

const rotaFilme = require('./src/routes/filme-route')
const rotaCinema = require('./src/routes/cinema-route')
// const rotaSala = require('./src/routes/sala-route')
app.use('/rest/filmes', rotaFilme)
app.use('/rest/cinemas', rotaCinema)
// app.use('/rest/cinema/:idCinema/sala', rotaSala)
app.use((req, res, next) => {
  const err = new Error('Recurso não encontrado ou não disponível')
  const t = tratarErro('Recurso não encontrado ou não disponível', req.path, process.env.HOST + req.path, 404, 'NOT_FOUND')
  err.body = t
  err.status = 404
  next(err)
})
app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(err.status).json(err.body)
  } else {
    const t = tratarErro('Ocorreu um erro ao processar a requisição', req.path, process.env.HOST + req.path, 500, 'INTERNAL_SERVER_ERROR')
    res.status(500).json(t)
  }
})

app.listen(port, () => {
  console.log('Server iniciou na porta', port)
})
