
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Projects from './pages/Projects';
import DashBoard from './pages/DashBoard';
import NavBar from './Components/NavBar';
import FooterComponent from "./Components/FooterComponent";
import PrivateRoute from "./Components/PrivateRoute";
import AdminPrivateRoute from "./Components/AdminPrivateRoute";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import PostPage from "./Components/PostPage";
import ScrollToTop from "./Components/ScrollToTop";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <>
      <BrowserRouter>
      <ScrollToTop />
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/search' element={<SearchPage />} />
        <Route element={<PrivateRoute />}>
        <Route path='/dashboard' element={<DashBoard />} />
        </Route>
        <Route element={<AdminPrivateRoute />}>
        <Route path='/create-post' element={<CreatePost />} />
        <Route path='/update-post/:postId' element={<UpdatePost />} />
        </Route>
        <Route path='/projects' element={<Projects />} />
        <Route path='/post/:postSlug' element={<PostPage />} />
      </Routes>
      <FooterComponent />
      </BrowserRouter>
    </>
  )
}
export default App
