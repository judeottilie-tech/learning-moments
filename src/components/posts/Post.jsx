import { useEffect, useState } from "react"
import { getAllPosts, newPost, deletePost, editPost } from "../../services/postService.jsx"
import { getUsers } from "../../services/userService"
import "./Post.css"

export const Post = ({ post, currentUser }) => {
    const [ posts, setPosts ] = useState([])
    const [ user, setUser ] = useState({})

    useEffect (() => {
        getUsers().then((usersArray) => {
            setUser(usersArray)
        })
    }, [])

    const newUserPost = {
        userId: currentUser.id,
        postId: post.id,
    }

    const handleDelete = () => {
        deletePost(post.id).then(() => {
            getAllPosts
        })
    }

    return (
        <section className="post" key={post.id}>
            <header className="post-info">{post.title}</header>
            <div>{post.description}</div>
            <div>{post.topics}</div>
            <div>Liked #{post.favorite}</div>
        </section>
    )
}

