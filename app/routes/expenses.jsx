import { Outlet } from "@remix-run/react";

import expensesStyles from "~/styles/expenses.css";

function ExpensesLayout() {
  return (
    <main>
      <p>Shared Layout</p>
      <Outlet />
    </main>
  );
}

export default ExpensesLayout;

export function links() {
  return [{ rel: "stylesheet", href: expensesStyles }];
}
