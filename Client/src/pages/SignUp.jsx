import { Link,useNavigate } from "react-router-dom";
import {Alert, Button, Label, Spinner, TextInput} from "flowbite-react"
import { useState } from "react";
import GAuth from "../Components/GAuth";

const SignUp = () => {
  const [formData,setFormData]=useState({});
  const [errorMessage,setErrorMessage]=useState(null);
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value.trim()})
  }
  
  const handleSubmit=async (e)=>{
    e.preventDefault();
    if(!formData.username || !formData.email || !formData.password){
      return setErrorMessage("pelease fiel all the fields.");
    }
    try{
      setLoading(true);
      setErrorMessage(null);
        const res=await fetch('/api/authentication/signup',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(formData),
          });
          const data=await res.json();
         if(data.success=== false){
          return setErrorMessage(data.message)
         }
         setLoading(false);
         if(res.ok){
          navigate('/sign-in');
         }
    }catch(error){
      setErrorMessage(error.message);
      setLoading(false);
    }
  }
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-2 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-8'>
        <div className="flex-1">
          <Link to='/' className=" font-bold text-4xl dark:text-white"><span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white whitespace-nowrap">Haftamu&apos;s</span> Blog App</Link>
          <p className="text-sm mt-5 text-indigo-800">This is my <span className="text-lg text-green-400"> MERN stack Blog Application</span>. If you like it thumps up. You can sign up with your email.</p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your user name :" />
              <TextInput 
              type="text"
              placeholder="user name"
              id="username"
             onChange={handleChange} />
            </div>
            <div>
              <Label value="Your Email :" />
              <TextInput 
              type="email"
              placeholder="user@gmail.com"
              id="email"
              onChange={handleChange}/>
            </div>
            <div>
              <Label value="Your password" />
              <TextInput 
              type="password"
              placeholder="user password :"
              id="password"
              onChange={handleChange}/>
            </div>
            <Button gradientDuoTone='purpleToPink' type="submit" disabled={loading}>
              {loading?(
              <>
              <Spinner size="sm"/>
              <span className="p-3">loading</span>
              </>):(
                 "Sign Up"
              )}
            </Button>
            <GAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>have an account?</span>
            <Link to='/sign-in' className="text-blue-500">Sign In</Link>
          </div>
          <div>
          {errorMessage &&(
            <Alert className="mt-4" color="failure">
               {errorMessage}
            </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp