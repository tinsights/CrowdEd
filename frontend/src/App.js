// import react router stuff
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Users from "./pages/Users";
import UserProfilePage from "./pages/UserProfilePage";
import Skills from "./pages/Skills";
import SkillPage from "./pages/SkillPage";

function App() {
  return (
    <Router>
      <header className="container-fluid">
        <h1 className="h1 display-1 text-center">CrowdEd</h1>
        <nav className="navbar navbar-expand-sm bg-light">
          <div className="container-fluid">
            <ul className="navbar-nav">
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
            </ul>
          </div>
        </nav>
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users">
            <Route path="/users/:userId" element={<UserProfilePage />} />
            <Route path="/users/" element={<Users />} />
          </Route>
          <Route path="/skills">
            <Route path="/skills/" element={<Skills />} />
            <Route path="/skills/:skillId" element={<SkillPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
