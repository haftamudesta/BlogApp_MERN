import {Link} from "react-router-dom";
import { useState,useEffect } from "react";
import CallToAction from "../Components/CallToAction";
import PostCard from "../Components/PostCard"; 

const Home = () => {
  const [posts,setPosts]=useState([]);

  useEffect(()=>{
    const fetchPosts=async ()=>{
      const res=await fetch('/api/post/getPosts')
      const data=await res.json();
      if(res.ok){
        setPosts(data.posts)
      }
    }
    fetchPosts();
  },[])
  return (
    <div>
      <h1 className='font-bold text-rose-300 text-2xl text-center'>
        Hello, welcome to my Blog App
      </h1>
      <p className="text-xl text-orange-500">Profetionaly am full stack developer and electrical Engineer.
        In this blog app you will get enormous articles and lessons in diffent fields. 
      </p>
      <Link to='/search' className="text-teal-400 text-xl sm:text-sm ml-20 mb-8">View all posts</Link>
      <div className="p-3 bg-amber-100 dark:bg-slate-700">
      <CallToAction />
      </div>
      <div className=" flex flex-col max-w-6xl mx-auto p-3 py-8">
        {
          posts && posts.length > 0 &&(
            <div className="flex flex-col gap-4 ml-14">
              <h1 className="text-2xl font-semibold text-center">Recent Posts</h1>
              <div className="flex flex-wrap gap-12">
                {
                  posts.map((post)=>(
                    <PostCard key={post._id} post={post} />
                  ))
                }
              </div>
              <Link to='/search' className="text-2xl font-bold text-lime-500 text-center md:text-3xl ">
                <span className=" border-b-4">View all posts</span>
              </Link>
            </div>
            )
        }
      </div>
    </div>
  )
}

export default Home