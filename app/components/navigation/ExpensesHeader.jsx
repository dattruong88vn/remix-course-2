import { Form, NavLink } from "@remix-run/react";

import Logo from "../util/Logo";

function ExpensesHeader() {
  return (
    <header id="main-header">
      <Logo />
      <nav id="main-nav">
        <ul>
          <li>
            <NavLink to="/expenses" end>
              Manage Expenses
            </NavLink>
          </li>
          <li>
            <NavLink to="/expenses/analysis">Analyze Expenses</NavLink>
          </li>
        </ul>
      </nav>
      <Form method="post" id="logout-form" action="/logout">
        <button className="cta-alt">Logout</button>
      </Form>
    </header>
  );
}

export default ExpensesHeader;
