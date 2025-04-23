import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { HiOutlineUserGroup, HiArrowNarrowUp } from "react-icons/hi";


const DashBoardComponent = () => {
        const {currentUser}=useSelector(state=>state.user)
        const [users,setUsers]=useState([]);
        const [comments,setComments]=useState([]);
        const [posts,setPosts]=useState([]);
        const [tottalUsers,settottalUsers]=useState(0);
        const [tottalComments,settottalComments]=useState(0);
        const [tottalPosts,settottalPosts]=useState(0);
        const [lastMonthUsers,setLastMonthUsers]=useState(0);
        const [lastMonthComments,setLastMonthComments]=useState(0);
        const [lastMonthPosts,setLastMonthPosts]=useState(0);

        useEffect(()=>{
                
                        const fetchUsers=async ()=>{
                                try{
                                        const res=await fetch('/api/user/getUsers?limit=5');
                                        const data=await res.json();
                                        if(res.ok){
                                        setUsers(data.users);
                                        settottalUsers(data.totalUsers);
                                        setLastMonthUsers(data.lastMonthUsers);
                                }
                                }catch(error){
                                        console.log(error)
                                }
                        }
                        const fetchPosts=async ()=>{
                               try{
                                const res=await fetch('/api/post/getPosts?limit=5');
                                const data=await res.json();
                                if(res.ok){
                                        setPosts(data.posts);
                                        settottalPosts(data.tottalPost);
                                        setLastMonthPosts(data.lastMonthPosts);
                                } 
                               }catch(error){{
                                console.log(error)
                               }}  
                        }
                        const fetchComments=async ()=>{
                                try{
                                        const res=await fetch('/api/comment/getCommnts?limit=5');
                                        const data=await res.json();
                                        if(res.ok){
                                        setComments(data.Comments);
                                        settottalComments(data.tottalComments);
                                        setLastMonthComments(data.lastMonthComments);
                                } 
                                }catch(error){
                                        console.log(error)
                                }
                        }
                        if(currentUser.isAdmin){
                                fetchUsers(); 
                                fetchPosts();
                                fetchComments();     
                        }
                
        },[currentUser])

  return (
    <div>
        <div>
                <div className="flex flex-wrap mt-4 gap-4 ">
                        <div className="flex gap-4 border border-slate-400 p-2">
                                <div className="flex gap-4 items-center ">
                                <div>
                                <p className="text-gray-600 text-md uppercase">Total Users</p>
                                <p className="text-2xl">{tottalUsers}</p>
                                </div>
                                <HiOutlineUserGroup className="bg-teal-500 text-white mt-4"/>
                                </div>
                                <div className="gap-2">
                                     <span className="text-green-500 flex items-center"><HiArrowNarrowUp />
                                     {lastMonthUsers}
                                     </span> 
                                     <div className="font-bold text-cyan-600">Last Month</div> 
                                </div>
                        </div>


                        <div className="flex gap-24 border border-slate-400 p-2">
                                <div className="flex gap-4 items-center">
                                <div>
                                <p className="text-gray-600 text-md uppercase">Total Posts</p>
                                <p className="text-2xl">{tottalPosts}</p>
                                </div>
                                <HiOutlineUserGroup className="bg-teal-500 text-white mt-4"/>
                                </div>
                                <div className="gap-2">
                                     <span className="text-green-500 flex items-center"><HiArrowNarrowUp />
                                     {lastMonthPosts}
                                     </span> 
                                     <div className="font-bold text-cyan-600">Last Month</div> 
                                </div>
                        </div>


                        <div className="flex gap-24 border border-slate-400 p-2">
                                <div className="flex gap-4 items-center">
                                <div>
                                <p className="text-gray-600 text-md uppercase">Total Comments</p>
                                <p className="text-2xl">{tottalComments}</p>
                                </div>
                                <HiOutlineUserGroup className="bg-teal-500 text-white mt-4"/>
                                </div>
                                <div className="gap-2">
                                     <span className="text-green-500 flex items-center"><HiArrowNarrowUp />
                                     {lastMonthComments}
                                     </span> 
                                     <div className="font-bold text-cyan-600">Last Month</div> 
                                </div>
                        </div>
                </div>
        </div>
    </div>
  )
}

export default DashBoardComponent