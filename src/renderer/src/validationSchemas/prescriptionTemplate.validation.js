const Joi = require('joi')

export const PrescriptionTemplateSchema = Joi.object({
  name: Joi.string().required().min(3).max(60).messages({
    'string.empty': `Name is required`,
    'string.min': `Name have a minimum length of 3 character`,
    'string.max': `Name should have a maximum length of 80`,
  }),
}).unknown()
