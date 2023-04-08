import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

export default function UserSignOut({ handleLogout }) {
  //navigate to home page
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("/auth/logout").then((response) => {
      localStorage.removeItem("userLoggedIn");
      localStorage.clear();
      handleLogout();
      navigate("/");
    });
  }, []);
  return;
}
