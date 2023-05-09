// This component is used to sign in a user
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

// react component SignInForm that asks user for email and password to login to the app
export default function UserSignIn({ isLoggedIn, handleLogin }) {
  // state to store email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // navigate to the home page
  const navigate = useNavigate();
  // function to handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    // post to backend user data
    const user = {
      email,
      password,
    };
    axios
      .post("/auth/login", user)
      .then(function (response) {
        console.log(response);
        // grab the user id from the response
        const userId = response.data._id;
        localStorage.setItem("userLoggedIn", userId);
        handleLogin();
        // redirect to user page
        navigate(`/me`);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <>
      <div className="container">
        <div className="w-50 mt-3">
          <h2>Sign In</h2>
          <form
            method="POST"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <fieldset className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>
            <fieldset className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
            <button type="submit" className="btn btn-primary">
              Sign In
            </button>
          </form>
          <div className="d-flex justify-content-end align-items-center mt-3 p-3">
            <p className="m-1">Don't have an account?</p>
            <p className="m-2">
              <Modal />
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
