import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import CreateBlog from "./pages/CreateBlog"
import { useState } from "react"

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
      </Routes>
    </Router>
  )
}
