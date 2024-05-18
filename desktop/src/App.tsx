import { BrowserRouter, Routes, Route } from "react-router-dom";

// Styles
import "./styles/main.css";
import "./styles/utilities.css";
import "./styles/colors.css";

// Taostify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layouts
import Auth from "./pages/Auth";

// Components
import Login from "./pages/Auth/components/Login";
import SendEmail from "./pages/Auth/components/SendEmail";
import VerifyOTP from "./pages/Auth/components/VerifyOTP";

const App = () => {
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
				theme="light"
			/>
			<Routes>
				<Route path="/" element={<Auth />}>
					<Route index element={<Login />} />
					<Route path="send-email" element={<SendEmail />} />
					<Route path="verify-otp" element={<VerifyOTP />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
