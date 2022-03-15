import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import Profile from "./pages/profile/Profile"
import Register from "./pages/register/Register"
import Messanger from "./pages/messanger/Messanger"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "./context/UserContext"

function App() {
  const { user } = useContext(AuthContext)

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={user ? <Home /> : <Register />} /> 
        <Route path='/login' element={user ? <Navigate to='/' /> : <Login />}/>
        <Route path='/register' element={user ? <Navigate to='/' /> : <Register />}/>
        <Route path='/messanger' element={!user ? <Navigate to='/' /> : <Messanger />}/>
        <Route path='/profile/:username' element={<Profile />} />
      </Routes>
    </Router>
  )

}

export default App;
