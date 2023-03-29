import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EditUserForm({ user, completeEdit }) {
  const [userFormData, setUserFormData] = useState(user);
  const navigate = useNavigate();

  function handleFormChange(e) {
    setUserFormData({ ...userFormData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // post to backend user data
    axios
      .put(`http://localhost:5005/api/users/${user._id}`, userFormData)
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
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="name"
            className="form-control"
            name="name"
            id="name"
            placeholder="Name"
            value={userFormData.name}
            onChange={(e) => handleFormChange(e)}
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
            value={userFormData.email}
            onChange={(e) => handleFormChange(e)}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
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
            value={userFormData.location}
            onChange={(e) => handleFormChange(e)}
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
