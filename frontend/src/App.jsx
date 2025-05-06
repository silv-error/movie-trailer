import { Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { useEffect } from "react"
import { Loader } from "lucide-react"

import { useAuthUser } from "./store/authUser.js"
import Footer from "./components/Footer.jsx"

import HomePage from "./pages/home/HomePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import WatchPage from "./pages/WatchPage.jsx"
import SearchPage from "./pages/SearchPage.jsx"
import SearchHistoryPage from "./pages/SearchHistoryPage.jsx"
import NotFoundPage from "./pages/NotFoundPage.jsx"

function App() {
  const {user, isLoadingAuthCheck, authCheck} = useAuthUser();
  
  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if(isLoadingAuthCheck) {
    return <div className="h-screen">
      <div className="flex justify-center items-center bg-black h-full">
        <Loader className="animate-spin text-red-600 size-10"/>
      </div>
    </div>
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={"/"} />}/>
        <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to={"/"} />}/>
        <Route path="/watch/:id" element={user ? <WatchPage /> : <Navigate to={"/login"} />}/>
        <Route path="/search" element={user ? <SearchPage /> : <Navigate to={"/login"} />}/>
        <Route path="/history" element={user ? <SearchHistoryPage /> : <Navigate to={"/login"} />}/>
        <Route path="/*" element={<NotFoundPage />}/>
      </Routes>
      <Footer />
      <Toaster />
    </>
  )
}

export default App
