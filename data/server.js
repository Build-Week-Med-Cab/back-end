const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

server.use(express.json())
server.use(cors())
server.use(helmet())
server.use(morgan('dev'))

// routes go here

server.use('/', (req, res) => {
  res.json({api: 'up and running'})
})

server.use('/', (error, req, res, next) => {
  if(process.env.DB_ENV !== 'testing'){
    console.log(error)
    res.status(500).json({error: 'Somthing is wrong', stack: error.stack})
  }
})


module.exports = server