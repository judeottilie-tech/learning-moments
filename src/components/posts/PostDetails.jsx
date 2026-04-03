import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getPostById } from "../../services/postService.jsx" 

export const PostDetails = () => {
    const { id } = useParams()

    const [post, setPost] = useState({})

    useEffect(() => {
      getPostById(id).then((postData) => {
        setPost(postData)
      })
    }, [id])

     return (
         <div className="post">
                 <div>
                   <h3>{post.title}</h3>
                   <p>{post.user?.fullName}</p>
                   <p>{post.topic?.name}</p>
                   <p>{post.date}</p>
                   <p>{post.body}</p>
                   <p>{post.postLikes?.length} likes</p>
                 </div>
       </div>
     )
}