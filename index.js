const server = require('./data/server')

const port = process.env.PORT || 1337

server.listen(port, () => {
  console.log(`=== server running on port ${port}`)
})