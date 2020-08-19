const Joi = require('@hapi/joi');

const userCreationSchema = Joi.object({
  username: Joi.string().required().trim(true),
  password: Joi.string().min(8).required().trim(true)
})

const valadateUserCreation = async (req, res, next) => {
  try {
    const result = await userCreationSchema.validateAsync(req.body);
    req.validUser = result
    next();
  } catch (error) {
    return res.status(400).json({ error: error.details[0].message })
  }
}

module.exports = {valadateUserCreation}