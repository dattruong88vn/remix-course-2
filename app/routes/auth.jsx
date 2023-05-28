import authStyles from "~/styles/auth.css";

function AuthPage() {
  return (
    <main>
      <h1>Auth Page</h1>
    </main>
  );
}

export default AuthPage;

export function links() {
  return [{ rel: "stylesheet", href: authStyles }];
}
