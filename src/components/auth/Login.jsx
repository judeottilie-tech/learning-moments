//import { getUserByEmail } from "../../services/userService"
import "./Login.css"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { getUserByEmail } from "../../services/userService"

export const Login = () => {
  const [email, setEmail] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    getUserByEmail(email).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0]
        localStorage.setItem(
          "learning_user",
          JSON.stringify({
            id: user.id,
          }),
        )
        navigate("/")
      } else {
        window.alert("Invalid login")
      }
    })
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Learning Moments</h1>
        <p>Please sign in</p>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            required
            autoFocus
            className="form-control"
          />
          <button type="submit" className="btn-primary">
            Sign in
          </button>
        </form>
        <Link to="/register">Not a member yet?</Link>
      </div>
    </div>
  )
}