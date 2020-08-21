module.exports = {
  jsonParseSaved
}
function jsonParseSaved(recs){
    return recs.map(rec => {
      rec.effects = JSON.parse(rec.effects)
      rec.helps = JSON.parse(rec.helps)
      return rec
    })
  }