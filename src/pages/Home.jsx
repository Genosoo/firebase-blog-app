/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { getDocs, deleteDoc, doc, collection } from 'firebase/firestore'
import { db, auth } from "../../firebase";

export default function Home({ isAuth }) {
  const [postLists, setPostLists] = useState([]);

  const postCollectionRef = collection(db, "blog")

  useEffect(() => {
    const getPost = async () => {
      const data = await getDocs(postCollectionRef)
      setPostLists(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
    getPost()
  })

  const deletePost = async (id) => {
    const postDoc = doc(db, "blog", id)
    await deleteDoc(postDoc)
  }

  return (
    <div className="homeContainer">
      {postLists.map((post) => (
        <div key={post.id} className="postCard">
          <h1 className="postTitle">{post.title}</h1>
          <p className="postDesc">{post.postText}</p>
          <span className="postAuthor"> - {post.author.name}</span>
          
          <div>
          { isAuth && post.author.id === auth.currentUser.uid && (
            <button onClick={() => {deletePost(post.id)}}>Delete Post</button>
          )}
          </div>
        </div>
      ))}
    </div>
  )
}
