import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getAllPosts } from "../services/postService.jsx"
import { getUsers } from "../services/userService.jsx"
import "./User.css"

export const UserProfile = ({ currentUser }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [profileUser, setProfileUser] = useState({})
  const [postCount, setPostCount] = useState(0)

  useEffect(() => {
    getUsers().then((usersArray) => {
      const foundUser = usersArray.find((user) => user.id === parseInt(id))
      setProfileUser(foundUser)
    })

    getAllPosts().then((postArray) => {
      const userPosts = postArray.filter((post) => post.userId === parseInt(id))
      setPostCount(userPosts.length)
    })
  }, [id])

  if (!profileUser) return null

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">{profileUser.fullName?.charAt(0)}</div>
        <div>
          <h2 className="profile-name">{profileUser.fullName}</h2>
          <p className="profile-detail">Cohort: {profileUser.cohort}</p>
          <p className="profile-detail">Posts written: {postCount}</p>
        </div>
      </div>
      <div className="profile-actions">
        {currentUser.id === parseInt(id) ? (
          <button
            className="btn-secondary"
            onClick={() => navigate(`/profile/${id}/edit`)}
          >
            Edit Profile
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}
