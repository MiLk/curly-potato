const consul = require('./consul')
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const port = process.env.PORT || 3000
const name = 'curly-potato'
const id = name + '-' + port

app.listen(port, () => {
  console.log('Example app listening on port %d!', port)
  consul.register({
    id, name, port: parseInt(port)
  }).then(() => { console.log('Service registered into consul.') })
    .catch(console.error)
})

process.on('beforeExit', () => {
  console.log('Deregister service from consul.')
  consul.deregister({ id })
    .then(() => { console.log('Service deregistered from consul.') })
    .catch(console.error)
})
