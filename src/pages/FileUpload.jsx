/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"
import { storage } from "../../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

export default function FileUpload() {
  const [imageUpload, setImageUpload] = useState(null)
  const [imageList, setImageList] = useState([])

  const imageListRef = ref(storage, "images/")
 

  const uploadImage = async () => {
    if (!imageUpload) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
            setImageList((prev) => [...prev, url])
        })
    })
  } 

//   const uploadImage = async () => {
//     if (!imageUpload) return;
//     const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
//     uploadBytes(imageRef, imageUpload).then(() => {
//         alert("Image Uploaded!")
//     })
//   } 

 
  useEffect(() => {
    listAll(imageListRef).then((response) => {
        response.items.forEach((item) => {
            getDownloadURL(item).then((url) => {
                setImageList((prev) => [...prev, url])
            })
        })
    });
  }, []);
  
  return (
    <div>
        <h1>FileUpload</h1>
        <input 
            type="file" 
            onChange={(e) => setImageUpload(e.target.files[0])}
        />
        <button onClick={uploadImage}>Upload Image</button>

        {imageList.map((url, index) => (
            <div key={index}>
                <img src={url} alt=""  width={200}/>
            </div>
        ))}
    </div>
  )
}
