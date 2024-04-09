import './App.css'
import { Routes, Route } from 'react-router-dom'
// import NavigationBar from './components/NavigationBar'
import About from './components/About'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Home from './pages/Home'
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Signin />} />

        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<About />} />
        {/* <Route path='/signin' element={<Signin />} /> */}
        <Route path='/signup' element={<Signup />} />
      </Routes >
    </>
  )
}

export default App
