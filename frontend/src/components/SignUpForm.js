import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e, stateData) {
    console.log(stateData);
    e.preventDefault();
    // post to backend user data
    axios
      .post("http://localhost:5005/api/users", stateData)
      .then(function (response) {
        console.log(response);
        // grab the user id from the response
        const userId = response.data.insertedId;
        // redirect to user page
        navigate(`/users/${userId}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <h1>Sign Up</h1>
      <form
        method="POST"
        onSubmit={(e) => {
          handleSubmit(e, { name, email, location });
        }}
      >
        <fieldset className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="name"
            className="form-control"
            name="name"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </fieldset>
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
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </fieldset>
        <fieldset className="mb-3">
          <label htmlFor="location" className="form-label">
            Post Code
          </label>
          <input
            className="form-control"
            name="location"
            id="location"
            placeholder="Post Code"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </fieldset>
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
