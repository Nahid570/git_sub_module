const Joi = require('joi');

export const verifyOtpSchema = Joi.object({
  otp: Joi.string()
          .required()
          .messages({
            'string.empty': `OTP is required`
          })
}).unknown();