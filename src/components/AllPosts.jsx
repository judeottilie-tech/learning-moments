import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllPosts } from "../../services/postService"

export const AllPosts = () => {
    const [posts, setPosts] = useState([])

        useEffect(() => {
            getAllPosts().then((postArray) => {
                setPosts(postArray)
            })
        }, [])

        return (
            <div className="posts">
                {posts.map((postObj) => {
                    return (
                        <Link to={`/allposts`} key={postObj}>
                            <User user={postObj} key={postObj.id} />
                        </Link>
                    )
                })}
            </div>
        )

}