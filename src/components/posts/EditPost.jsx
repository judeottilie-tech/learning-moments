import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getPostById, editPost } from "../../services/postService.jsx"
import { getTopics } from "../../services/topicService.jsx"

export const EditPost = ({ currentUser }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [topics, setTopics] = useState([])
  const [post, setPost] = useState({
    title: "",
    body: "",
    topicId: 0,
  })

  useEffect(() => {
    getTopics().then((topicArray) => {
      setTopics(topicArray)
    })
  }, [])

  useEffect(() => {
    getPostById(id).then((postData) => {
      setPost(postData)
    })
  }, [id])

  const handleSave = (event) => {
    event.preventDefault()

    const updatedPost = {
      ...post,
      topicId: parseInt(post.topicId),
    }

    editPost(updatedPost).then(() => {
      navigate("/myposts")
    })
  }

  return (
    <form>
      <h2>Edit Post</h2>
      <fieldset>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={post.title}
            onChange={(event) => {
              setPost({ ...post, title: event.target.value })
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Body</label>
          <input
            type="text"
            className="form-control"
            value={post.body}
            onChange={(event) => {
              setPost({ ...post, body: event.target.value })
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Topic</label>
          <select
            value={post.topicId}
            onChange={(event) => {
              setPost({ ...post, topicId: event.target.value })
            }}
          >
            <option value="">Select a topic...</option>
            {topics.map((topic) => {
              return (
                <option key={topic.id} value={topic.id}>
                  {topic.name}
                </option>
              )
            })}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <button onClick={handleSave}>Save Changes</button>
        </div>
      </fieldset>
    </form>
  )
}
