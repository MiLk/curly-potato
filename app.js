const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log('Example app listening on port %d !', port)
  const consul = require('./consul')
  const name = 'curly-potato'
  const id = name + '-' + process.pid + '-' + port
  consul.register({
    id, name, port: parseInt(port)
  })
    .then(() => { console.log('Service registered into consul.') })
    .catch(console.error)

  process.on('beforeExit', () => {
    consul.deregister({ id })
  })
})

