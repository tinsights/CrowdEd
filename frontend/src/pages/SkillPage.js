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
  function goToSkill(id) {
    navigate(`/skills/${id}`);
  }

  return (
    <>
      <h2>{skill.title}</h2>
      <p>{skill.description}</p>
    </>
  );
}
