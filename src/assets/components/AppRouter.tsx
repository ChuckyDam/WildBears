import { Navigate, Route, Routes } from "react-router-dom"
import Main from "../pages/Main/Main"
import Profile from "../pages/Profile/Profile"
import Basket from "../pages/Basket/Basket"

type Props = {}

export default function AppRouter({}: Props) {
  return (
    <Routes>
        <Route
            path="*"
            element={<Navigate to="/" replace />}
        />
        <Route path="/:type/:search" element={<Main/>}/>
        <Route path="/" element={<Main/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/basket" element={<Basket/>}/>

    </Routes>
  )
}