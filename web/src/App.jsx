
import { BrowserRouter, Routes, Route } from "react-router-dom"

// Styles
import "./styles/main.css"
import "./styles/utilities.css"
import "./styles/colors.css"

// taostify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layouts
import Auth from "./pages/Auth"
import Main from "./pages/Main";

// Components
import Login from "./pages/Auth/components/Login"
import Signup from "./pages/Auth/components/Signup"
import ResetPassword from "./pages/Auth/components/ResetPassword"
import SendEmail from "./pages/Auth/components/SendEmail"
import VerifyOTP from "./pages/Auth/components/VerifyOTP"
import Clients from "./pages/Main/components/Clients";


function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route path="/" element={<Auth/>}>
          <Route index element={<Login/>}/>
          <Route path="signup" element={<Signup/>}/>
          <Route path="send-email" element={<SendEmail/>}/>
          <Route path="verify-otp" element={<VerifyOTP/>}/>
          <Route path="reset-password" element={<ResetPassword/>}/>
        </Route>
        <Route path="/main" element={<Main/>}>
          <Route index element={<Clients/>}/>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
