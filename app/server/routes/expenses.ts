import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

import { getUser } from "../kinde";
import { db } from "../db";
import {
  expenses as expensesTable,
  insertExpensesSchema,
} from "../db/schema/expenses";
import { and, desc, eq, sum } from "drizzle-orm";
import { createExpenseSchema } from "../sharedTypes";

export const expensesRoute = new Hono()
  .get("/", getUser, async (c) => {
    const user = c.var.user;
    const expenses = await db
      .select()
      .from(expensesTable)
      .where(eq(expensesTable.userId, user.id))
      .orderBy(desc(expensesTable.createdAt))
      .limit(100);

    return c.json({ expenses: expenses });
  })
  .post("/", getUser, zValidator("json", createExpenseSchema), async (c) => {
    console.log("你好");
    c.json({ message: "aaaa" });

    // const user = await c.var.user;
    // const expense = await c.req.valid("json");
    // console.log(">>>>", expense);
    // console.log(">>>>", user);

    // const validatedExpense = insertExpensesSchema.parse({
    //   ...expense,
    //   userId: user.id,
    // });

    // const result = await db
    //   .insert(expensesTable)
    //   .values(validatedExpense)
    //   .returning();
    // c.status(201);
    // return c.json(user);
  })
  .get("/get-spent", getUser, async (c) => {
    const user = c.var.user;

    const result = await db
      .select({ total: sum(expensesTable.amount) })
      .from(expensesTable)
      .where(eq(expensesTable.userId, user.id))
      .then((res) => res[0]);

    return c.json(result);
  })
  .get("/:id{[0-9]+}", getUser, async (c) => {
    const user = c.var.user;
    const id = Number.parseInt(c.req.param("id"));
    const expense = await db
      .select()
      .from(expensesTable)
      .where(and(eq(expensesTable.id, id), eq(expensesTable.userId, user.id)))
      .then((res) => res[0]);

    if (!expense) {
      return c.notFound();
    }
    return c.json({ expense: expense });
  })
  .delete("/:id{[0-9]+}", getUser, async (c) => {
    const user = c.var.user;
    const id = Number.parseInt(c.req.param("id"));
    const expense = await db
      .delete(expensesTable)
      .where(and(eq(expensesTable.id, id), eq(expensesTable.userId, user.id)))
      .returning()
      .then((res) => res[0]);

    if (!expense) {
      return c.notFound();
    }
    return c.json({ expense: expense });
  });
