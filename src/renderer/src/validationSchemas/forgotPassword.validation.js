const Joi = require('joi')

export const forgotPasswordSchema = Joi.object({
  username: Joi.string().required().min(3).max(40).messages({
    'string.empty': `This field is required`,
    'string.min': `Should have a minimum length of 3`,
    'string.max': `Should have a maximum length of 13`,
  }),
}).unknown()
