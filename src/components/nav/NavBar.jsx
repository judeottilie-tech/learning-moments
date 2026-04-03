import "./NavBar.css"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"


export const NavBar = () => {
    const navigate = useNavigate()

    return (
      <ul className="navBar">
        <li className="navbar-item">
          <Link to="/">All Posts</Link>
        </li>
        <li className="navbar-item">
          <Link to="/myposts">My Posts</Link>
        </li>
        <li className="navbar-item">
          <Link to="/newpost">New Post</Link>
        </li>
        <li className="navbar-item">
          <Link to="/favorites">Favorites</Link>
        </li>
        <li className="navbar-item">
          <Link to="/profile">Profile</Link>
        </li>

        {localStorage.getItem("learning_user") ? (
            <li className="navbar-item navbar-logout">
            <Link className="navbar-link"
            to=""
            onClick={() => {
              localStorage.removeItem("learning_user")
              navigate("/login", { replace: true })
            }}>
                Logout
            </Link>
        </li>
        ) : (
        ""
        )}
      </ul>
    )
}