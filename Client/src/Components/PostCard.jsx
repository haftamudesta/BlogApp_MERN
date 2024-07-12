import { Link } from "react-router-dom"

const PostCard = ({post}) => {
  return (
    <div className="group relative w-full border h-[400px] overflow-hidden gap-2 rounded-lg sm:w-[430px] mb-4 border-teal-600 hover:border-3">
        <Link to={`/post/${post.slung}`}>
                <img src={post.image} alt="post image" className="h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300" />
        </Link>
        <div className="p-4 flex flex-col gap-2 ">
                <p className="text-lg font-bold line-clamp-2">{post.title}</p>
                <span className="italic text-sm">{post.category}</span>
                <Link to={`/post/${post.slung}`} className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 text-center py-2 hover:text-white transition-all duration-300 rounded-md !rounded-tl-none m-2">Read More</Link>
        </div>
    </div>
  )
}

export default PostCard