import { redirect } from "@remix-run/node";
import AuthForm from "~/components/auth/AuthForm";
import { login, signup } from "~/data/auth.server";
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

  try {
    if (authMode === "login") {
      // login logic
      return await login(credentials);
    } else {
      // signup logic
      return await signup(credentials);
    }
  } catch (error) {
    // if (error.status === 422) {
    return { credentials: error.message };
    // }
  }
}
