import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function UserProfilePage() {
  const [user, setUser] = useState([]);
  let { userId } = useParams();
  useEffect(() => {
    axios.get(`http://localhost:5005/api/users/${userId}`).then((response) => {
      setUser(response.data);
    });
  }, [userId]); // The code inside the Effect does not use any props or state, so your dependency array is [] (empty). This tells React to only run this code when the component “mounts”, i.e. appears on the screen for the first time.

  const navigate = useNavigate();

  function goToSkill(id) {
    navigate(`/skill/${id}`);
  }

  return (
    <>
      <div className="container-sm py-3">
        <h2 className="h2 display-2">User Profile</h2>
        <div className="container-sm">
          <ul className="list-group">
            <li className="list-group-item">id: {user._id}</li>
            <li className="list-group-item">name: {user.name}</li>
            <li className="list-group-item">email: {user.email}</li>
            <li className="list-group-item">location: {user.location}</li>
          </ul>
          <div className="mt-3">
            <button className="btn btn-warning">Update</button>
            <button className="btn btn-danger">Delete</button>
            <div className="container-sm mt-3"></div>
            <div>
              <h3>Add new Skill</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
