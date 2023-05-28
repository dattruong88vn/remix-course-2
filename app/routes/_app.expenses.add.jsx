import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";

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
