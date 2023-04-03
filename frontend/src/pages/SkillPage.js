import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function SkillPage() {
  const [skill, setSkill] = useState({});
  const { skillId } = useParams();
  useEffect(() => {
    axios.get(`http://localhost:5005/api/skills/${skillId}`).then((response) => {
      console.log(response.data);
      setSkill(response.data);
    });
  }, [skillId]);

  const navigate = useNavigate();

  function goToUser(id) {
    return () => navigate(`/users/${id}`);
  }

  return (
    <>
      {/* display skills and user information using bootstrap row and cols */}
      <div className="row mt-3">
        <div className="col col-lg-8 shadow p-3 mb-5 bg-body rounded">
          <h3>{skill.title}</h3>
          <p>{skill.description}</p>
        </div>
        <div className="col shadow p-3 mb-5 bg-body rounded" onClick={goToUser(skill.user?.userId)}>
          <h3>{skill.user?.name}</h3>
        </div>
      </div>
    </>
  );
}
