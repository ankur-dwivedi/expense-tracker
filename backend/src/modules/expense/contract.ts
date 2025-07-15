import Joi from 'joi';
import { CATEGORY } from '../../models/expense/constants';

export const createExpenseContract = Joi.object({
  amount: Joi.number().required(),
  category: Joi.string().valid(CATEGORY.FOOD,CATEGORY.TRAVEL,CATEGORY.BILLS,CATEGORY.SHOPPING).required(),
  description: Joi.string().required(),
  date: Joi.date().required(),
});

export const getExpenseContract = Joi.object({
  category: Joi.string().valid(CATEGORY.FOOD,CATEGORY.TRAVEL,CATEGORY.BILLS,CATEGORY.SHOPPING),
  date: Joi.date(),
});

export const updateExpenseContract = Joi.object({
  status: Joi.string().required(),
  expenseId: Joi.string().required(),
});
