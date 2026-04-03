import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getPostById } from "../../services/postService.jsx"
import { createPostLike } from "../../services/postLikeService.jsx"
import "./Post.css"

export const PostDetails = ({ currentUser }) => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [post, setPost] = useState({})

  useEffect(() => {
    getPostById(id).then((postData) => {
      setPost(postData)
    })
  }, [id])

  const handleLike = () => {
    const newLike = {
      userId: currentUser.id,
      postId: post.id,
    }
    createPostLike(newLike).then(() => {
      navigate("/favorites")
    })
  }

  const alreadyLiked = post.postLikes?.some(
    (like) => like.userId === currentUser.id,
  )

  return (
    <div className="post-detail">
      <h2 className="post-detail-title">{post.title}</h2>

      <div className="post-detail-meta">
        <span
          className="post-detail-author"
          onClick={() => navigate(`/profile/${post.userId}`)}
          style={{ cursor: "pointer" }}
        >
          {post.user?.fullName}
        </span>
        {" · "}
        {post.topic?.name}
        {" · "}
        {post.date}
        {" · "}
        {post.postLikes?.length} likes
      </div>

      <div className="post-detail-body">{post.body}</div>

      <div className="post-detail-actions">
        {currentUser.id === post.userId ? (
          <button
            className="btn-secondary"
            onClick={() => navigate(`/posts/${post.id}/edit`)}
          >
            Edit
          </button>
        ) : alreadyLiked ? (
          <button disabled>⭐ Liked</button>
        ) : (
          <button className="btn-primary" onClick={handleLike}>
            ☆ Like
          </button>
        )}
      </div>
    </div>
  )
}
