import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [addressQuery, setAddressQuery] = useState({
    postCode: "",
    results: [],
  });
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // post to backend user data
    const user = {
      name,
      email,
      location,
      password,
    };
    axios
      .post("http://localhost:5005/api/users", user)
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

  function checkAddress() {
    axios
      .get(
        `https://developers.onemap.sg/commonapi/search?searchVal=${addressQuery.postCode}&returnGeom=Y&getAddrDetails=Y`
      )
      .then((response) => {
        console.log(response.data.results);
        setAddressQuery({ ...addressQuery, results: response.data.results });
        setLocation(response.data.results[0]);
      })
      .catch((err) => console.error(err));
  }

  return (
    <>
      <h1>Sign Up</h1>
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
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="passowrd"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>
        <fieldset className="mb-3">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            className="form-control"
            name="postCode"
            id="postCode"
            placeholder="Post Code"
            value={addressQuery.postCode}
            onChange={(e) => setAddressQuery({ ...addressQuery, postCode: e.target.value })}
          />
          <button type="button" className="btn btn-secondary" onClick={checkAddress}>
            Check Address
          </button>
          <select
            onChange={(e) => {
              const selectedLocation = addressQuery.results.find((result) => result.SEARCHVAL === e.target.value);
              console.log(selectedLocation);
              setLocation(selectedLocation);
            }}
          >
            {addressQuery.results?.map((result, idx) => (
              <option key={result.SEARCHVAL}>{result.SEARCHVAL}</option>
            ))}
          </select>
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
