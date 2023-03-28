import React, { useReducer, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function AddSkillForm({ location }) {
  const navigate = useNavigate();
  const { userId } = useParams();
  console.log(userId);

  const handleFormChange = (e) => {
    setSkill({ ...skill, [e.target.name]: e.target.value });
  };
  const [skill, setSkill] = useState({
    title: "",
    description: "",
    location: location,
  });
  function handleSubmit(e) {
    e.preventDefault();
    // post to backend user data
    axios
      .post(`http://localhost:5005/api/users/${userId}/skills`, skill)
      .then(function (response) {
        console.log(response);
        // grab the user id from the response
        const skillId = response.data.insertedId;
        // redirect to user page
        navigate(`/skills/${skillId}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <h3>Add New Skill</h3>
      <form
        method="POST"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <fieldset className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="name"
            className="form-control"
            name="title"
            id="title"
            placeholder="Title"
            value={skill.title}
            onChange={(e) => handleFormChange(e)}
          />
        </fieldset>
        <fieldset className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            name="description"
            id="description"
            placeholder="Skill Description"
            value={skill.description}
            onChange={(e) => handleFormChange(e)}
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
            value={skill.location}
            onChange={(e) => handleFormChange(e)}
            disabled
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
