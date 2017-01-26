const consul = require('consul')({
  promisify: true
});

module.exports = {
  register: consul.agent.service.register,
  deregister: consul.agent.service.deregister
}
