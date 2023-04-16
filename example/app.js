const express = require('express');
const Exdogen = require('../src/index');
const apiRouter = require('./api');

async function main() {
  const app = express()

  const apiPath = '/'
  const document = await Exdogen(apiPath, apiRouter)
  app.use(apiPath, apiRouter)
  app.get('/docs', (req, res) => res.send(document.html))
  app.get('/docs/index.html', (req, res) => res.send(document.html))
  app.get('/docs/postman.json', (req, res) => res.send(document.postman))
  app.use('/', express.static('public'))

  app.listen(3000, () => console.log('Example app listening on http://localhost:3000'))
}

main()
