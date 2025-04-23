import { Button, Select, Spinner, TextInput } from 'flowbite-react'
import  { useState,useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import PostCard from '../Components/PostCard';

const SearchPage = () => {
        const [sidebarData,setSidebarData]=useState({
                searchTerm:'',
                sort:'decs',
                category:'uncategorized',
        });
        const [posts,setPosts]=useState([]);
        const [loading,setLoading]=useState(false);
        const [showMore,setShowMore]=useState(false);
        const location=useLocation();
        const navigate=useNavigate();

        useEffect(()=>{
                const urlParams=new URLSearchParams(location.search);
                const searchTermFromUrl=urlParams.get('searchTerm');
                const sortTermFromUrl=urlParams.get('sort');
                const categoryTermFromUrl=urlParams.get('category');
                if(searchTermFromUrl|| sortTermFromUrl ||categoryTermFromUrl){
                        setSidebarData({
                                ...sidebarData,
                                searchTerm:searchTermFromUrl,
                                sort:sortTermFromUrl,
                                category:categoryTermFromUrl,
                        })
                }
                const fetchPosts=async ()=>{
                        setLoading(true);
                        const searchQuery=urlParams.toString();
                        const res=await fetch(`/api/post/getPosts?${searchQuery}`);
                        if(!res.ok){
                                setLoading(false);
                                return;
                        }
                        if(res.ok){
                                const data=await res.json();
                                setPosts(data.posts);
                                setLoading(false);
                                if(data.posts.length===9){
                                        setShowMore(true);
                                }else{
                                        setShowMore(false);
                                }
                        }
                }
                fetchPosts();
        },[location.search]);

        const handleChange=(e)=>{
                if(e.target.id==='searchTerm'){
                        setSidebarData({...sidebarData,searchTerm:e.target.value})
                }
                if(e.target.id==='sort'){
                        const order=e.target.value || 'desc';
                        setSidebarData({...sidebarData,sort:order})
                }
                if(e.target.id==='category'){
                        const category=e.target.value || 'uncategorized';
                        setSidebarData({...sidebarData,category});
                }
        }

        const handleSubmit=(e)=>{
                e.preventDefault();
                const urlParams=new URLSearchParams(location.search);
                urlParams.set('searchTerm',sidebarData.searchTerm);
                urlParams.set('sort',sidebarData.sort);
                urlParams.set('category',sidebarData.category);
                const searchQuery=urlParams.toString();
                navigate(`/search?${searchQuery}`)  
        }

        const handleShowMore=async ()=>{
                const numberOfPosts=posts.length;
                const startIndex=numberOfPosts;
                const urlParams=new URLSearchParams(location.search);
                urlParams.set('startIndex',startIndex);
                const searchQuery=urlParams.toString();
                const res=await fetch(`api/post/getPosts?${searchQuery}`);
                if(res.ok){
                        return;
                }
                if(res.ok){
                        const data=await res.json();
                        setPosts([...posts,...data.posts])
                        if(data.posts.length===9){
                                setShowMore(true);
                        }else{
                                setShowMore(false);
                        }
                }
        }
  return (
    <div className='flex flex-col md:flex-row'>
        <div className='p-7 border-b md:border-r md:min-h-screen border-gray-400'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                        <div className='flex items-center gap-2'>
                                <label className='font-semibold whitespace-nowrap'>Search Term:</label>
                                <TextInput 
                                placeholder='Search ...'
                                id='searchTerm'
                                type='text'
                                value={sidebarData.searchTerm}
                                onChange={handleChange}
                                />
                        </div>
                        <div className='flex items-center gap-2'>
                                <label className='semi-bold'>sort:</label>
                                <Select onChange={handleChange}
                                value={sidebarData.sort}
                                id='sort'
                                >
                                        <option value="desc">latest</option>
                                        <option value="asc">oldest</option>
                                </Select>
                        </div>
                        <div className='flex items-center gap-2'>
                                <label className='semi-bold'>Category:</label>
                                <Select onChange={handleChange}
                                value={sidebarData.category}
                                id='category'
                                >
                                        <option value="uncategorized">Uncategorized</option>
                                        <option value="reactjs">React Js</option>
                                        <option value="ruby">Ruby On Rails</option>
                                        <option value="nodejs">Node Js</option>
                                        
                                </Select>
                        </div>
                        <Button type='submit' gradientDuoTone='purpleToBlue'>
                                Search Filter
                        </Button>
                </form>
        </div>
        <div className='w-full'>
                <h1 className='text-4xl border-b-2 border-x-green-900 p-3 mt-4'>Post Results</h1>
                <div className='flex flex-wrap p-5 gap-3'>
                        {!loading && posts.length ===0 &&(
                                <p>No post result was found</p>
                        )}
                        {loading&&(
                                <Spinner />
                        )}
                        {!loading&& posts&& posts.map((post)=>(
                                <PostCard key={post._id} post={post}/>
                        ))}
                        {
                                showMore && (
                                        <button onClick={handleShowMore} className='text-lg text-teal-800 hover:underline p-7 w-full'>Show More</button>
                                )
                        }
                </div>
        </div>
    </div>
  )
}

export default SearchPage