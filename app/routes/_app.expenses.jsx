import { Outlet } from "@remix-run/react";

import ExpensesList from "~/components/expenses/ExpensesList";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    title: "First Expense",
    amount: 12.99,
    date: new Date().valueOf(),
  },
  {
    id: "e2",
    title: "Second Expense",
    amount: 16.99,
    date: new Date().valueOf(),
  },
];

function ExpensesLayout() {
  return (
    <>
      <main>
        <Outlet />
        <ExpensesList expenses={DUMMY_EXPENSES} />
      </main>
    </>
  );
}

export default ExpensesLayout;
