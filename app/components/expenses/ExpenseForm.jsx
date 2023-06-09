import {
  Form,
  Link,
  useActionData,
  useMatches,
  // useLoaderData,
  // useSubmit
  useNavigation,
  useParams,
} from "@remix-run/react";

function ExpenseForm() {
  const navigation = useNavigation();
  const validationErrors = useActionData();
  // const expenseData = useLoaderData();

  // all route matches
  const matches = useMatches();
  const params = useParams();
  const expenses = matches.find(
    (match) => match.id === "routes/_app.expenses"
  ).data;
  const expenseData = expenses.find((expense) => expense.id === params.id);

  if (params.id && !expenseData) {
    // throw new Response();
    return <p>Invalid expense id.</p>;
  }

  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10
  const defaultValue = expenseData
    ? {
        title: expenseData.title,
        amount: expenseData.amount,
        date: expenseData.date ? expenseData.date.slice(0, 10) : "",
      }
    : { title: "", amount: "", date: "" };
  const isSubmiting = navigation.state !== "idle";

  // function submitHandler(event) {
  //   // validate on client

  //   const submit = useSubmit();
  //   submit(event.target, {
  //     method: "POST",
  //   });
  // }

  return (
    <Form
      method="post"
      className="form"
      id="expense-form"
      // onClick={submitHandler}
    >
      <p>
        <label htmlFor="title">Expense Title</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          maxLength={30}
          defaultValue={defaultValue.title}
        />
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0"
            step="0.01"
            required
            defaultValue={defaultValue.amount}
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            max={today}
            required
            defaultValue={defaultValue.date}
          />
        </p>
      </div>

      {validationErrors && (
        <ul>
          {Object.values(validationErrors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <div className="form-actions">
        <button disabled={isSubmiting}>
          {isSubmiting ? "Saving..." : "Save Expense"}
        </button>
        <Link to="/expenses">Cancel</Link>
      </div>
    </Form>
  );
}

export default ExpenseForm;
