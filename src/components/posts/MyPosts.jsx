import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { getAllPosts, deletePost } from "../../services/postService.jsx"
import "./Post.css"

export const MyPosts = ({ currentUser }) => {
  const [posts, setPosts] = useState([])

  const fetchMyPosts = () => {
    getAllPosts().then((postArray) => {
      const myPosts = postArray.filter((post) => post.userId === currentUser.id)
      setPosts(myPosts)
    })
  }
  useEffect(() => {
    fetchMyPosts()
  }, [])

  const handleDelete = (postId) => {
    deletePost(postId).then(() => {
      fetchMyPosts()
    })
  }

  return (
    <div className="posts">
      <h2 className="page-title">My Posts</h2>
      {posts.map((post) => {
        return (
          <div key={post.id} className="post-card">
            <Link to={`/posts/${post.id}`} className="post-card-title">
              {post.title}
            </Link>
            <div className="post-card-actions">
              <button
                className="btn-secondary"
                onClick={() => navigate(`/posts/${post.id}/edit`)}
              >
                Edit
              </button>
              <button
                className="btn-warning"
                onClick={() => handleDelete(post.id)}
              >
                Delete
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
