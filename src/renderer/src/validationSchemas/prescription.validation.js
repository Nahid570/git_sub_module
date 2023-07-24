const Joi = require('joi')

export const prescriptionSchema = Joi.object({
  name: Joi.string().required().min(3).max(40).messages({
    'string.empty': `Name is required`,
    'string.min': `Name should have a minimum length of 4`,
    'string.max': `Name should have a maximum length of 35`,
  }),
  // phoneNumber: Joi.string()
  //             .required()
  //             .min(3)
  //             .max(14)
  //             .messages({
  //               'string.empty': `Phone number is required`,
  //               'string.min': `Phone number should have a minimum length of 3`,
  //               'string.max': `Phone number should have a maximum length of 13`
  //             }),
  // age: Joi.string()
  //             .allow('')
  //             .min(1)
  //             .max(120)
  //             .messages({
  //               'string.min': `Email should have a minimum length of 10`,
  //               'string.max': `Email should have a maximum length of 30`
  //             }),
  gender: Joi.string().required().messages({
    'string.empty': `Gender is required`,
  }),
}).unknown()
