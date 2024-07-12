import { useEffect,useState } from "react";
import { useLocation } from "react-router-dom";
import DashSideBar from "../Components/DashSideBar";
import DashProfile from "../Components/DashProfile";
import DashPosts from "../Components/DashPosts";
import DashUsers from "../Components/DashUsers";
import DashComments from "../Components/DashComments";
import DashBoardComponent from "../Components/DashBoardComponent";

const DashBoard = () => {
  const location=useLocation();
  const [tab,setTab]=useState();
  useEffect(()=>{
    const urlParams=new URLSearchParams(location.search);
    const tabFromUrl=urlParams.get('tab');
    if(tabFromUrl){
      setTab(tabFromUrl);
    }
  },[location.search])
  return (
    <div className="min-h-screen flex flex-col md:flex-row md:w-56">
      <div>
        <DashSideBar />
      </div>
      {tab==='profile' && <DashProfile />}
      {tab==='posts' && <DashPosts />}
      {tab==='users' && <DashUsers />}
      {tab==='comments' && <DashComments />}
      {tab==='dashboard' && <DashBoardComponent />}
    </div>
  )
}

export default DashBoard