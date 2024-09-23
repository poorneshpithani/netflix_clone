import { Navigate, Route, Routes } from "react-router-dom"
import HomePage from "./pages/home/HomePage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import Footer from "./components/Footer"
import { Toaster } from "react-hot-toast"
import { userAuthStore } from "./store/authUser"
import { useEffect } from "react"
import { Loader } from "lucide-react"
import WatchPage from "./pages/WatchPage"
import SearchPage from "./pages/SearchPage"
import HistoryPage from "./pages/HistoryPage"
import NotFoundPage from "./pages/404page"

function App() {

  const {user, isCheckingAuth,authCheck} = userAuthStore()
  console.log("auth user is ", user)

  useEffect(()=>{
    authCheck();
  },[authCheck])

  if(isCheckingAuth){
    return(
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className="animate-spin text-red-600 size-10" />
        </div>
      </div>
    )
  }
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/login" element={!user ? <LoginPage/> : <Navigate to={"/"} />} />
      <Route path="/signup" element={!user ? <SignUpPage/> : <Navigate to={"/"} />} />

      <Route path="/watch/:id" element={user ? <WatchPage/> : <Navigate to={"/login"} />} />
      <Route path="/search" element={user ? <SearchPage/> : <Navigate to={"/login"} />} />
      <Route path="/history" element={user ? <HistoryPage/> : <Navigate to={"/login"} />} />

      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
    <Footer />
    <Toaster />
    </>
  )
}

export default App