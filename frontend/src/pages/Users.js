import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default class Users extends React.Component {
  state = {
    data: null,
  };
  url = "http://localhost:5005/api/users";
  render() {
    return (
      <>
        <h2>All Users</h2>
        <div class="row g-5">
          {this.state.data?.map((u) => (
            <React.Fragment key={u._id}>
              <div class="col-6 col-sm-4 col-lg-3 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title">{u.name}</h3>
                    <div class="card-text">
                      <p>Skills:</p>
                      <ol>
                        {u.skills?.map((s) => (
                          <React.Fragment key={s._id}>
                            <li>{s.title}</li>
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
      </>
    );
  }

  async componentDidMount() {
    let response = await axios.get(this.url);
    this.setState({
      data: response.data,
    });
  }
}
