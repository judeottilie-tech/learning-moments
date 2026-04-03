import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getPostById } from "../../services/postService.jsx"
import { createPostLike } from "../../services/postLikeService.jsx" 

export const PostDetails = ({ currentUser }) => {
    const { id } = useParams()

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
                //nav to favorites
            })
        }

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
         {currentUser.id === post.userId ? (
           <button>Edit</button>
         ) : (
           <button onClick={handleLike}>Like</button>
         )}
       </div>
     ) 
}