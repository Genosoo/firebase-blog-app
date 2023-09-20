/* eslint-disable no-unused-vars */
import { auth, provider } from '../../firebase'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
export default function Login({ setIsAuth }) {
  const navigate = useNavigate()  

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
        localStorage.setItem("isAuth", true)
        setIsAuth(true)
        navigate('/')

    })    
  } 

  return (
    <div className="loginContainer">
        <p>Sign In With Google to Continue</p>
        <button className="loginBtn" onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  )
}
