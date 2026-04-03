import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllPosts } from "../../services/postService.jsx"
import { deletePostLike } from "../../services/postLikeService.jsx"

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
    <div className="favorites">
      {likedPosts.map((post) => {
        return (
          <div key={post.id} className="post-item">
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
            <button onClick={() => handleRemove(post.id)}>Remove</button>
          </div>
        )
      })}
    </div>
  )
}
