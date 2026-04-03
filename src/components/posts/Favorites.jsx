import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllPosts } from "../../services/postService.jsx"
import { deletePostLike } from "../../services/postLikeService.jsx"
import "./Post.css"

export const Favorites = ({ currentUser }) => {
  const [likedPosts, setLikedPosts] = useState([])

  const fetchFavorites = () => {
    getAllPosts().then((postArray) => {
      const favorites = postArray.filter((post) =>
        post.postLikes.some((like) => like.userId === currentUser.id),
      )
      setLikedPosts(favorites)
    })
  }

  useEffect(() => {
    fetchFavorites()
  }, [])

  const handleRemove = (postId) => {
    const likedPost = likedPosts.find((post) => post.id === postId)
    const likeToDelete = likedPost.postLikes.find(
      (like) => like.userId === currentUser.id,
    )
    deletePostLike(likeToDelete.id).then(() => {
      fetchFavorites()
    })
  }

  return (
    <div className="posts">
      <h2 className="page-title">My Favorites</h2>
      {likedPosts.map((post) => {
        return (
          <div key={post.id} className="post-card">
            <Link to={`/posts/${post.id}`} className="post-card-title">
              {post.title}
            </Link>
            <div className="post-card-actions">
              <button
                className="btn-warning"
                onClick={() => handleRemove(post.id)}
              >
                ⭐ Remove
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
