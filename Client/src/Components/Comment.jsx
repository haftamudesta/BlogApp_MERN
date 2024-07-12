import { useEffect, useState } from "react"
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { MdEdit,MdDeleteForever } from "react-icons/md";
import { useSelector } from "react-redux";
import {Button, Textarea } from "flowbite-react";

const Comment = ({comment,whenLiked,onEdit,onDelete}) => {
        const [user,setUser]=useState({});
        const {currentUser}=useSelector(state=>state.user);
        const [isEditing,setIsediting]=useState(false);
        const [editedContent,setEditedContent]=useState(comment.content);
        useEffect(()=>{
                const getUser=async ()=>{
                        try{
                                const res=await fetch(`/api/user/${comment.userId}`);
                                const data=await res.json();
                                if(res.ok){
                                        setUser(data)
                                }
                        }catch(error){
                                console.log(error.message);
                        }
                }
                getUser();
        },[comment])
        const handleEditComment =  ()=>{
                setIsediting(true);
                setEditedContent(comment.content);
        }
        const handleSave=async ()=>{
                try{
                        const res=await fetch(`/api/comment/editComment/${comment._id}`,{
                                method: 'PUT',
                                headers:{
                                'Content-Type': 'application/json',
                                 },
                                 body:JSON.stringify({
                                        content:editedContent 
                                }),
                        });
                        if(res.ok){
                                setIsediting(false);
                                onEdit(comment,editedContent);
                        }
                }catch(error){
                        console.log(error)
                }
        }

        // const handleDeleteComment=async ()=>{

        // }
  return (
    <div className="flex mb-4 ">
        <div className="w-10 h-10 rounded-full ">
                <img className="mt-2" 
                src={user.profilePicture} 
                alt={user.username} />
        </div>
        <div>
                <div className="flex flex-1 items-center mb-2 ml-4">
                        <span className="font-bold mr-1 text-xs truncate">{user? `@${user.username}`:'Anonmous user'}</span>
                        <span className="text-gray-400 text-xs">{moment(comment.createdAt).fromNow()}</span>
                </div>
                {isEditing?(
                        <>
                        <Textarea
                        className="mb-2"
                        value={editedContent}
                        onChange={(e)=>setEditedContent(e.target.value)}
                        />
                        <div className="flex justify-end text-sm">
                                <Button
                                type="button"
                                size="sm"
                                gradientDuoTone="purpleToPink"
                                onClick={handleSave}
                                >
                                        Save
                                </Button>
                                <Button
                                type="button"
                                size="sm"
                                outline
                                gradientDuoTone="blueToPink"
                                onClick={()=>setIsediting(false)}
                                >
                                        Cancel
                                </Button>
                        </div>
                        </>
                ):(
                        <div className="ml-4  ">
                        <p className="text-gray-200 mb-3">{comment.content}</p>
                        <div className="flex items-center pt-2">
                                <button type="button" onClick={()=>whenLiked(comment._id)} className={`text-gray-500 hover:text-cyan-600 ${currentUser &&comment.likes.includes(currentUser._id) && '!text-blue-600'}`}>
                                        <FaThumbsUp className="text-sm"/>
                                </button>
                                <p className="text-gray-600 font-bold ml-2">
                                        {comment.numberOfLikes >0 && comment.numberOfLikes + " "+ (comment.numberOfLikes===1? 'like':'likes')}
                                </p>
                                {currentUser && (currentUser._id===currentUser.userId || currentUser.isAdmin)&&(
                                        <div className="flex items-center ml-4 p-1 text-teal-400 ">
                                                
                                                <button type="button" 
                                                className="flex items-center hover:text-cyan-950" 
                                                onClick={handleEditComment}>
                                                <MdEdit />
                                                Edit
                                                </button>
                                                <button type="button" 
                                                className="flex items-center ml-2 hover:text-red-600" 
                                                onClick={()=>onDelete(comment._id)}>
                                                <MdDeleteForever />
                                                Delete
                                                </button>
                                        </div>
                                        
                                )}
                        </div>
                </div>

                )}
                

        </div>
    </div>
  )
}

export default Comment