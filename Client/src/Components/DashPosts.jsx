import { Table,Button,Modal } from "flowbite-react";
import { useEffect,useState} from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
const DashPosts = () => {
        const {currentUser}=useSelector(state=>state.user);
        const [userPosts,setUserPost]=useState([]);
        const [showMore,setShowMore]=useState(true);
        const [showModal,setShowModal]=useState(false);
        const [postIdToDelete,setPostIdToDelete]=useState('');
        
        useEffect(()=>{
                const fetchPosts=async ()=>{
                        try{
                                const res=await fetch(`/api/post/getPosts?userId=${currentUser._id}`);
                                const data=await res.json();
                                if(res.ok){
                                        setUserPost(data.posts);
                                        if(data.posts.length<9){
                                                setShowMore(false);
                                        }
                                }
                        }catch(error){
                                
                        }
                }
                if(currentUser.isAdmin){
                        fetchPosts();  
                }
        },[currentUser._id]) 
        
        const handleShowMore =async()=>{
            const startIndex=userPosts.length;
            try{
                const res=await fetch(`/api/post/getPosts?userId=${currentUser._id}&startIndex=${startIndex}`);
                const data=await res.json();
                if(res.ok){
                        setUserPost((prev)=>[...prev,...data.posts]);
                        if(data.posts.length<9){
                                setShowMore(false);
                        }
                }
            }catch(error){

            }   
        }
        const handleDeletePost =async  ()=>{
                setShowModal(false);
                try{
                        const res=await fetch(`/api/post/deletePost/${postIdToDelete}/${currentUser._id}`,{
                                method:'DELETE'
                        });
                        const data=res.json();
                        if(!res.ok){
                                console.log(data)
                        }else{
                                setUserPost((prev)=>{
                                prev.filter((post)=>post._id!==postIdToDelete)
                                })
                        }
                }catch(error){
                        console.log(error);
                }
        }
  return (
        //scrollbar scrollbar-track-slate-700 scrollbar-thumb-slate-400
    <div className="table-auto p-3 ">
        {currentUser.isAdmin && userPosts.length> 0 ?(
                <div>
                <Table hoverable className="shadow-md">
                        <Table.Head>
                                <Table.HeadCell>Data Updated</Table.HeadCell>
                                <Table.HeadCell>Post Image</Table.HeadCell>
                                <Table.HeadCell>Post Title</Table.HeadCell>
                                <Table.HeadCell>Category</Table.HeadCell>
                                <Table.HeadCell>
                                   Delete     
                                </Table.HeadCell>
                                <Table.HeadCell><span>Edit</span></Table.HeadCell>
                                </Table.Head>
                                {userPosts.map((post)=>(
                                        
                                        <Link to={`/post/${post.slug}`}>
                                        <Table.Body className="divide-y">
                                                <Table.Row>
                                                <Table.Cell>
                                                {new Date(post.updatedAt).toLocaleDateString()}
                                                </Table.Cell>
                                                 <Table.Cell>
                                                
                                                <img src={post.image} alt={post.title}className="w-20 h-10 object-cover bg-gray-500" />
                                                
                                                </Table.Cell>
                                                <Table.Cell>
                                                {post.title}
                                                </Table.Cell>
                                                <Table.Cell>
                                                {post.category}
                                                </Table.Cell>
                                                <Table.Cell>
                                                <span className="font-medium text-red-700 hover:underline-offset-0 cursor-pointer" onClick={()=>{
                                                        setShowModal(true)
                                                        setPostIdToDelete(post._id)
                                                }}>
                                                        Delete
                                                </span>
                                                </Table.Cell>
                                                <Table.Cell>
                                                <Link to={`/update-post/${post._id}`}>
                                                <span>Edit</span>
                                                </Link>
                                                </Table.Cell>
                                                </Table.Row>
                                                </Table.Body>
                                                </Link>
                                                
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
                <h1>You do not have any post yet</h1>
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
                        <p className="mb-5 text-gray-500 dark:text-gray-400 text-lg">Are you sure you want to delete this post!</p>
                        <div className="flex justify-between">
                                <Button color="failure" onClick={handleDeletePost}>
                                        Yes
                                </Button>
                                <Button onClick={()=>setShowModal(false)}>Cancel</Button>
                        </div>
                </Modal.Body>
        </Modal>
    </div>
  )
}

export default DashPosts