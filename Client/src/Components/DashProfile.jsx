import { Alert, Button, Modal, TextInput } from "flowbite-react"
import { useEffect, useRef, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import {app} from "../firebase"
import {getStorage, uploadBytesResumable,ref, getDownloadURL} from "firebase/storage";
import { updateStart,
        updateSuccess,
        updateFailure,
        deleteStart,
        deleteSuccess,
        deleteFailure,
        signoutSuccess
        } from "../redux/user/UserSlice";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";

const DashProfile = () => {
        const {currentUser,error,loading}=useSelector(state=>state.user);
        const [imageFile,setImageFile]=useState(null);
        const [imageFileUrl,setImageFileUrl]=useState(null);
        const [imageUploadProgress,setimageUploadProgress]=useState(null);
        const [imageUploadError,setimageUploadError]=useState();
        const [formData,setFormDta]=useState({});
        const [imageUploading,setImageUploading]=useState(false);
        const [updateUserSuccess,setUpdateUserSuccess]=useState(false);
        const [updateUserError,setUpdateUserError]=useState(false);
        const [showModel,setShowModel]=useState(false);
        const filePickerRef=useRef();
        const dispatch=useDispatch();


        const handleImageChange=(e)=>{
                const file=e.target.files[0];
                if(file){
                        setImageFile(file);
                        setImageFileUrl(URL.createObjectURL(file));
                }     
        }
        useEffect(()=>{
                if(imageFile){
                uploadImage();
                }
        },[imageFile]);

        const uploadImage=async ()=>{
                setImageUploading(true);
                setimageUploadError(null);
            const storage=getStorage(app); 
            const fileName=new Date().getTime + imageFile;
            const storageRef=ref(storage,fileName);
            const uploadTask=uploadBytesResumable(storageRef,imageFile);
            uploadTask.on(
                "state_changed",
                (snapshat)=>{
                        const progress=(snapshat.bytesTransferred/snapshat.totalBytes)*100;
                        setimageUploadProgress(progress.toFixed(0));
                },
                ()=>{
                        setimageUploadError("image uploading error:image must be <2Mb");
                        setimageUploadProgress(null);
                        setImageFile(null);
                        setImageFileUrl(null);
                        setImageUploading(false);
                },
                ()=>{
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
                        setImageFileUrl(downloadUrl);
                        setFormDta({...formData,profilePicture:downloadUrl})
                        setImageUploading(false);
                        
                        })
                }
            )  
        }

        const handleChange =(e)=>{
        setFormDta({...formData,[e.target.id]:e.target.value});
        
}
      const handleSubmitForm =async(e)=>{
        e.preventDefault();
        if(Object.keys(formData).length===0){
                setUpdateUserError('there is no any update, please chage something to update');
                 return;
        }
        if(imageUploading) {
                setUpdateUserError('Please wait the image to uploaded fully');
                return;
        }
        try{
                dispatch(updateStart());
                const res=await fetch(`/api/user/update/${currentUser._id}`,{
                        method: 'PUT',
                        headers:{
                            'Content-Type': 'application/json',
                        },
                        body:JSON.stringify(formData),
                      });
                      const data=await res.json();
                      console.log('data is:')
                      
                      if(!res.ok){
                        dispatch(updateFailure(data.message));
                        setUpdateUserError(data.message);
                      }else{
                        dispatch(updateSuccess(data))
                        setUpdateUserSuccess("user updated successfully");
                      }

        }catch(error){
                dispatch(updateFailure(error.message));
        }
        
      }

     const handleDeleteUser=async ()=>{
        setShowModel(false);
        try{
                dispatch(deleteStart())
                const res=await fetch(`/api/user/delete/${currentUser._id}`,{
                        method:"DELETE",
                });
                const data=await res.json();
                if(!res.ok){
                        dispatch(deleteFailure(data.message));
                }
                dispatch(deleteSuccess(data));
        }catch(error){
                dispatch(deleteFailure(error.message))
        }
     }
     const handleSignOut =async()=>{
        try{
                const res=await fetch('/api/user/signout',{
                        method:'POST',
                })
                const data=await res.json();
                if(!res.ok){
                        console.log(data)
                }else{
                        dispatch(signoutSuccess());
                }
        }catch(error){
                console.log(error)
                //createNextState(error.message)
        }
     }
  return (
    <div className="relative max-w-lg mx-auto p-3 w-full ml-40 mr-8">
        <h1 className="my-2 text-center font-semibold text-4xl">Profile</h1>
        <form onSubmit={handleSubmitForm} className="flex flex-col gap-4">
                <input type="file" accept="image/*" onChange={handleImageChange} ref={filePickerRef} hidden/>
                <div className="w-32 h-32 self-center cursor-pointer overflow-hidden shadow-md rounded-full" onClick={()=>filePickerRef.current.click()}>
                        {imageUploadProgress && (
                                <CircularProgressbar value={imageUploadProgress || 0} text={`${imageUploadProgress}%`} 
                                strokeWidth={5}
                                styles={{
                                        root:{
                                                widtth:'20%',
                                                height:'20%',
                                                position:'absolute',
                                                top:75,
                                                left:0,
                                        },
                                        path:{
                                                stroke:`rgba(62,152,199,${imageUploadProgress/100})`
                                        },
                                }}/>
                        )}
                <img src={imageFileUrl|| currentUser.profilePicture} alt="user image"className="rounded-full w-full h-full object-cover border-8  border-[lightgray]" />
                </div>
                {imageUploadError &&
                <Alert color='red'>{imageUploadError}</Alert>
                }
                <TextInput 
                type="text" 
                id="username" 
                placeholder="username" 
                defaultValue={currentUser.username}
                onChange={handleChange}/>
                <TextInput 
                type="email" 
                id="email" 
                placeholder="email" 
                defaultValue={currentUser.email}onChange={handleChange}/>
                <TextInput 
                type="password" 
                id="password" 
                placeholder="password" onChange={handleChange}/>
                <Button 
                type="submit" 
                gradientDuoTone='purpleToBlue' 
                outline
                className="" disabled={loading || imageUploading} >
                        {loading?'loading...':'Update'}
                </Button>
                {
                       currentUser&& currentUser.isAdmin &&(
                                <Link to={'/create-post'}>
                                     <Button 
                                      type="button"
                                      gradientDuoTone='purpleToBlue'
                                      className="w-full"
                                      >
                                             Create post
                                      </Button>
                                </Link>
                        )
                }
        </form>
        <div className="text-red-500 flex justify-between mt-6">
                <span onClick={()=>setShowModel(true)} className="cursor-pointer">Delete Account</span>
                <span onClick={handleSignOut} className="cursor-pointer">Sign Out</span>
        </div>
        {updateUserSuccess && (
                <Alert color='success' className="mt-5">
                        {updateUserSuccess}
                </Alert>
        )}
        {updateUserError && (
                <Alert color='failure' className="mt-5">
                        {updateUserError}
                </Alert>
        )}
        {error && (
                <Alert color='failure' className="mt-5">
                        {error}
                </Alert>
        )}
        <Modal
        show={showModel}
        onClose={()=>setShowModel(false)}
        popup
        size='md'
         >
                <Modal.Header />
                <Modal.Body>
                        <div className="text-center">
                                <HiOutlineExclamationCircle className="h-14 w-14 text-grat-400 dark:text-gray-200 mx-auto mb-4" />
                        </div>
                        <p className="mb-5 text-gray-500 dark:text-gray-400 text-lg">Are you sure you want to delete your account!</p>
                        <div className="flex justify-between">
                                <Button color="failure" onClick={handleDeleteUser}>
                                        Yes
                                </Button>
                                <Button onClick={()=>setShowModel(false)}>Cancel</Button>
                        </div>
                </Modal.Body>
        </Modal>
    </div>
  )
}

export default DashProfile