import { Route, Routes, Outlet } from "react-router-dom"
import 

export const UserView = ({
    currentUser
}) => {
    return (
    <Routes>
        <Route path="/"
        element={
            <>
            <NavBar />
            <Outlet />
            </>
        }
        >
            <Route index element={<Welcome />} />
            <Route path="posts"
            element={
                <PostList currentUser={currentUser} />} />

                <Route path="users">
                    <Route index element=
                    {<UserList />} />
                </Route>
                <Route path="profile"
                element={<UserForm currentUser={currentUser} />}
            />
        </Route>
    </Routes>
    )
}