import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { useState } from "react"

import Home from "./pages/Home"
import Login from "./pages/Login"
import CreateBlog from "./pages/CreateBlog"
import UpdateBlog from "./pages/UpdateBlog"
import FileUpload from "./pages/FileUpload"

import Navbar from "./components/Navbar"

export default function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"))
  return (
    <Router>
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth}/>}/>
        <Route path="/login" element={<Login setIsAuth={setIsAuth}/>}/>
        <Route path="/create-blog" element={<CreateBlog />}/>
        <Route path="/file-upload" element={<FileUpload />}/>
        <Route path="/update/:id" element={<UpdateBlog />} />
      </Routes>
    </Router>
  )
}
