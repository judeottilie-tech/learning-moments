import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getUsers, updateUser } from "../services/userService.jsx"
import "./User.css"

export const EditProfile = ({ currentUser }) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [user, setUser] = useState({
      fullName: "",
      cohort: "",
    })

    useEffect(() => {
        getUsers().then((usersArray) => {
            const foundUser = usersArray.find((user) => user.id === parseInt(id))
            setUser(foundUser)
        })
    }, [id])

    const handleSave = (event) => {
        event.preventDefault()

        updateUser(user).then(() => {
            navigate(`/profile/${currentUser.id}`)
        })
    }

    return (
        <form>
            <h2>Edit Profile</h2>
            <fieldset>
                <div className="form-group">
                    <label>Full Name</label>
                    <input
                    type="text"
                    className="form-control"
                    value={user.fullName}
                    onChange={(event) => {
                        setUser({ ...user, fullName: event.target.value })
                    }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Cohort</label>
                    <input
                    type="text"
                    className="form-control"
                    value={user.cohort}
                    onChange={(event) => {
                        setUser({ ...user, cohort: event.target.value })
                    }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <button onClick={handleSave}>Save Changes?</button>
                </div>
            </fieldset>
        </form>
    )
}