import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../redux/authSlice';
import { useSelector, useDispatch } from 'react-redux'

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, token } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <nav className='p-5 sticky top-0 bg-white border-b flex justify-between'>
      <div className='flex gap-4 items-center'>
        <Link><i className="fa-regular fa-compass text-[#fe424d] text-3xl" to='/listings' /></Link>
        <Link to='/' className='text-[15px] md:text-[20px] text-black '>Explore</Link>

      </div>
      <div className='flex items-center gap-4'>
        {token ? (
          <>
            <Link to='/listings/new' className='text-[15px] md:text-[20px] text-black'>Add New Listings</Link>
            <button onClick={handleLogout} className='text-[15px] md:text-[20px] text-black'>Logout</button>

          </>
        ) : (
          <>

            <Link to='/login' className='text-[15px] md:text-[20px] text-black'>Login</Link>
            <Link to='/Signup' className='text-[15px] md:text-[20px] text-black'>Signup</Link>
          </>
        )}
      </div>
    </nav>
  )
}