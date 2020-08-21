const { required } = require("@hapi/joi")

const Users = require("../models/saved-model")

module.exports = {
  jsonParseSaved,
  userOwnsRec
}
function jsonParseSaved(recs){
    return recs.map( rec => {
      rec.effects =  JSON.parse(rec.effects)
      rec.helps =  JSON.parse(rec.helps)
      return rec
    })
  }

  async function userOwnsRec(req, res, next){
    const {id} = req.params
    const rec = await Users.findOneBy({id: id})
    try {
      if(rec && req.token.user_id === rec.user_id){
      next()
    }else if(!rec){
      res.status(404).json({message: "does not exist"})
    }else{
      res.status(401).json({message: "you do not own this!!!"})
    }
    } catch (error) {
      next(error)
    }
    
  }