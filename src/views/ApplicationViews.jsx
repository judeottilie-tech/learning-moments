import { useEffect, useState } from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../components/nav/NavBar.jsx"
import { AllPosts } from "../components/AllPosts.jsx"
import { NewPost } from "../components/posts/NewPost.jsx"
import { MyPosts } from "../components/posts/MyPosts.jsx"
import { EditPost } from "../components/posts/EditPost.jsx"
import { Favorites } from "../components/posts/Favorites.jsx"
import { PostDetails } from "../components/posts/PostDetails.jsx"
import { UserProfile } from "../profiles/UserProfile.jsx"
import { EditProfile } from "../profiles/EditProfile.jsx"

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const localLearningUser = localStorage.getItem("learning_user")
    const learningUserObject = JSON.parse(localLearningUser)
    setCurrentUser(learningUserObject)
  }, [])

if (!currentUser) return null

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar currentUser={currentUser}/>
            <Outlet />
          </>
        }
      >
        <Route
          path="posts/:id"
          element={<PostDetails currentUser={currentUser} />}
        />
        <Route
          index element={<AllPosts />} />
        <Route path="newpost" element={<NewPost currentUser={currentUser} />} />

        <Route path="myposts" element={<MyPosts currentUser={currentUser} />} />
        <Route
          path="posts/:id/edit"
          element={<EditPost currentUser={currentUser} />}
        />
        <Route
          path="favorites"
          element={<Favorites currentUser={currentUser} />}
        />
        <Route
          path="profile/:id"
          element={<UserProfile currentUser={currentUser} />}
        />
        <Route
          path="profile/:id/edit"
          element={<EditProfile currentUser={currentUser} />}
        />
      </Route>
    </Routes>
  )
}
