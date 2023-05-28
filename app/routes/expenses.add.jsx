import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";

function AddExpensePage() {
  return (
    <Modal>
      <ExpenseForm />
    </Modal>
  );
}

export default AddExpensePage;
