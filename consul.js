const consul = require('consul')({
  promisify: true
});

function register(name, port) {
  return consul.agent.service.register({
    name: name,
    port: parseInt(port)
  })
}

module.exports = { register }
