import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllPosts, deletePost } from "../../services/postService.jsx"

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
    <div className="my-posts">
      {posts.map((post) => {
        return (
          <div key={post.id} className="post-items">
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </div>
        )
      })}
    </div>
  )
}
