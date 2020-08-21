const router = require('express').Router();
const User = require('../models/saved-model');
const { jsonParseSaved, userOwnsRec } = require('../middleware/savedWare');
const users = require('../middleware/users');

// Need to fix request for live server.
router.get('/', async (req, res, next) => {
  let fixedRecs = []
  try {
    const recs = await User.findAllBy({user_id: req.token.user_id})
    console.log(recs)
    if(process.env.DB_ENV === 'development'){
      fixedRecs = recs.map( rec => {
      return {...rec, effects: JSON.parse(rec.effects), helps: JSON.parse(rec.helps)}
    })
    }
    
    if(recs.length === 0){
      res.status(200).json({message: "no data saved"})
    }
    if(process.env.DB_ENV === 'development'){
      res.status(200).json(fixedRecs)
    }else{
      res.status(200).json(recs)
    }
    
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    req.body.user_id = req.token.user_id
    const rec = req.body
    const added = await User.add(rec)
    res.status(201).json({...added, effects: rec.effects, helps: rec.helps})
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', userOwnsRec, async (req, res, next) => {
  const {id} = req.params
  try {
    const removed = await User.removeById(id)
    if(removed === 1){
      res.json({message: "remove success"})
    }else{
      res.json({message: "item not found"})
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router