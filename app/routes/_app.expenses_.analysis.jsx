import { json } from "@remix-run/node";
import { useLoaderData, useRouteError } from "@remix-run/react";

import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import Chart from "~/components/expenses/Chart";
import { getExpenses } from "~/data/expenses.server";
import Error from "~/components/util/Error";
import { requireUserSession } from "~/data/auth.server";

function ExpensesAnalysisPage() {
  const expenses = useLoaderData();

  return (
    <main>
      <Chart expenses={expenses} />
      <ExpenseStatistics expenses={expenses} />
    </main>
  );
}

export default ExpensesAnalysisPage;

export async function loader() {
  await requireUserSession(request);

  const expenses = await getExpenses();

  if (!expenses || expenses.length == 0) {
    throw json(
      { message: "Could not find expenses for analytics" },
      { status: 404, statusText: "Expenses not found" }
    );
  }

  return expenses;
}

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <main>
      <Error title={error.statusText}>
        <p>
          {error.data?.message ||
            "Something went wrong. Please try again later."}
        </p>
      </Error>
    </main>
  );
}
