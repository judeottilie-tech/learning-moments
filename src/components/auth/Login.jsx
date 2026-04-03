//import { getUserByEmail } from "../../services/userService"
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
    <main>
      <section>
        <form onSubmit={handleLogin}>
          <h1>Learning Moments</h1>
          <h2>Please sign in</h2>
          <fieldset>
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset>
            <div>
              <button type="submit">Sign in</button>
            </div>
          </fieldset>
        </form>
      </section>
      <section>
        <Link to="/register">Not a member yet?</Link>
      </section>
    </main>
  )
}