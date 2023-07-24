const Joi = require('joi')

export const signinSchema = Joi.object({
  username: Joi.string().required().messages({
    'string.empty': `Username is required`,
  }),

  password: Joi.string().required().messages({
    'string.empty': `Password is required`,
  }),
}).unknown()
