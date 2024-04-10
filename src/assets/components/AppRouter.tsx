import { Navigate, Route, Routes } from "react-router-dom"
import Main from "../pages/Main/Main"
import Profile from "../pages/Profile/Profile"
import Basket from "../pages/Basket/Basket"
import Login from "../pages/Login/Login"

type Props = {}

export default function AppRouter({}: Props) {
  return (
    <Routes>
        <Route
            path="*"
            element={<Navigate to="/" replace />}
        />
        <Route path="/search/:type/:search" element={<Main/>}/>
        <Route path="/" element={<Main/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/basket" element={<Basket/>}/>
        <Route path="/login" element={<Login/>}/>

    </Routes>
  )
}