import { BrowserRouter, Routes, Route } from "react-router-dom";

// Styles
import "./styles/main.css";
import "./styles/utilities.css";
import "./styles/colors.css";

// Taostify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Redux
import { Provider } from "react-redux";
import { store } from "./core/redux/store";

// Layouts
import Auth from "./pages/Auth";

// Components
import Login from "./pages/Auth/components/Login";
import SendEmail from "./pages/Auth/components/SendEmail";
import VerifyOTP from "./pages/Auth/components/VerifyOTP";
import ResetPassword from "./pages/Auth/components/ResetPassword";
import Main from "./pages/Main";
import Overview from "./pages/Main/components/Overview";

const App = () => {
	return (
		<Provider store={store}>
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
						<Route
							path="reset-password"
							element={<ResetPassword />}
						/>
					</Route>

					<Route path="/main/" element={<Main />}>
						<Route path="overview" element={<Overview />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</Provider>
	);
};

export default App;
