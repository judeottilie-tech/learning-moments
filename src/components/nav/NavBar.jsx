import "./NavBar.css"
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export const NavBar = ({ currentUser }) => {
  const navigate = useNavigate()

  return (
    <ul className="navBar">
      <li className="navbar-item">
        <NavLink to="/">All Posts</NavLink>
      </li>
      <li className="navbar-item">
        <NavLink to="/myposts">My Posts</NavLink>
      </li>
      <li className="navbar-item">
        <NavLink to="/newpost">New Post</NavLink>
      </li>
      <li className="navbar-item">
        <NavLink to="/favorites">Favorites</NavLink>
      </li>
      <li className="navbar-item">
        <NavLink to={`/profile/${currentUser?.id}`}>Profile</NavLink>
      </li>

      {localStorage.getItem("learning_user") ? (
        <li className="navbar-item navbar-logout">
          <NavLink
            className="navbar-link"
            to=""
            onClick={() => {
              localStorage.removeItem("learning_user")
              window.location.href = "/login"
            }}
          >
            Logout
          </NavLink>
        </li>
      ) : (
        ""
      )}
    </ul>
  )
}
