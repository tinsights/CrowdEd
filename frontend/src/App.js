// import react router stuff
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./pages/Home";
import Users from "./pages/Users";
import UserProfilePage from "./pages/UserProfilePage";
import ViewUserPage from "./pages/ViewUserPage";
import Skills from "./pages/Skills";
import SkillPage from "./pages/SkillPage";
import UserSignIn from "./pages/UserSignIn";
import UserSignOut from "./pages/UserSignOut";
import Map from "./pages/Map";
import axios from "axios";

function App() {
  function checkIfLoggedIn() {
    axios
      .get("/auth/checkToken")
      .then((response) => {
        switch (response.status) {
          case 200:
            setIsLoggedIn(true);
            break;
          case 203:
            setIsLoggedIn(false);
            break;
          default:
            setIsLoggedIn(false);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  return (
    <Router>
      <header className="container-fluid p-0">
        <h1 className="h1 display-1 text-center">CrowdEd</h1>
        <nav className="navbar navbar-expand-sm bg-light">
          <div className="container-fluid p-0">
            <ul className="navbar-nav w-100 container">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/users">
                  Users
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/skills">
                  Skills
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/map">
                  Map
                </NavLink>
              </li>
              {!isLoggedIn && (
                <li className="nav-item ms-auto">
                  <NavLink className="nav-link" to="/signin">
                    Sign In
                  </NavLink>
                </li>
              )}
              {isLoggedIn && (
                <li className="nav-item ms-auto">
                  <NavLink className="nav-link" to="/me">
                    My Profile
                  </NavLink>
                </li>
              )}
              {isLoggedIn && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signout">
                    Sign Out
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </header>
      <div className="container-fluid p-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/me" element={<UserProfilePage />} />
          <Route path="/users">
            <Route path="/users/" element={<Users />} />
            <Route path="/users/:userId" element={<ViewUserPage />} />
            <Route path="/users/:userId/skills/:skillId" element={<SkillPage />} />
          </Route>

          <Route path="/skills/" element={<Skills />} />
          <Route path="map">
            <Route path="/map/" element={<Map />} />
            <Route path="/map/:lat/:lng" element={<Map />} />
          </Route>
          <Route path="/signin" element={<UserSignIn handleLogin={() => setIsLoggedIn(true)} />} />
          <Route path="/signout" element={<UserSignOut handleLogout={() => setIsLoggedIn(false)} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
