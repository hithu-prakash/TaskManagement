import { BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Home from "./components/Homee";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <BrowserRouter>
    <div>
      <h1>Task Management</h1>
      <Link to="/">Home</Link> | <Link to="/register">SignUp</Link> | <Link to="/login">SignIn</Link>
    </div>

    <Routes>
      <Route path = "/" element={<Home />} />
      <Route path = "/register" element={<Register />} />
      <Route path = "/login" element={<Login />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;
