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
    navigate(`/users/${id}`);
  }

  return (
    <>
      {/* display skills and user information using bootstrap row and cols */}
      <div className="row">
        <div className="col-6">
          <h3>{skill.title}</h3>
          <p>{skill.description}</p>
        </div>
        <div className="col-6">
          <h3>{skill.user?.name}</h3>
          <p>{skill.user?.email}</p>
        </div>
      </div>
    </>
  );
}
