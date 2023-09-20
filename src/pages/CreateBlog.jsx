import  { useState, useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, auth, storage } from '../../firebase';
import { useNavigate, Link } from 'react-router-dom';
import { v4 } from 'uuid';

export default function CreateBlog() {
  const [title, setTitle] = useState('');
  const [postText, setPostText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [checkUser, setCheckUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const postCollectionRef = collection(db, 'blog');
  const navigate = useNavigate();

  // Get the current timestamp
  const timestamp = new Date();

  const createPost = async () => {
    // Upload the selected image first
    let imageUrl = null;

    if (selectedImage) {
      const imageRef = ref(storage, `images/${selectedImage.name}` + v4());
      await uploadBytes(imageRef, selectedImage);
      const downloadUrl = await getDownloadURL(imageRef);
      imageUrl = downloadUrl;
    }

    setIsLoading(true); // Set loading to true while submitting

    // Add the post to Firestore with the image URL
    try {
      await addDoc(postCollectionRef, {
        title,
        postText,
        imageUrl,
        author: {
          name: auth.currentUser.displayName,
          id: auth.currentUser.uid,
        },
        createdAt: timestamp,
      });

      setIsLoading(false); // Set loading to false after successful submission
      navigate('/');
    } catch (error) {
      console.error('Error creating post:', error);
      setIsLoading(false); // Set loading to false in case of an error
    }
  };

  useEffect(() => {
    const getAuth = localStorage.getItem('isAuth');
    setCheckUser(getAuth);
  }, []);

  return (
    <div className="postContainer">
      {checkUser ? (
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
            <textarea
              placeholder="Post..."
              onChange={(e) => setPostText(e.target.value)}
            />
          </div>

          {/* Add a file input for image upload */}
          <div className="inputWrapper">
            <label>Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedImage(e.target.files[0])}
            />
          </div>

          {isLoading ? (
            <div>Loading...</div> // Show loading indicator while submitting
          ) : (
            <button onClick={createPost}>Submit Post</button>
          )}
        </div>
      ) : (
        <div className="text-center p-3">
          <h1 className="text-5xl">Not Permission!</h1>
          <p className="mt-5">
            Please login to{' '}
            <Link to="/login" className="text-sm text-orange-600 font-medium">
              Create Post
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
