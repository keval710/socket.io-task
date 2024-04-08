import './App.css'
import { Routes, Route } from 'react-router-dom'
import NavigationBar from './components/NavigationBar'
import Home from './components/Home'
import About from './components/About'
import Signup from './components/Signup'
import Signin from './components/Signin'
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<NavigationBar />}>
          <Route element={<Home />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/signin' element={<Signin />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
