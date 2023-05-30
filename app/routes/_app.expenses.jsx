import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { FaDownload, FaPlus } from "react-icons/fa";

import ExpensesList from "~/components/expenses/ExpensesList";
import { requireUserSession } from "~/data/auth.server";
import { getExpenses } from "~/data/expenses.server";

function ExpensesLayout() {
  const expenses = useLoaderData();

  const hasExpenses = expenses && expenses.length > 0;

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
        {hasExpenses ? (
          <ExpensesList expenses={expenses} />
        ) : (
          <section id="no-expenses">
            <h1>No expenses found</h1>
            <p>
              Start <Link to="add">adding some</Link> today.
            </p>
          </section>
        )}
      </main>
    </>
  );
}

export default ExpensesLayout;

export async function loader({ request }) {
  await requireUserSession(request);

  const expenses = await getExpenses();
  return expenses;
}
