import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get("/api/users").then((response) => {
      setUsers(response.data);
    });
  }, []); // The code inside the Effect does not use any props or state, so your dependency array is [] (empty). This tells React to only run this code when the component “mounts”, i.e. appears on the screen for the first time.

  const navigate = useNavigate();

  function goToUser(id) {
    navigate(`/users/${id}`);
  }
  function goToSkill(id) {
    navigate(`/skills/${id}`);
  }

  return (
    <>
      <h2>All Users</h2>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {users.map((u) => (
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
                      {u.name}
                    </h3>
                    <div className="card-text">
                      <p>Skills:</p>
                      <ol>
                        {u.skills?.map((s) => (
                          <React.Fragment key={s._id}>
                            <li
                              onClick={() => {
                                goToSkill(s._id);
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
