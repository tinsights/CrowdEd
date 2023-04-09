import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EditUserForm({ user, completeEdit }) {
  console.log(user.location.POSTAL);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [addressQuery, setAddressQuery] = useState({
    postCode: user.location.POSTAL,
    results: [],
  });
  const [location, setLocation] = useState(user.location);

  function handleSubmit(e) {
    e.preventDefault();
    // post to backend user data
    axios
      .put(`http://localhost:5005/api/users/${user._id}`, { username, email, location, password })
      .then(function (response) {
        console.log(response);
        completeEdit();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <form
        method="POST"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <fieldset className="mb-3">
          <label htmlFor="username" className="form-label">
            Name
          </label>
          <input
            type="name"
            className="form-control"
            name="username"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        </fieldset>
        <fieldset className="mb-3">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            className="form-control"
            name="location"
            id="location"
            placeholder="Post Code"
            value={addressQuery.postCode}
            onChange={(e) => setAddressQuery({ ...addressQuery, postCode: e.target.value })}
          />
        </fieldset>
        <div className="d-flex  justify-content-end">
          <button
            className="btn btn-warning"
            onClick={() => {
              completeEdit();
            }}
          >
            Cancel
          </button>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
