const Joi = require('joi')

export const signupSchema = Joi.object({
  name: Joi.string().required().min(4).max(35).messages({
    // 'string.base': `"a" should be a type of 'text'`,
    'string.empty': `Name is required`,
    'string.min': `Name should have a minimum length of 4`,
    'string.max': `Name should have a maximum length of 35`,
    // 'any.required': `"a" is a required field`
  }),
  phoneNumber: Joi.string().required().min(3).max(14).messages({
    'string.empty': `Phone number is required`,
    'string.min': `Phone number should have a minimum length of 3`,
    'string.max': `Phone number should have a maximum length of 13`,
  }),
  email: Joi.string()
    .required()
    //.email()
    .min(10)
    .max(30)
    .email({ tlds: { allow: false } })
    .messages({
      'string.empty': `Email is required`,
      'string.email': `Email must be valid`,
      'string.min': `Email should have a minimum length of 10`,
      'string.max': `Email should have a maximum length of 30`,
    }),
  gender: Joi.string().required().min(4).max(6).messages({
    'string.empty': `Gender is required`,
  }),
  // organizationName: Joi.string()
  //             .required()
  //             .min(3)
  //             .max(30)
  //             .messages({
  //               'string.empty': `Organization is required`,
  //               'string.min': `Organization should have a minimum length of 3`,
  //               'string.max': `Organization should have a maximum length of 60`
  //             }),
  speciality: Joi.required(),
  // .min(3)
  // .max(60)
  // .messages({
  //   'string.empty': `Organization is required`,
  //   'string.min': `Organization should have a minimum length of 3`,
  //   'string.max': `Organization should have a maximum length of 60`
  // }),
  bmdc: Joi.string().required().min(3).max(60).messages({
    'string.empty': `BMDC is required`,
    'string.min': `BMDC should have a minimum length of 3`,
    'string.max': `BMDC should have a maximum length of 60`,
  }),
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
  // .messages({
  //   'string.peer': `BMDC should have a minimum length of 3`
  // })
  //.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
})
  .unknown()
  .with('password', 'repeat_password')
