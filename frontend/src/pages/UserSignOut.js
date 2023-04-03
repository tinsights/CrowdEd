import SignInForm from "../components/SignInForm";

export default function UserSignIn() {
  localStorage.removeItem("userLoggedIn");
  return <>{<SignInForm />}</>;
}
