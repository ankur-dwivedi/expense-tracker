import Joi from "joi";

export const authContract = Joi.object({
  email: Joi.string(),
  password: Joi.string(),
});

export const createUserContract = Joi.object({
  email: Joi.string(),
  name: Joi.string(),
  role: Joi.string(),
  password: Joi.string(),
});
