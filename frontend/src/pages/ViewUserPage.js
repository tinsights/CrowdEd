import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AddSkillForm from "../components/AddSkillForm";
import EditUserForm from "../components/EditUserForm";

export default function UserProfilePage() {
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [user, setUser] = useState([]);
  let { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/users/${userId}`).then((response) => {
      setUser(response.data);
    });
  }, [userId, isEditingUser]); // The code inside the Effect des not use any props or state, so your dependency array is [] (empty). This tells React to only run this code when the component “mounts”, i.e. appears on the screen for the first time.

  // makes a axios delete request to delete this user based on id
  function deleteUser() {
    axios.delete(`/api/users/${user._id}`).then((response) => {
      navigate("/users");
    });
  }

  function goToSkill(id) {
    navigate(`/users/${userId}/skills/${id}`);
  }
  function completeUserEdit() {
    setIsEditingUser(false);
  }

  function editSkill(id) {
    return () => navigate(`/users/${userId}/skills/${id}/edit`);
  }
  function deleteSkill(id) {
    return () => {
      axios
        .delete(`/api/users/${userId}/skills/${id}`)
        .then((response) => {
          navigate(`/users/${userId}`);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  }

  return (
    <>
      <div className="container-sm py-3">
        <h2 className="h2 display-2">User Profile</h2>
        <div className="container-sm">
          {!isEditingUser && (
            <>
              <ul className="list-group">
                <li className="list-group-item">username: {user.username}</li>
                <li className="list-group-item">email: {user.email}</li>
                <li className="list-group-item">location: {user.location?.POSTAL}</li>
              </ul>
            </>
          )}
          {isEditingUser && <EditUserForm user={user} completeEdit={completeUserEdit} />}
        </div>
        <div className="container-sm mt-3">
          <h3>Skills</h3>
          {user.skills?.length > 0 && (
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {user.skills.map((s) => (
                <div className="col" key={s._id}>
                  <div
                    className="card h-100"
                    onClick={() => {
                      goToSkill(s._id);
                    }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">{s.title}</h5>
                      <p className="card-text">{s.description}</p>
                    </div>
                    <div className="card-footer">
                      <small className="text-muted">Last updated 3 mins ago</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
