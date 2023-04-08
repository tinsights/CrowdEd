import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function AddSkillForm({ handleComplete }) {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [skill, setSkill] = useState({
    title: "",
    description: "",
    category: "",
    experience: "",
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("/api/categories").then((response) => {
      setCategories(response.data);
    });
  }, []);

  const handleFormChange = (e) => {
    setSkill({ ...skill, [e.target.name]: e.target.value });
  };
  function handleSubmit(e) {
    e.preventDefault();
    // post to backend user data
    axios
      .post(`/api/users/${userId}/skills`, skill)
      .then(function (response) {
        console.log(response);
        // grab the user id from the response
        const skillId = response.data.insertedId;
        handleComplete();
        // redirect to user page
        navigate(`/users/${userId}/skills/${skillId}`);
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
            type="text"
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
          <label htmlFor="experience" className="form-label">
            Experience
          </label>
          <input
            type="text"
            className="form-control"
            name="experience"
            id="experience"
            placeholder="Experience"
            value={skill.experience}
            onChange={(e) => handleFormChange(e)}
          />
        </fieldset>
        <fieldset className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            className="form-select"
            name="category"
            id="category"
            value={skill.category}
            onChange={(e) => handleFormChange(e)}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </fieldset>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-warning"
            onClick={() => {
              handleComplete();
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
