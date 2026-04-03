import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createUser } from "../../services/userService"
import { Link } from "react-router-dom"
import "./Login.css"

export const Register = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    cohort: 0,
  })

  const registerNewUser = () => {
    const newUser = {
      ...user,
      cohort: parseInt(user.cohort),
    }

    createUser(newUser).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "learning_user",
          JSON.stringify({
            id: createdUser.id,
          }),
        )

        navigate("/")
      }
    })
  }

  return (
    <div className="register-container">
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Full name"
        onChange={(e) => setUser({ ...user, fullName: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <input
        type="number"
        placeholder="Cohort number"
        onChange={(e) => setUser({ ...user, cohort: e.target.value })}
      />
      <button onClick={registerNewUser}>Register</button>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  )
}
