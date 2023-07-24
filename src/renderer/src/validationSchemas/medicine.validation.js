const Joi = require('joi')

export const medicineSchema = Joi.object({
  brandName: Joi.string().required().min(3).max(80).messages({
    'string.empty': `Brand name is required`,
    'string.min': `Brand name have a minimum length of 3 character`,
    'string.max': `Brand name should have a maximum length of 80`,
  }),
  companyName: Joi.string().allow('').min(3).max(80).messages({
    'string.min': `Company name have a minimum length of 3 character`,
    'string.max': `Company name should have a maximum length of 80`,
  }),
  genericName: Joi.string().allow('').min(3).max(80).messages({
    'string.min': `Generic name have a minimum length of 3 character`,
    'string.max': `Generic name should have a maximum length of 80`,
  }),
  strength: Joi.string().allow('').min(1).max(80).messages({
    'string.min': `Strength have a minimum length of 1 character`,
    'string.max': `Strength should have a maximum length of 80`,
  }),
  type: Joi.string().allow('').min(3).max(80).messages({
    'string.min': `Type have a minimum length of 3 character`,
    'string.max': `Type should have a maximum length of 80`,
  }),
  alterName: Joi.string().allow('').min(3).max(80).messages({
    'string.min': `Alter name have a minimum length of 3 character`,
    'string.max': `Alter name should have a maximum length of 80`,
  }),
}).unknown()
