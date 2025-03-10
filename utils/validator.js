import Joi from 'joi';

export const Validator = {
  user: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(30).required(),
    role: Joi.string().valid('admin', 'editor', 'user')
  }),

  product: Joi.object({
    sku: Joi.string().alphanum().length(10).required(),
    name: Joi.string().min(3).max(100).required(),
    price: Joi.number().positive().precision(2).required()
  }),

  payment: Joi.object({
    amount: Joi.number().positive().precision(2).required(),
    currency: Joi.string().valid('RUB', 'USD', 'EUR')
  })
};