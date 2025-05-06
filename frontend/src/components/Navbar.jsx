import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { Search, LogOut, Menu } from "lucide-react"
import { useAuthUser } from "../store/authUser"
import { useContentStore } from '../store/content'

const Navbar = () => {
  
  const {user, logout} = useAuthUser();
  const {setContentType} = useContentStore();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className='max-w-7xl mx-auto flex flex-wrap items-center justify-between p-4 h-20'>
      <div className='flex items-center gap-10 z-50'>
        <Link to={"/"}>
          <img 
            src='/netflix-logo.png' 
            alt='Netflix Logo' 
            className='w-32 sm:w-40' 
          />
        </Link>

        {/* desktop navbar items  */} 
        <div className='hidden sm:flex gap-2 items-center'>
          <Link 
            to={"/"} 
            className='hover:underline' 
            onClick={() => setContentType("movie")}
          >
            Movies
          </Link>

          <Link 
            to={"/"} 
            className='hover:underline' 
            onClick={() => setContentType("tv")}
          >
            TV Shows
          </Link>
          
          <Link 
            to={"/history"} 
            className='hover:underline'
          >
            Search History
          </Link>
        </div>
      </div>

      <div className='flex gap-2 items-center z-50'>

        <Link to={"/search"}>
          <Search className="size-6 cursor-pointer"/>
        </Link>

        <img 
          src={user.image} 
          alt='Avatar' 
          className='h-8 rounded cursor-pointer'
        />
        <LogOut className="size-6 cursor-pointer" onClick={logout}/>
        
        <div className='sm:hidden'>
					<Menu className='size-6 cursor-pointer' onClick={toggleMobileMenu} />
				</div>

      </div>

      {/* mobile navbar items  */}
      {isMobileMenuOpen && (
        <div className='w-full sm:hidden mt-4 z-50 bg-black border roudned border-gra-800'>
          <Link 
            to={"/"} 
            onClick={() => setContentType("movie")}
            className='block hover:underline p-2'
          >
            Movies
          </Link>

          <Link 
            to={"/"} 
            onClick={() => setContentType("tv")}
            className='block hover:underline p-2'
          >
            TV Shows
          </Link>

          <Link 
            to={"/history"} 
            className='block hover:underline p-2'
          >
            Search History
          </Link>
        </div>
      )}
    </div>
  )
}

export default Navbar