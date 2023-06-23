import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Skills() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

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
    axios.get("/api/users").then((response) => {
      setUsers(response.data);
      console.log(response.data);
    });
  }, []); // The code inside the Effect does not use any props or state, so your dependency array is [] (empty). This tells React to only run this code when the component “mounts”, i.e. appears on the screen for the first time.

  function goToUser(userId) {
    navigate(`/users/${userId}`);
  }
  function goToSkill(userId, skillId) {
    navigate(`/users/${userId}/skills/${skillId}`);
  }

  return (
    <>
      <div className="container">
        <h2 className="my-3">All Skills</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {users?.map((u) =>
            u.skills?.map((s) => (
              <React.Fragment key={s._id}>
                <div className="col">
                  <div className="card h-100">
                    <div
                      className="card-body"
                      onClick={() => {
                        goToSkill(u._id, s._id);
                      }}
                    >
                      <h3 className="card-title">{s.title}</h3>
                      <div className="card-text">
                        <p>{s.description}</p>
                      </div>
                    </div>
                    <div className="card-footer">
                      <p
                        className="clickable"
                        onClick={() => {
                          goToUser(u._id);
                        }}
                      >
                        {u.username}
                      </p>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))
          )}
        </div>
      </div>
    </>
  );
}
