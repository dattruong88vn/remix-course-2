import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { deleteExpense, updateExpense } from "~/data/expenses.server";
// import { getExpenseById } from "~/data/expenses.server";

function UndateExpensePage() {
  const navigate = useNavigate();

  function closeHanlder() {
    navigate("/expenses");
  }

  return (
    <Modal onClose={closeHanlder}>
      <ExpenseForm />
    </Modal>
  );
}

export default UndateExpensePage;

// export async function loader({ params }) {
//   const expenseId = params.id;
//   const expense = await getExpenseById(expenseId);
//   return expense;
// }

export async function action({ params, request }) {
  const expenseId = params.id;

  if (request.method === "POST") {
    const formData = await request.formData();
    const expenseData = Object.fromEntries(formData);

    try {
      validateExpenseInput(expenseData);
    } catch (error) {
      return error;
    }

    await updateExpense(expenseId, expenseData);
    return redirect("/expenses");
  } else if (request.method === "DELETE") {
    await deleteExpense(expenseId);
    return redirect("/expenses");
  }
}
