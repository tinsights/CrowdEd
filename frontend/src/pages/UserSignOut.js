import UserSignIn from "../pages/UserSignIn";

export default function UserSignOut({ handleLogout }) {
  localStorage.removeItem("userLoggedIn");
  handleLogout();
  return <UserSignIn />;
}
