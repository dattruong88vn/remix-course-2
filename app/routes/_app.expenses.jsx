import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { FaDownload, FaPlus } from "react-icons/fa";

import ExpensesList from "~/components/expenses/ExpensesList";
import { getExpenses } from "~/data/expenses.server";

function ExpensesLayout() {
  const expenses = useLoaderData();

  return (
    <>
      <main>
        <Outlet />
        <section id="expenses-actions">
          <Link to="add">
            <FaPlus />
            <span>Add Expenses</span>
          </Link>
          <a href="/expenses/raw">
            <FaDownload />
            <span>Load Raw Data</span>
          </a>
        </section>
        <ExpensesList expenses={expenses} />
      </main>
    </>
  );
}

export default ExpensesLayout;

export async function loader() {
  return await getExpenses();
}
