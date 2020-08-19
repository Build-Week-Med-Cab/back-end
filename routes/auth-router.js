const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../models/users-model');
const { valadateUserCreation } = require('../middleware/valdateUser');


router.post('/register', valadateUserCreation, (req, res, next) => {
  try{
    //need to hash password
    const newUser = await Users.add(req.validUser)
    // gen token so frontend and do login from register if wanted.
    res.status(201).json({message: `Welcome ${newUser.username}`})
  }catch(error){
    next(error)
  }
})

// "/login" endpoint

module.exports = router