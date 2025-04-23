import { Alert, Button,Textarea,Modal } from "flowbite-react";
import { useState,useEffect} from "react";
import { useSelector } from "react-redux"
import { Link,useNavigate} from "react-router-dom";
import {HiOutlineExclamationCircle} from "react-icons/hi"
import Comment from "./Comment";

const CommentSection = ({postId}) => {
        const {currentUser}=useSelector((state)=>state.user);
        const [comment,setComment]=useState('');
        const [commentError,setCommentError]=useState('');
        const [comments,setComments]=useState([]);
        const [showModal,setShowModal]=useState(false);
        const [commentToDelete,setCommentToDelete]=useState(null);
        const navigate=useNavigate();

        useEffect(()=>{
                getCooments();

        },[postId]);


        const getCooments=async ()=>{
                try{
                        const res=await fetch(`/api/comment/getCommnts/${postId}`);
                        const data=await res.json();
                        setComments(data);
                }catch(error){
                        console.log("error.message");
                }
        }

        const handleSubmit =async (event)=>{
                event.preventDefault();
                if(comment.length>200){
                        return;
                }
                try{
                        const res=await fetch('/api/comment/create',{
                                method: 'POST',
                                headers:{
                                'Content-Type': 'application/json',
                                },
                                body:JSON.stringify({
                                        content:comment,
                                        postId,
                                        userId:currentUser._id}),
                                });
                                const data=await res.json();
                                if(res.ok){
                                        setComment('');
                                        setCommentError('');
                                        setComments([data,...comments])
                                }
                }catch(error){
                        setCommentError(error.message)
                }
        }

       const handleLikeComments=async (commentId)=>{
        try{
                if(!currentUser){
                        navigate('/sign-in');
                        return;
                }
                const res=await fetch(`/api/comment/likeComment/${commentId}`,{
                        method:"PUT"
                });
                if(res.ok){
                        const data=await res.json();
                        console.log(data)
                        setComments(comments.map(comment=>(
                                comment._id===commentId ? {
                                        ...comment,
                                        likes:data.likes,
                                        numberOfLikes:data.likes.length,
                                }:comment
                        )))
                }
        }catch(error){
                console.log(error.message);
        }
       }


       const handleEdit=async (comment,editedContent)=>{
        setComments(comments.map(comm=>comm._id===comment._id?{...comm,content:editedContent}:comm))
       }
       const handleDelete =async (commentId)=>{
        setShowModal(false);
        try{
                if(!currentUser){
                        navigate('/sign-in');
                        return;
                }
                const res=await fetch(`/api/comment/deleteComment/${commentId}`,{
                        method: "DELETE",
                });
                
                if(res.ok){
                        const data=await res.json();
                        // comments.map(comment=>{
                        //         if(comment._id===commentId){
                        //                 setComments(
                        //                         comments.filter(comment=>comment._id!==commentId)
                        //                         )
                        //         }
                        // });
                        setComments(comments.filter(comment=>comment._id!==commentId))
                }
        }catch(error){
                console.log(error)
        }
       }
       
  return (
    <div>
        {currentUser?(
                <div className="flex flex-row items-center gap-2 my-2 text-sm text-gray-500">
                <p>Signed in as:</p>
                <img src={currentUser.profilePicture} alt="" className="w-5 h-5 object-cover rounded-full"/>
                <Link to='/dashboard?tab=profile' className="text-xs text-cyan-500 hover:underline">
                @{currentUser.username}
                </Link>
                </div>
        ):(
                <div>
                <p>You have to Sign in to comment</p>
                <Link to='/sign-in'>Sign In</Link>
                </div>
        ) }
        {currentUser && (
                <form onSubmit={handleSubmit} className="border border-teal-950 p-2">
                        <Textarea
                        placeholder="Add your comment"
                        rows='3'
                        maxLength='250'
                        onChange={(e)=>setComment(e.target.value)}
                        value={comment}
                        />
                        <div className="flex mt-3 align-middle ">
                                <p>{200-Number(comment.length)} characters left</p>
                                <Button outline 
                                gradientDuoTone='purpleToBlue' 
                                type="submit" className="ml-5">
                                   Submit
                                </Button>
                        </div>
                        
                        
                              {commentError && (
                                <Alert className="mt-3" color='failure'>
                              {commentError}
                              </Alert>
                              )}
                              
       
                        
                </form>
                 
        )}
        {comments.length===0 ?(
                        <p>No comments</p>
                ):(
                        <>
                        <div className="flex text-sm items-center gap-2 border-b-4 border-rose-500 mt-2 mb-2 pb-1">
                                <p>comments</p>
                                <div className="border border-gray-950 py-0.5 px-2 rounded-sm">
                                {comments.length}
                                </div>
                        </div> 
                        <div className=" border-b-4 border-rose-500 ">
                        {
                        comments.map((comment)=> (   
                                <Comment 
                                key={comment._id}
                                 comment={comment}
                                whenLiked={handleLikeComments}
                                onEdit={handleEdit}
                                onDelete={(commentId)=>{
                                        setShowModal(true);
                                        setCommentToDelete(commentId);
                                }}
                                />
                        ))}
                        </div> 
                        </>
                )} 
                <Modal
                 show={showModal}
                 onClose={()=>setShowModal(false)}
                popup
                size='md'
                >
                <Modal.Header />
                <Modal.Body>
                        <div className="text-center">
                                <HiOutlineExclamationCircle className="h-14 w-14 text-grat-400 dark:text-gray-200 mx-auto mb-4" />
                        </div>
                        <p className="mb-5 text-gray-500 dark:text-gray-400 text-lg">Are you sure you want to delete this comment!</p>
                        <div className="flex justify-between">
                                <Button color="failure" onClick={()=>handleDelete(commentToDelete)}>
                                        Yes
                                </Button>
                                <Button onClick={()=>setShowModal(false)}>Cancel</Button>
                        </div>
                </Modal.Body>
               </Modal>
    </div>
  )
}

export default CommentSection