/* eslint-disable no-unused-vars */
import { auth, provider } from '../../firebase'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'

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
        <div className='border w-[400px] flex flex-col items-center p-5 rounded'>
        <p>Sign In With Google to Continue</p>
        <button className="loginBtn" onClick={signInWithGoogle}>
          <FcGoogle /><span>Sign in with Google</span>
          </button>
        </div>
    </div>
  )
}
