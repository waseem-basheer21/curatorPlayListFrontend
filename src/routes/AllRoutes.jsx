import { Route,Routes } from "react-router-dom"
import HomePage from "../pages/HomePage"
import Login from "../pages/Login"
import Register from "../pages/Register"    
import PlaylistForm from "../components/PlaylistForm"

export default function AllRoutes() {
  return (
   <Routes>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/createPlaylist" element={<PlaylistForm/>}/>
    <Route path="/" element={<HomePage/>}/>
   </Routes>
  )
}
