import { useNavigate } from "react-router-dom"
import "./Post.css"

export const PostFilterBar = ({ setSearchTerm, currentUser }) => {
  const navigate = useNavigate()

  if (!currentUser) return null

  return (
    <div className="filter-bar">
      {currentUser.isActive ? (
        <>
          <input
            onChange={(event) => {
              setSearchTerm(event.target.value)
            }}
            type="text"
            placeholder="Search"
            className="post-search"
          />{" "}
        </>
      ) : (
        <>
          <button
            className="filter-btn btn-primary"
            onClick={() => {
              navigate("/newpost")
            }}
          >
            New Post
          </button>
          <button
            className="filter-btn btn-info"
            onClick={() => {
              setShowUserPostsOnly(true)
            }}
          >
            My Posts
          </button>
        </>
      )}
    </div>
  )
}
