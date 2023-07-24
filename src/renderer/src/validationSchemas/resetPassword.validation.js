const Joi = require('joi')

export const resetPasswordSchema = Joi.object({
  password: Joi.string()
    .required()
    .min(8)
    .max(20)
    //.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .messages({
      'string.empty': `Password is required`,
      'string.min': `Password should have a minimum length of 8`,
      'string.max': `Password should have a maximum length of 20`,
    }),
  repeat_password: Joi.ref('password'),
})
  .unknown()
  .with('password', 'repeat_password')
