import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Home from './pages/Home'
import ShowListing from './pages/ShowListing'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import NewListing from './pages/NewListing'
import Footer from './components/Footer'
import Login from './pages/Login'
import Signup from './pages/Signup'
import EditListing from './pages/EditListing'
import { ToastContainer, toast } from 'react-toastify';
  

function App() {

  return (

    <BrowserRouter>
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <main className='flex-grow'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/listings/:id' element={<ShowListing />} />
        <Route path='/listings/new' element={<NewListing/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/listings/edit/:id' element={<EditListing/>}/>
      </Routes>
      </main>
      <Footer/>
       <ToastContainer />
      </div>
    </BrowserRouter>
  )
}

export default App
