import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllPosts } from "../../services/postService"
import { getTopics } from "../../services/topicService"

export const AllPosts = () => {
  const [posts, setPosts] = useState([])
  const [topics, setTopics] = useState([])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTopic, setSelectedTopic] = useState("")

  useEffect(() => {
    getAllPosts().then((postArray) => {
      setPosts(postArray)
    })
  }, [])

  useEffect(() => {
    getTopics().then((topicArray) => {
        setTopics(topicArray)
    })
  }, [])

  //this filters the posts and maps over them instead of just all of the posts, matchesSearch checks if the post title includes search term, toLowerCase makes search case INsensitive so you can write whatever in whatever caps
  let filteredPosts = posts.filter((postObj) => {
    const matchesSearch= postObj.title.toLowerCase().includes(searchTerm.toLowerCase())
    //if no topic selected, shows all posts, if topic is selected, shows posts where topicId matches, use == because selectedTopic is from a dropdown as a string, but postObj.topicId is a number 
    const matchesTopic = selectedTopic === "" || postObj.topicId == selectedTopic
//if both are true, post shows
    return matchesSearch && matchesTopic
  })

  return (
    <div className="posts">
      <input
        onChange={(event) => {
          setSearchTerm(event.target.value)
        }}
        type="text"
        placeholder="Search Posts"
        className="post-search"
      />{" "}
      <select
        onChange={(event) => {
          setSelectedTopic(event.target.value)
        }}
      >
        <option value="">All Topics</option>
        {topics.map((topic) => {
          return (
            <option key={topic.id} value={topic.id}>
              {topic.name}
            </option>
          )
        })}
      </select>


      {filteredPosts.map((postObj) => {
        return (
          <Link to={`/posts/${postObj.id}`} key={postObj.id}>
            <div>
              <h3>{postObj.title}</h3>
              <p>{postObj.topic?.name}</p>
              <p>{postObj.postLikes?.length} likes</p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
