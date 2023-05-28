import { Outlet } from "@remix-run/react";

function ExpensesLayout() {
  return (
    <main>
      <p>Shared Layout</p>
      <Outlet />
    </main>
  );
}

export default ExpensesLayout;
