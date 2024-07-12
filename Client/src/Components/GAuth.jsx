import { Button } from 'flowbite-react'
import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai';
import {GoogleAuthProvider, signInWithPopup,getAuth} from "firebase/auth";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInSuccess } from '../redux/user/UserSlice';
import { app } from '../firebase';


const GAuth = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
    const handleClick=async()=>{
      
      const auth=getAuth(app);
      const provider=new GoogleAuthProvider();
      provider.setCustomParameters({prompt:'select_account'});
      
      try{
        const resultFromGoogle= await signInWithPopup(auth,provider);
        const res=await fetch('/api/authentication/google',{
          method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
              name:resultFromGoogle.user.displayName,
              email:resultFromGoogle.user.email,
              googlePhotoUrl:resultFromGoogle.user.photoURL,
            }),
        });
        const data=await res.json();
        if(res.ok){
          dispatch(signInSuccess(data));
          navigate('/');
        }
      }catch{

      }
    }
  return (
    <div>
        <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleClick}>
            <AiFillGoogleCircle className='w-6 h-6 mr-4'/>
            Sign in with google
        </Button>
    </div>
  )
}

export default GAuth