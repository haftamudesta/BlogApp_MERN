import { Table,Button,Modal } from "flowbite-react";
import { useEffect,useState} from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import {FaCheck,FaTimes} from "react-icons/fa"
const DashUsers = () => {
        const {currentUser}=useSelector(state=>state.user);
        const [users,setUsers]=useState([]);
        const [showMore,setShowMore]=useState(true);
        const [showModal,setShowModal]=useState(false);
        const [userIdToDelete,setUserIdToDelete]=useState('');
        
        useEffect(()=>{
                const fetchUsers=async ()=>{
                        try{
                                const res=await fetch('/api/user/getUsers');
                                const data=await res.json();
                                if(res.ok){
                                        setUsers(data.users);
                                        if(data.users.length<9){
                                                setShowMore(false);
                                        }
                                }
                        }catch(error){
                                console.log(error.message)  
                        }
                }
                if(currentUser.isAdmin){
                        fetchUsers();  
                }
        },[currentUser._id,currentUser.isAdmin]) 
        
        const handleShowMore =async()=>{
            const startIndex=users.length;
            try{
                const res=await fetch(`/api/user/getUsers?startIndex=${startIndex}`);
                const data=await res.json();
                if(res.ok){
                        setUsers((prev)=>[...prev,...data.users]);
                        if(data.users.length<9){
                                setShowMore(false);
                        }
                }
            }catch(error){
                console.log(error.message)
            }   
        }

        const handleDeleteUser =async  ()=>{
                setShowModal(false);
                try{
                        const res=await fetch(`/api/user/delete/${userIdToDelete}`,{
                                method:'DELETE'
                        });
                        const data=res.json();
                        if(!res.ok){
                                console.log(data)
                        }else{
                                setUsers((prev)=>{
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
        {currentUser.isAdmin && users.length > 0?(
                <div>
                <Table hoverable className="shadow-md">
                        <Table.Head>
                                <Table.HeadCell>Date Created</Table.HeadCell>
                                <Table.HeadCell>User Image</Table.HeadCell>
                                <Table.HeadCell>User Name</Table.HeadCell>
                                <Table.HeadCell>email</Table.HeadCell>
                                <Table.HeadCell>Admin</Table.HeadCell>
                                <Table.HeadCell>
                                   Delete     
                                </Table.HeadCell>
                                </Table.Head>
                                {users.map((user)=>(
                                        <Table.Body className="divide-y" key={user._id}>
                                                <Table.Row>
                                                <Table.Cell>
                                                {new Date(user.createdAt).toLocaleDateString()}
                                                </Table.Cell>
                                                 <Table.Cell>
                                               
                                                <img src={user.profilePicture} alt={user.username}className="w-10 h-10 object-cover bg-gray-500 rounded-full" />
                                                
                                                </Table.Cell>
                                                <Table.Cell>
                                                {user.username}
                                                </Table.Cell>
                                                <Table.Cell>
                                                {user.email}
                                                </Table.Cell>
                                                <Table.Cell>
                                                {user.isAdmin?<FaCheck className="text-green-500" />:<FaTimes className="text-red-600"/>}
                                                </Table.Cell>
                                                <Table.Cell>
                                                <span className="font-medium text-red-700 hover:underline-offset-0 cursor-pointer" onClick={()=>{
                                                        setShowModal(true)
                                                        setUserIdToDelete(user._id)
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
                <h1>there is no any user  yet</h1>
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
                                <Button color="failure" onClick={handleDeleteUser}>
                                        Yes
                                </Button>
                                <Button onClick={()=>setShowModal(false)}>Cancel</Button>
                        </div>
                </Modal.Body>
        </Modal>
    </div>
  )
}


export default DashUsers