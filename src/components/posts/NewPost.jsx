//use the form modules from honey rae
import { useState, useEffect } from "react"
import { createPost } from "../../services/postService.jsx"
import { getTopics } from "../../services/topicService.jsx"
import { useNavigate } from "react-router-dom"
import "./Post.css"

export const NewPost = ({ currentUser }) => {
  const [post, setPost] = useState({ title: "", body: "" })
  const [topics, setTopics] = useState([])
  const [selectedTopic, setSelectedTopic] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    getTopics().then((topicArray) => {
      setTopics(topicArray)
    })
  }, [])

  const handleSave = (event) => {
    event.preventDefault()

    if (post.title && post.body && selectedTopic) {
      const newPost = {
        title: post.title,
        userId: currentUser.id,
        body: post.body,
        topicId: parseInt(selectedTopic),
        date: new Date().toISOString().split("T")[0],
      }

      createPost(newPost).then(() => {
        navigate("/myposts")
      })
    } else {
      window.alert("Please fill out all fields!")
    }
  }

  return (
    <form>
      <h2>New Post</h2>

      <fieldset>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Post title"
            onChange={(event) => {
              const postCopy = { ...post }
              postCopy.title = event.target.value
              setPost(postCopy)
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
            placeholder="Write your post..."
            onChange={(event) => {
              const postCopy = { ...post }
              postCopy.body = event.target.value
              setPost(postCopy)
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Topic</label>
          <select
            onChange={(event) => {
              setSelectedTopic(event.target.value)
            }}
          >
            <option value="">Select Topic</option>
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
          <button className="form-btn btn-info" onClick={handleSave}>
            Post
          </button>
        </div>
      </fieldset>
    </form>
  )
}
