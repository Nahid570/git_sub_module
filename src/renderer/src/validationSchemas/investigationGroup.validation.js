const Joi = require('joi')

export const investigationGroupSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': `Group name is required`,
  }),
  // chiefComplainIds: Joi.array()
  //           .required()
  //           .messages({
  //             'string.empty': `This field is required`,
  //           })
}).unknown()
