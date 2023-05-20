import { Link } from "react-router-dom";

import "./Nav.css";

const Nav = () => {
  return (
    <div className="nav-container">
      <div className="nav-left">
        <h1>Logo</h1>
      </div>
      <div className="nav-right">
        <ul>
          <li>
            <Link to="/" id="home">
              Home
            </Link>
          </li>
          <li>
            <Link to="/post">Posts</Link>
          </li>
          <li>
            <Link to="/comment">Comments</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Nav;
