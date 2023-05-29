import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { addExpense } from "~/data/expenses.server";

function AddExpensePage() {
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

export default AddExpensePage;

export async function action({ request }) {
  const formData = await request.formData();
  const expenseData = Object.fromEntries(formData);

  await addExpense(expenseData);

  return redirect("/expenses");
}
