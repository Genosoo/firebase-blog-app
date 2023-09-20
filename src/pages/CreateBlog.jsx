import { useState, useEffect } from "react"
import { addDoc, collection } from 'firebase/firestore'
import { db, auth } from '../../firebase'
import { useNavigate, Link } from "react-router-dom"

export default function CreateBlog() {
  const [title, setTitle] = useState("")
  const [postText, setPostText] = useState("")

  const [checkUser, setCheckUser] = useState(false)

  const postCollectionRef = collection(db, "blog")

  const navigate = useNavigate()

  const createPost = async () => {
    await addDoc(postCollectionRef, {
        title, 
        postText, 
        author:{
            name:auth.currentUser.displayName,
            id: auth.currentUser.uid
        },
    })
    navigate("/")
  }


  useEffect(() => {
    const getAuth = localStorage.getItem('isAuth')
    setCheckUser(getAuth)
  }, [])

  return (
    <div className="postContainer">
      {checkUser ? 
            <div className="postBox">
                <h1>Create A Post</h1>
                <div className="inputWrapper">
                    <label>Title:</label>
                    <input 
                        type="text" 
                        placeholder="Title..." 
                        onChange={(e) => setTitle(e.target.value)} 
                    />
                </div>
                <div className="inputWrapper">
                    <label>Post:</label>
                    <textarea placeholder="Post..."  onChange={(e) => setPostText(e.target.value)} />
                </div>
                <button onClick={createPost}>Submit Post</button>
            </div>  
            :
            <div className="text-center p-3">
                <h1 className="text-5xl">Not Permission!</h1>
                <p className="mt-5">
                Please login to  
                <Link to="/login" className="text-sm text-orange-600 font-medium"> Create Post</Link>
                </p>
            </div>
    }
    </div>
  )
}
