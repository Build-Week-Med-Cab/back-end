const jwt = require('jsonwebtoken');

const requireToken = async (req, res, next) => {
  const {authorization} = req.headers;
  const secret = process.env.JWT_SECRET;

  if(!authorization){
    res.status(401).json({message: "no token provided"})
  }

  jwt.verify(authorization, secret, (err, validToken) => {
    if(err){
      res.status(401).json({message: 'invalid token'})
    }
    req.token = validToken;
    next();
  })
};


module.exports = {requireToken}