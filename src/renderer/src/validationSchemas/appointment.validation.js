const Joi = require('joi');

export const appointmentSchema = Joi.object({
  name: Joi.string().required().min(3).max(35).messages({
    'string.empty': `Name is required`,
    'string.min': `Name should have a minimum length of 4`,
    'string.max': `Name should have a maximum length of 35`,
  }),
  dob: Joi.required().messages({
    'string.empty': `Age is required`,
  }),
  // phoneNumber: Joi.string()
  //   .required()
  //   .min(3)
  //   .max(14)
  //   .messages({
  //     'string.empty': `Phone number is required`,
  //     'string.min': `Phone number should have a minimum length of 3`,
  //     'string.max': `Phone number should have a maximum length of 13`
  //   }),
  gender: Joi.string().required().messages({
    'string.empty': `Gender is required`,
  }),
  appointmentDateTime: Joi.string().required().messages({
    'string.empty': `Appointment date time is required`,
  }),
  serialNumber: Joi.number().allow('').integer().min(1).max(500).messages({
    'number.min': `Serial number should have a minimum 1`,
    'number.max': `Serial number should have a maximum 500`,
  }),
  visitationFee: Joi.number().allow('').integer().min(1).max(100000).messages({
    'number.min': `visitation fee should have a minimum 1`,
    'number.max': `visitation fee should have a maximum 100000`,
  }),
}).unknown();
