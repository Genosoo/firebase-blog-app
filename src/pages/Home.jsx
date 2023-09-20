/* eslint-disable react/prop-types */
import  { useState, useEffect } from "react";
import { getDocs, deleteDoc, doc, collection } from 'firebase/firestore';
import { db, auth } from "../../firebase";
import {FaTrash, FaEdit} from 'react-icons/fa'
import {Link} from 'react-router-dom'

export default function Home({ isAuth }) {
  const [postLists, setPostLists] = useState([]);

  const postCollectionRef = collection(db, "blog");

  useEffect(() => {
    const getPost = async () => {
      const data = await getDocs(postCollectionRef);
      setPostLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPost();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deletePost = async (id) => {
    const postDoc = doc(db, "blog", id);
    await deleteDoc(postDoc);

    // Remove the deleted post from the state without refreshing
    setPostLists((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  return (
    <div className="homeContainer">
      {postLists.map((post) => (
        <div key={post.id} className="postCard">
          <h1 className="postTitle">{post.title}</h1>
            {isAuth && post.author.id === auth.currentUser.uid && (
              <div className="btnAction">
                 <button className="btnDelete" onClick={() => deletePost(post.id)}>
                <FaTrash/>
              </button>
                <Link to={`/update/${post.id}`}>
                    <button className="btnUpdate">
                        <FaEdit />
                    </button>
                </Link>
              </div>
            )}
          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt="Post Image"
              className="postImage"
            />
          )}
          <p className="postDesc">{post.postText}</p>
          <span className="postAuthor"> - {post.author.name}</span>

          
        </div>
      ))}
    </div>
  );
}
