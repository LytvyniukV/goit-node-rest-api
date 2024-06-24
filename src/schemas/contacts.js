import Joi from "joi";
import objectId from "joi-objectid";

Joi.objectId = objectId(Joi);

export const createContactSchema = Joi.object({
  name: Joi.string().required().min(3),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.number().required().min(12),
  favorite: Joi.boolean(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.number().min(12),
}).min(1);

export const updateFavoriteContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

export const contactIdSchema = Joi.object({
  id: Joi.objectId().required(),
});
