import { Link, useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import { Button, Spinner } from "flowbite-react";
import CallToAction from "./CallToAction";
import CommentSection from "./CommentSection";
import PostCard from "./PostCard";

const PostPage = () => {
        const {postSlug}=useParams();
        const [loading,setLoading]=useState(true);
        const [error,setError]=useState(false);
        const [post,setPost]=useState();
        const [recentPosts,setRecentPosts]=useState(null);
  useEffect(()=>{
        fetchPosts(); 
  },[postSlug])
  const fetchPosts=async ()=>{
        try{
               setLoading(true);
               const res=await fetch(`/api/post/getPosts?slug=${postSlug}`);
               const data=await res.json();
               if(!res.ok){
                setLoading(false);
                setError(true);
                return;
               }else{
                setPost(data.posts[0]);
                setLoading(false);
                setError(false);
               }
               
        }catch(error){
                console.log(error)
        }
       }

       useEffect(()=>{
        fetchRecentPosts();      
       },[])

       const fetchRecentPosts=async ()=>{
        try{
                const res=await fetch(`/api/post/getPosts?limit=3`);
        const data=await res.json();
        if(res.ok){
                setRecentPosts(data.posts);
        }
        }catch(error){
                console.log(error)
        }
        
}
      
  //if(loading) return <div>Loading...</div>
  return (
        //<div>PostPage</div>
        <div>
                {loading?(
                        <div className="flex justify-center items-center min-h-screen">
                                <Spinner size='xl' />
                        </div>
                ):(
                        <main className="p-3 flex flex-col max-w-6xl mx-auto">
                                <h1 className="text-3xl mt-10 p-3 font-serif text-center max-w-2xl mx-auto lg:text-4xl">{post && post.title}
                                </h1>
                                <Link className="self-center mt-5" to={`/search?category=${post&& post.category}`}>
                                {post&& (<Button color="gray" pill size="xs">{post.category}</Button>)}
                                </Link>
                                <img src={post && post.image} alt={post && post.title} className="mt-10 p-3 max-h-[600px] w-full object-cover"/>
                                <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full ">
                                <span>
                                {post && new Date(post.createdAt).toLocaleDateString()}
                                </span>
                                <span>
                                {post && (post.content.length/1000).toFixed(0)} minuts read
                                </span>
                                </div>
                                <div className="p-3 max-w-2xl mx-auto w-full post-content" dangerouslySetInnerHTML={{__html:post && post.content}}>
                                </div>
                                <div>
                                  <CallToAction />
                                </div>
                                <CommentSection postId={post._id}/>
                                <div className="flex flex-col justify-center items-center mb-5">
                                        <h1 className="text-xl mt-5 mb-2">
                                                Recent Articles
                                        </h1>
                                        <div className="flex flex-wrap gap-5 justify-center mt-2">
                                        {recentPosts && recentPosts.map((post)=>(
                                           <PostCard key={post._id} post={post}/>
                                        ))
                                        }
                                        </div>
                                </div>
                        </main>
                )}
        </div>
  )
}

export default PostPage