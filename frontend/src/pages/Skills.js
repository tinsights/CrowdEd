import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  useEffect(() => {
    axios.get("/api/skills").then((response) => {
      console.log(response.data);
      setSkills(response.data);
    });
  }, []); // The code inside the Effect does not use any props or state, so your dependency array is [] (empty). This tells React to only run this code when the component “mounts”, i.e. appears on the screen for the first time.

  const navigate = useNavigate();

  function goToUser(id) {
    navigate(`/users/${id}`);
  }
  function goToSkill(id) {
    navigate(`/skills/${id}`);
  }

  return (
    <>
      <h2>All Skills</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {skills.map((s) => (
          <React.Fragment key={s._id}>
            <div className="col">
              <div className="card h-100">
                <div
                  className="card-body"
                  onClick={() => {
                    goToSkill(s._id);
                  }}
                >
                  <h3
                    className="card-title"
                    onClick={() => {
                      goToSkill(s._id);
                    }}
                  >
                    {s.title}
                  </h3>
                  <div className="card-text">
                    <p>{s.description}</p>
                  </div>
                </div>
                <div className="card-footer">
                  <p
                    onClick={() => {
                      goToUser(s.userID);
                    }}
                  >
                    {s.teacherName}
                  </p>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
