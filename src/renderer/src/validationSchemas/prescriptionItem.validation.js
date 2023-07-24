const Joi = require('joi')

export const prescriptionItemSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': `Name is required`,
  }),
}).unknown()
