const Joi = require('joi')

export const diagnosisSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': `Name is required`,
  }),
}).unknown()
