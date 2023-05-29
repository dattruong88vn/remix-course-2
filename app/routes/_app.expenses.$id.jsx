import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
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
