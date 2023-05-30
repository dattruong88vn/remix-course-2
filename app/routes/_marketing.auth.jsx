import AuthForm from "~/components/auth/AuthForm";
import { validateCredentials } from "~/data/validation.server";
import authStyles from "~/styles/auth.css";

function AuthPage() {
  return (
    <main>
      <AuthForm />
    </main>
  );
}

export default AuthPage;

export function links() {
  return [{ rel: "stylesheet", href: authStyles }];
}

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get("mode") || "login";

  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  // validate user input
  try {
    validateCredentials(credentials);
  } catch (error) {
    return error;
  }

  if (authMode === "login") {
    // login logic
  } else {
    // signup logic
  }
}
