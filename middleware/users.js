const db = require('../data/db-config');

const userAlreadyExists = async (req, res, next) => {
  try {
    const foundUser = await db('users').where({username: req.validUser.username}).first();
    if(foundUser){
      return res.status(401).json({message: 'user already exists'})
    }
    next();
  } catch (error) {
    next(error)
  }
}

const foundUser = async (req, res, next) => {
  try {
    const foundUser = await db('users').where({username: req.body.username}).first();
    if(!foundUser){
      res.status(404).json({message: 'User does not exist'})
    }
    req.foundUser = foundUser;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  foundUser,
  userAlreadyExists
}