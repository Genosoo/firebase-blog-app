import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { useNavigate } from 'react-router-dom';

export default function UpdateBlog() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [postText, setPostText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const navigate = useNavigate()
  
  useEffect(() => {
    const fetchPost = async () => {
      const postRef = doc(db, 'blog', id);
      const postSnapshot = await getDoc(postRef);
      if (postSnapshot.exists()) {
        const postData = postSnapshot.data();
        setTitle(postData.title);
        setPostText(postData.postText);
        setImageUrl(postData.imageUrl);
      }
    };
    fetchPost();
  }, [id]);

  const updatePost = async () => {
    // Upload a new image if one is selected
    let updatedImageUrl = imageUrl;
    if (selectedImage) {
      const imageRef = ref(storage, `images/${selectedImage.name}`);
      await uploadBytes(imageRef, selectedImage);
      updatedImageUrl = await getDownloadURL(imageRef);
    }

    const postRef = doc(db, 'blog', id);
    await updateDoc(postRef, {
      title,
      postText,
      imageUrl: updatedImageUrl, // Update the URL here
    });
    // Redirect or navigate to the updated post or some other page.
    navigate("/")
  };

  return (
    <div className="updateContainer">
   <div className="updateWrapper">
   <h1 className='text-4xl  text-slate-800'>Update Post</h1>
      <div className="inputWrapper">
        <label>Title:</label>
        <input
          type="text"
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="inputWrapper">
        <label>Post:</label>
        <textarea
          placeholder="Post..."
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        />
      </div>

      {/* Display the existing image */}
      {imageUrl && (
        <div className="inputWrapper">
          <label>Existing Image:</label>
          <img src={imageUrl} alt="Post Image" width={200} />
        </div>
      )}

      {/* Add a file input for image upload */}
      <div className="inputWrapper">
        <label>New Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setSelectedImage(e.target.files[0])}
        />
      </div>

      <button onClick={updatePost} className=' bg-slate-700 text-white p-3 rounded mt-3'>Update Post</button>
   </div>
    </div>
  );
}
