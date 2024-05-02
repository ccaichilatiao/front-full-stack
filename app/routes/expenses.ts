import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

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
  .post("/", zValidator("json", createExpenseSchema), async (c) => {
    const expense = await c.req.valid("json");
    fakeExpenses.push({ ...expense, id: fakeExpenses.length + 1 });
    return c.json(expense);
  })
  .get("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = fakeExpenses.find((expense) => expense.id === id);
    if (!expense) {
      return c.notFound();
    }
    return c.json({ expense });
  });
