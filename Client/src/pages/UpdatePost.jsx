import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useState,useEffect } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {getStorage,ref, uploadBytesResumable,getDownloadURL } from "firebase/storage";
import {app} from "../firebase";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate,useParams } from "react-router-dom";
import {useSelector } from "react-redux";

const UpdatePost = () => {
  const [file,setFile]=useState(null);
  const [imageUploadProgress,setimageUploadProgress]=useState(null);
  const [imageUploadError,setimageUploadError]=useState(null);
  const [formData,setFormDta]=useState({});
  const [addPostError,setAddPostError]=useState();
  const navigate=useNavigate();
  const {postId}=useParams();
  const {currentUser}=useSelector((state)=>state.user);

  useEffect(()=>{
        try{
                const fetchPosts=async ()=>{
                        const res=await fetch(`/api/post/getPosts?postId=${postId}`);
                        const data=await res.json();
                        console.log(data);
                        if(!res.ok){
                                console.log(data.message)
                                setAddPostError(data.message);
                                return;
                        }
                        if(res.ok){
                                setAddPostError(null);
                                setFormDta(data.posts[0]);
                        }
                }
                fetchPosts();

        }catch{
                console.log("error")
        }
  },[postId])


  const handleUploadImage=async()=>{
   try{
    if(!file){
      setimageUploadError('Please select an image to upload')
      return;
    }
    setimageUploadError(null);
    const storag=getStorage(app);
    const filename=new Date().getTime()+ '-' +file.name;
    const storageRef=ref(storag,filename);
    const uploadTask=uploadBytesResumable(storageRef,file);
    uploadTask.on(
      "state_changed",
      (snapshat)=>{
              const progress=(snapshat.bytesTransferred/snapshat.totalBytes)*100;
              setimageUploadProgress(progress.toFixed(0));
      },
      (error)=>{
              setimageUploadError("image uploading error");
              setimageUploadProgress(null);
              //setImageFile(null);
              //setImageFileUrl(null);
              //setImageUploading(false);
      },
      ()=>{
              getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
             setimageUploadProgress(null);
             setimageUploadProgress(null)
              setFormDta({...formData,image:downloadUrl})
              //setImageUploading(false);
              
              });
      }
  );
}
  catch(error){
    setimageUploadProgress(null);
    setimageUploadProgress(null)
  }
  }
  const handleFormSubmit=async (e)=>{
    e.preventDefault();
    try{
      const res=await fetch(`/api/post/updatePost/${formData._id}/${currentUser._id}`,{
        method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(formData),
          });
          const data=await res.json();
          if(data.success===false){
            setAddPostError(data.message);
            return;
          }
          if(!res.ok){
            setAddPostError(data.message);
            return;
          }
          if(res.ok){
            setAddPostError(null);
            navigate(`/post/${data.slug}`)
          }

      
    }catch(error){
      setAddPostError("Something is wrong!");
    }
  }
  return (
    <div className='p-3 max-w-3xl min-h-screen mx-auto'>
        <h1 className='text-center font-semibold text-3xl my-3'>Update Post</h1>
        <form className='flex flex-col gap-4' onSubmit={handleFormSubmit}>
            <div className='flex flex-col gap-3 md:flex-row justify-between border-dotted'>
                <TextInput 
                        type='text'
                        id='text'
                        placeholder='Title'
                        required
                        onChange={(e)=>setFormDta({...formData,title:e.target.value})} 
                        value={formData.title}   
                />
                <Select className="gap-3"
                onChange={(e)=>setFormDta({...formData,category:e.target.value})}
                value={formData.category}
                >
                <option value='uncatagorized'>select a category</option>
                <option value='ruby'>Ruby</option>
                <option value='javascript'>Javascript</option>
                </Select>
            </div>
            <div className="flex gap-4 items-center justify-between  border-teal-500 border-dotted ">
                <FileInput type='file' accept="image/*" 
                onChange={(e)=>setFile(e.target.files[0])}
                />
                <Button 
                type="button" 
                gradientDuoTone="purpleToPink" 
                size="md"
                onClick={handleUploadImage}
                disabled={imageUploadProgress}
                >
                  {imageUploadProgress?(
                    <div className="w-16 h-16">
                      <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} />
                    </div>
                    
                  ):'upload image'}
                        
                </Button>
                
            </div>
            {imageUploadError&&(
                  <Alert color='failure'>
                    {imageUploadError}
                  </Alert>
                )}
            <ReactQuill theme="snow" placeholder="Add something" className="h-40 mb-2" 
            required
            value={formData.content}
            onChange={(value)=>{
              setFormDta({...formData,content:value});
              }
            }
            />;
            <Button type="submit" gradientDuoTone="purpleToPink">
                       Update post
            </Button>
            {addPostError && (
              <Alert color="failure" className="mt-5">{addPostError}</Alert>
            )}
        </form>
    </div>
    
  )
}

export default UpdatePost