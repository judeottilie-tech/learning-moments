import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getAllPosts } from "../services/postService.jsx"
import { getUsers } from "../services/userService.jsx"

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
    <div className="profile">
      <h2>{profileUser.fullName}</h2>
      <p>Cohort: {profileUser.cohort}</p>
      <p>Posts written: {postCount}</p>
      {currentUser.id === parseInt(id) ? (
        <button onClick={() => navigate(`/profile/${id}/edit`)}>
          Edit Profile
        </button>
      ) : (
        ""
      )}
    </div>
  )
}
