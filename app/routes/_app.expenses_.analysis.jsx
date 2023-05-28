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

import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import Chart from "~/components/expenses/Chart";

function ExpensesAnalysisPage() {
  return (
    <main>
      <Chart expenses={DUMMY_EXPENSES} />
      <ExpenseStatistics expenses={DUMMY_EXPENSES} />
    </main>
  );
}

export default ExpensesAnalysisPage;
