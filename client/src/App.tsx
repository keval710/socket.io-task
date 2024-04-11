import './App.css'
import { io } from "socket.io-client";
import { Routes, Route } from 'react-router-dom'
import About from './components/About'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Home from './pages/Home'
import { ToastContainer } from 'react-toastify';

function App() {

  const socket = io("http://localhost:8000");

  socket.on("connect", () => {
    console.log(`Socket Id : ${socket.id}`);
  });

  return (
    <>
      
      <Routes>
        <Route path='/' element={<Signin socket={socket} />} />

        <Route path='/home' element={<Home socket={socket} />} />
        <Route path='/about' element={<About />} />
        {/* <Route path='/signin' element={<Signin />} /> */}
        <Route path='/signup' element={<Signup socket={socket} />} />
      </Routes >
    </>
  )
}

export default App
