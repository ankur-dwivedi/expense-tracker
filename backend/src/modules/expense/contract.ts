import Joi from "joi";
import { CATEGORY, STATUS } from "../../models/expense/constants";

export const createExpenseContract = Joi.object({
  amount: Joi.number().required(),
  category: Joi.string()
    .valid(CATEGORY.FOOD, CATEGORY.TRAVEL, CATEGORY.BILLS, CATEGORY.SHOPPING)
    .required(),
  description: Joi.string().required(),
  date: Joi.date().required(),
});

export const getExpenseContract = Joi.object({
  category: Joi.string().valid(
    CATEGORY.FOOD,
    CATEGORY.TRAVEL,
    CATEGORY.BILLS,
    CATEGORY.SHOPPING
  ),
  date: Joi.date(),
  status: Joi.string().valid(
    STATUS.APPROVED,
    STATUS.PENDING,
    STATUS.REJECTED
  ),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).default(10)
});

export const updateExpenseContract = Joi.object({
  status: Joi.string().required(),
  expenseId: Joi.string().required(),
});
