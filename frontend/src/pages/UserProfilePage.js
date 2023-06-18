import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AddSkillForm from "../components/AddSkillForm";
import EditUserForm from "../components/EditUserForm";

export default function UserProfilePage() {
  const [user, setUser] = useState({});
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [isAddingNewSkill, setIsAddingNewSkill] = useState(false);
  let { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          // clear cookies and local storage
          navigate("/signin");
        }
        return Promise.reject(error);
      }
    );
    axios.get(`/auth/checkUser`).then((response) => {
      setUser(response.data);
    });
  }, [isEditingUser, isAddingNewSkill]);

  // makes a axios delete request to delete this user based on id
  function deleteUser() {
    axios.delete(`/api/users/${user._id}`).then((response) => {
      navigate("/users");
    });
  }

  function goToSkill(id) {
    navigate(`/users/${user._id}/skills/${id}`);
  }
  function completeUserEdit() {
    setIsEditingUser(false);
  }

  function editSkill(id) {
    return () => navigate(`/users/${user._id}/skills/${id}/edit`);
  }
  function deleteSkill(id) {
    return () => {
      axios
        .delete(`/api/users/${user._id}/skills/${id}`)
        .then((response) => {
          navigate(`/me`);
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
              <div className="mt-3 d-flex justify-content-end">
                <button onClick={() => setIsEditingUser(true)} className="btn btn-warning">
                  Update
                </button>
                <button onClick={deleteUser} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </>
          )}
          {isEditingUser && <EditUserForm user={user} completeEdit={() => setIsEditingUser(false)} />}
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
                    {/* add buttons to edit or delete the skill */}
                    <div className="d-flex justify-content-around mb-2">
                      <button className="btn btn-warning btm-sm" onClick={editSkill(s._id)}>
                        Edit
                      </button>
                      <button className="btn btn-danger btm-sm" onClick={deleteSkill(s._id)}>
                        Delete
                      </button>
                    </div>
                    <div className="card-footer">
                      <small className="text-muted">Last updated 3 mins ago</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {isAddingNewSkill && <AddSkillForm user={user} handleComplete={() => setIsAddingNewSkill(false)} />}
          {!isAddingNewSkill && (
            <div className="mt-3 d-flex justify-content-end">
              {/* create button to display AddSkillForm on click */}
              <button className="btn btn-primary" onClick={() => setIsAddingNewSkill(true)}>
                Add New Skill
              </button>
            </div>
          )}
        </div>
        {/* display requests */}
        <div>
          {user.requests?.length > 0 && (
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {user.requests.map((r) => (
                <div className="col" key={r._id}>
                  <div
                    className="card h-100"
                    onClick={() => {
                      goToSkill(r._id);
                    }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">{r.title}</h5>
                      <p className="card-text">{r.description}</p>
                    </div>
                    {/* add buttons to edit or delete the skill */}
                    <div className="d-flex justify-content-around mb-2">
                      <button className="btn btn-warning btm-sm" onClick={editSkill(r._id)}>
                        Edit
                      </button>
                      <button className="btn btn-danger btm-sm" onClick={deleteSkill(r._id)}>
                        Delete
                      </button>
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
