/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../../firebase"
import { useNavigate } from "react-router-dom"

import {BiLogOutCircle} from 'react-icons/bi'

// eslint-disable-next-line no-unused-vars
export default function Navbar({ isAuth, setIsAuth }) {
    const navigate = useNavigate()

    const signUserOut = () => {
        signOut(auth).then(() => {
            localStorage.clear()
            setIsAuth(false)
            navigate('/login')

        })
    }

  return (
    <nav className="navbar">
       <h2 className="logo">Blogoo</h2>
       <div className="linkWrapper">
        <Link className="link" to='/'>Home</Link>
            {! isAuth ? 
            <Link className="link"  to='/login'>Login</Link>
            : 
            <>
                <Link className="link"  to='/create-blog'>CreateBlog</Link>
                <span className="text-sm text-orange-400 font-medium"> Hello {auth.currentUser ? auth.currentUser.displayName : "User"}</span>

                <button onClick={signUserOut} className="logoutBtn">
                   <BiLogOutCircle/>
                </button>
            </>
            }
       </div>
    </nav>
  )
}