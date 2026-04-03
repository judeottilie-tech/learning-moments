import { useEffect, useState } from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../components/nav/NavBar.jsx"
import { AllPosts } from "../components/AllPosts.jsx"
import { PostDetails } from "../components/posts/PostDetails"

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const localLearningUser = localStorage.getItem("learning_user")
    const learningUserObject = JSON.parse(localLearningUser)
    setCurrentUser(learningUserObject)
  }, [])

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route path="posts/:id"
        element={<PostDetails currentUser={currentUser} />} />
        <Route index element={<AllPosts />} />
      </Route>
    </Routes>
  )
}
