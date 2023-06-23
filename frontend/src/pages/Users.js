import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get("/api/users").then((response) => {
      setUsers(response.data);
      console.log(users);
    });
  }, []);
  const navigate = useNavigate();
  function goToUser(userId) {
    navigate(`/users/${userId}`);
  }
  function goToSkill(userId, skillId) {
    navigate(`/users/${userId}/skills/${skillId}`);
  }

  return (
    <>
      <div className="container">
        <h2 className="my-3">All Users</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {users?.map((u) => (
            <React.Fragment key={u._id}>
              <div className="col">
                <div className="card h-100">
                  <div className="card-body">
                    <h3
                      className="card-title clickable"
                      onClick={() => {
                        goToUser(u._id);
                      }}
                    >
                      {u.username}
                    </h3>
                    <div className="card-text">
                      <p>Skills:</p>
                      <ol>
                        {u.skills?.map((s) => (
                          <React.Fragment key={s._id}>
                            <li
                              className="clickable"
                              onClick={() => {
                                goToSkill(u._id, s._id);
                              }}
                            >
                              {s.title}
                            </li>
                          </React.Fragment>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
}
