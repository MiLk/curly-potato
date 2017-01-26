const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log('Example app listening on port %d !', port)
  const consul = require('./consul')
  consul.register('curly-potato', port)
    .then(() => { console.log('Service registered into consul.') })
    .catch(console.error)
})

