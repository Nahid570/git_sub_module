const Joi = require('joi')

export const adviceGroupSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': `Group name is required`,
  }),
}).unknown()
