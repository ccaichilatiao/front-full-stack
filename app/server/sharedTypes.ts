import { insertExpensesSchema } from "./db/schema/expenses";
// request schema
export const createExpenseSchema = insertExpensesSchema.omit({
  id: true,
  createdAt: true,
});
