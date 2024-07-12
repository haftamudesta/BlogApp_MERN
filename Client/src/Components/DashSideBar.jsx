import { useEffect,useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sidebar, SidebarItemGroup } from 'flowbite-react'
import { HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiUser } from 'react-icons/hi';
import { useDispatch ,useSelector} from "react-redux";
import { signoutSuccess } from "../redux/user/UserSlice";

const DashSideBar = () => {
        const location=useLocation();
        const {currentUser}=useSelector((state)=>state.user);
        const dispatch=useDispatch();

  const [tab,setTab]=useState();
  useEffect(()=>{
    const urlParams=new URLSearchParams(location.search);
    const tabFromUrl=urlParams.get('tab');
    if(tabFromUrl){
      setTab(tabFromUrl);
    }
  },[location.search])
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
                createNextState(error.message)
        }
     }
  return (
    <Sidebar className="w-full md:w-56">
        <Sidebar.Items>
                <Sidebar.ItemGroup>
                       <Link to={'/dashboard?tab=dashboard'}>
                        <Sidebar.Item 
                        active={tab==='dashboard' ||!tab} 
                        icon={HiUser} 
                        label={currentUser.isAdmin?'Amin':'User'} 
                        labelColor='dark'
                        as ='div'>
                                Dashboard
                        </Sidebar.Item>
                        </Link>
                        <Link to={'/dashboard?tab=profile'}>
                        <Sidebar.Item 
                        active={tab==='profile'} 
                        icon={HiUser} 
                        label={currentUser.isAdmin?'Amin':'User'} 
                        labelColor='dark'
                        as ='div'>
                                Profile
                        </Sidebar.Item>
                        </Link>
                        <Link to='/dashboard?tab=posts'>
                                <Sidebar.Item 
                                active ={tab==="posts"}
                                icon={HiDocumentText}
                                as ='div'
                                >
                                        posts
                                </Sidebar.Item>
                        </Link>
                         {currentUser.isAdmin&&(

                       
                       <Link to='/dashboard?tab=users'>
                             <Sidebar.Item 
                             active ={tab==="users"}
                        icon={HiOutlineUserGroup}
                             as ='div'
                             >
                            users
                            </Sidebar.Item>
                        </Link>
                        )}
                        <Link to='/dashboard?tab=comments'>
                             <Sidebar.Item 
                             active ={tab==="comments"}
                        icon={HiOutlineUserGroup}
                             as ='div'
                             >
                            commentss
                            </Sidebar.Item>
                        </Link>

                        <Sidebar.Item onClick={handleSignOut}  icon={HiArrowSmRight} >
                                Sign Out
                        </Sidebar.Item>
                </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSideBar