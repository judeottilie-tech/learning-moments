//use the form modules from honey rae
import { createPost } from "../../services/postService"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import "./Post.css"

export const NewPost = ({ currentUser }) => {
    const [post, setPost] = useState({ description: "" })

    const navigate = useNavigate()

    const handleSave = (event) => {
        event.preventDefault()

        if (post.description) {

            const newPost = {
                userId: currentUser.id,
                description: post.description,
                topic: post.topic,
                dateCompleted: "",
            }

            createPost(newPost).then(() => {
                navigate("/myposts")
            })
        } else {
            window.alert; {"Please fill out the description!"}
        }
    }

    return (
        <form>
            <h2>New Post</h2>
            <fieldset>
                <div className="form-group">
                    <label>Description</label>
                    <input 
                    type="text"
                    className="form-control"
                    placeholder="Your text here.."
                    onChange={(event) => {
                        const postCopy = {...post}
                        postCopy.description = event/target.value
                        setPost
                        (postCopy)
                    }}
                    />
                </div>
            </fieldset>
            <fieldset> 
                <div className="form-group">
                    <button className="form-btn btn-info"
                    onClick={handleSave}>
                        Post
                    </button>
                </div>
            </fieldset>
        </form>
    )
}