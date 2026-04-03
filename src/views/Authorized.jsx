import { Navigate } from "react-router-dom"

export const Authorized = ({ children }) => {
  if (localStorage.getItem("learning_user")) {
    return children
  }
  return <Navigate to="/login" />
}
