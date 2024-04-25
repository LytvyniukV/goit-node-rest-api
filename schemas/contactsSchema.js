import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().required().min(3),
  email: Joi.string().email().required(),
  phone: Joi.number().required().min(12),
});

export const updateContactSchema = Joi.object({});
