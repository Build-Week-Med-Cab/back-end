const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../models/users-model');
const { valadateUserCreation } = require('../middleware/valdateUser');
const { userAlreadyExists, foundUser } = require('../middleware/users');


router.post('/register', valadateUserCreation, userAlreadyExists, async (req, res, next) => {
  try{
    const hash = bcrypt.hashSync(req.validUser.password, 12)
    req.validUser.password = hash
    console.log(req.validUser)
    const user = req.validUser
    const newUser = await Users.add(user)
    const token = genarateToken(newUser)
    res.status(201).json({message: `Welcome ${newUser.username}`, token})
  }catch(error){
    next(error)
  }
})

// "/login" endpoint
router.post('/login', foundUser, async (req, res, next) => {
  try {
    const validPassword =  bcrypt.compareSync(req.body.password, req.foundUser.password)
    if(!validPassword){
      res.status(401).json({messsage: 'invalid username or password'})
    }
    const token = genarateToken(req.foundUser)
    res.status(200).json({message: `Welcome ${req.foundUser.username}`, token})
  } catch (error) {
    next(error)
  }
})

// jwt setup
function genarateToken(user){
  const payload = {
    user_id: user.id,
    username: user.username
  }
  const secret = process.env.JWT_SECRET || 'yayeet'
  const options = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, secret, options)
}

module.exports = router