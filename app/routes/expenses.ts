import { Hono } from "hono";
import { z } from "zod";

type Expenses = {
  id: number;
  title: string;
  amount: number;
};

// give me some expenses
const fakeExpenses: Expenses[] = [
  {
    id: 1,
    title: "rent",
    amount: 1000,
  },
  {
    id: 2,
    title: "food",
    amount: 500,
  },
  {
    id: 3,
    title: "groceries",
    amount: 300,
  },
];

const createExpenseSchema = z.object({
  title: z.string().min(3).max(100),
  amount: z.number().int().positive("*"),
});

export const expensesRoute = new Hono()
  .get("/", (c) => {
    return c.json({ expenses: fakeExpenses });
  })
  .post("/", async (c) => {
    const data = await c.req.json();
    const expense = createExpenseSchema.parse(data);
    console.log(expense.amount);
    console.log({ expense });
    return c.json(expense);
  });
