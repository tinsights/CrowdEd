import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const [skills, setSkills] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5005/api/skills").then((response) => {
      console.log(response.data);
      setSkills(response.data);
    });
  }, []); // The code inside the Effect does not use any props or state, so your dependency array is [] (empty). This tells React to only run this code when the component “mounts”, i.e. appears on the screen for the first time.

  const navigate = useNavigate();

  function goToUser(id) {
    navigate(`/user/${id}`);
  }
  function goToSkill(id) {
    navigate(`/skill/${id}`);
  }

  return (
    <>
      <h2>All Skills</h2>
      <div className="row g-5">
        {skills.map((s) => (
          <React.Fragment key={s._id}>
            <div className="col-6 col-sm-4 col-lg-3 mb-3">
              <div
                className="card"
                onClick={() => {
                  goToSkill(s._id);
                }}
              >
                <div className="card-body">
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
                  <div class="card-footer">
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
            </div>
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
