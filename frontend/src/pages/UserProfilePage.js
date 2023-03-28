import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import AddSkillForm from "../components/AddSkillForm";
import EditUserForm from "../components/EditUserForm";

export default function UserProfilePage() {
  const [showForm, setShowForm] = useState(false);
  const [user, setUser] = useState([]);
  let { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5005/api/users/${userId}`).then((response) => {
      setUser(response.data);
    });
  }, [userId, showForm]); // The code inside the Effect does not use any props or state, so your dependency array is [] (empty). This tells React to only run this code when the component “mounts”, i.e. appears on the screen for the first time.

  // makes a axios delete request to delete this user based on id
  function deleteUser() {
    axios.delete(`http://localhost:5005/api/users/${user._id}`).then((response) => {
      navigate("/users");
    });
  }

  function goToSkill(id) {
    navigate(`/skills/${id}`);
  }
  function completeEdit() {
    setShowForm(false);
  }

  return (
    <>
      <div className="container-sm py-3">
        <h2 className="h2 display-2">User Profile</h2>
        <div className="container-sm">
          {!showForm && (
            <>
              <ul className="list-group">
                <li className="list-group-item">name: {user.name}</li>
                <li className="list-group-item">email: {user.email}</li>
                <li className="list-group-item">location: {user.location}</li>
              </ul>
              <div className="mt-3">
                <button onClick={() => setShowForm(true)} className="btn btn-warning">
                  Update
                </button>
                <button onClick={deleteUser} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </>
          )}
          {showForm && <EditUserForm user={user} onSubmit={completeEdit} />}
        </div>
        <div className="container-sm mt-3">
          <h3>Skills</h3>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {user.skills?.map((s) => (
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
        </div>
        <div>
          <AddSkillForm />
        </div>
      </div>
    </>
  );
}
