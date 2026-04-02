import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { getUserByEmail } from "../../services/userService"


export const Login = () => {
    const [email, set] = useState("")
    const navigate = useNavigate()
    
}