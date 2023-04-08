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
    navigate(`/users/${userId}skills/${skillId}`);
  }

  return (
    <>
      <h2>All Users</h2>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {users?.map((u) => (
            <React.Fragment key={u._id}>
              <div className="col">
                <div className="card h-100">
                  <div className="card-body">
                    <h3
                      className="card-title"
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
