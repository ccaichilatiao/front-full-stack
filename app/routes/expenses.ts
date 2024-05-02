import { Hono } from "hono";

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

export const expensesRoute = new Hono()
  .get("/", (c) => {
    return c.json({ expenses: fakeExpenses });
  })
  .post("/", async (c) => {
    const expense = await c.req.json();
    console.log({ expense });
    return c.json(expense);
  });
