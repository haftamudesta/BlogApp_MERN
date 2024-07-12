import { Table,Button,Modal } from "flowbite-react";
import { useEffect,useState} from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import {FaCheck,FaTimes} from "react-icons/fa"
const DashComments = () => {
        const {currentUser}=useSelector(state=>state.user);
        const [comments,setComments]=useState([]);
        const [showMore,setShowMore]=useState(true);
        const [showModal,setShowModal]=useState(false);
        const [commentIdToDelete,setCommentIdToDelete]=useState('');
        console.log("comments",comments)
        useEffect(()=>{
                const fetchComments=async ()=>{
                        try{
                                const res=await fetch('/api/comment/getCommnts');
                                const data=await res.json();
                                console.log("comment data",data)
                                if(res.ok){
                                        setComments(data);
                                        if(data.comments.length<9){
                                                setShowMore(false);
                                        }
                                }
                        }catch(error){
                                
                        }
                }
                if(currentUser.isAdmin){
                        fetchComments();  
                }
        },[currentUser._id]) 
        
        const handleShowMore =async()=>{
            const startIndex=comments.length;
            try{
                const res=await fetch(`/api/comment/getCommnts`);
                const data=await res.json();
                if(res.ok){
                        setComments((prev)=>[...prev,...data.comments]);
                        if(data.comments.length<9){
                                setShowMore(false);
                        }
                }
            }catch(error){

            }   
        }

        const handleDeleteComments =async  ()=>{
                setShowModal(false);
                try{
                        const res=await fetch(`/api/comment/deleteComment/${commentIdToDelete}`,{
                                method:'DELETE'
                        });
                        const data=res.json();
                        if(!res.ok){
                                console.log(data)
                        }else{
                                setComments((prev)=>{
                                prev.filter((user)=>user._id!==userIdToDelete)
                                })
                        }
                }catch(error){
                        console.log(error);
                }
        }
  return (
        //scrollbar scrollbar-track-slate-700 scrollbar-thumb-slate-400
    <div className="table-auto p-3 ">
        {currentUser.isAdmin && comments.length > 0?(
                <div>
                <Table hoverable className="shadow-md">
                        <Table.Head>
                                <Table.HeadCell>Date Created</Table.HeadCell>
                                <Table.HeadCell>Comment Content</Table.HeadCell>
                                <Table.HeadCell> Number of Likes</Table.HeadCell>
                                <Table.HeadCell>Post Id</Table.HeadCell>
                                <Table.HeadCell>User Id</Table.HeadCell>
                                <Table.HeadCell>
                                   Delete     
                                </Table.HeadCell>
                                </Table.Head>
                                {comments.map((comment)=>(
                                        <Table.Body className="divide-y" key={comment._id}>
                                                <Table.Row>
                                                <Table.Cell>
                                                {new Date(comment.createdAt).toLocaleDateString()}
                                                </Table.Cell>
                                                 <Table.Cell>
                                                        {comment.content}
                                                </Table.Cell>
                                                <Table.Cell>
                                                {comment.numberOfLikes}
                                                </Table.Cell>
                                                <Table.Cell>
                                                {comment.postId}
                                                </Table.Cell>
                                                <Table.Cell>
                                                {comment.userId}
                                                </Table.Cell>
                                                <Table.Cell>
                                                <span className="font-medium text-red-700 hover:underline-offset-0 cursor-pointer" onClick={()=>{
                                                        setShowModal(true)
                                                        setCommentIdToDelete(comment._id)
                                                }}>
                                                        Delete
                                                </span>
                                                </Table.Cell>
                                                </Table.Row>
                                                </Table.Body>
                                        ))}
                                
                        </Table>
                        {showMore && (
                                <button onClick={handleShowMore} className="w-full text-teal-600 self-center mt-2">
                                        Show More
                                </button>
                        )}
                </div>
        ):
        (
                <h1>there is no any comment  yet</h1>
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
                        <p className="mb-5 text-gray-500 dark:text-gray-400 text-lg">Are you sure you want to delete this user!</p>
                        <div className="flex justify-between">
                                <Button color="failure" onClick={handleDeleteComments}>
                                        Yes
                                </Button>
                                <Button onClick={()=>setShowModal(false)}>Cancel</Button>
                        </div>
                </Modal.Body>
        </Modal>
    </div>
  )
}

export default DashComments