
import { BrowserRouter, Routes, Route } from "react-router-dom"

// Styles
import "./styles/main.css"
import "./styles/utilities.css"
import "./styles/colors.css"

// Layouts
import Auth from "./pages/Auth"

// Components
import Login from "./pages/Auth/components/Login"
import Signup from "./pages/Auth/components/Signup"
import ResetPassword from "./pages/Auth/components/ResetPassword"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth/>}>
          <Route index element={<Login/>}/>
          <Route path="signup" element={<Signup/>}/>
          <Route path="reset-password" element={<ResetPassword/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
