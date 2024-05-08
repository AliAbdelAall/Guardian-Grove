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
import Main from "./pages/Main";

// Components
import Login from "./pages/Auth/components/Login";
import Signup from "./pages/Auth/components/Signup";
import ResetPassword from "./pages/Auth/components/ResetPassword";
import SendEmail from "./pages/Auth/components/SendEmail";
import VerifyOTP from "./pages/Auth/components/VerifyOTP";
import Clients from "./pages/Main/components/Clients";
import Students from "./pages/Main/components/Students";
import Profile from "./pages/Main/components/Profile";
import NotFound from "./pages/Main/components/NotFound/index ";
import ProtectedRoutes from "./core/routes/ProtectedRoutes";
import TeacherLayout from "./pages/Main/TeacherLayout";
import PsychologistLayout from "./pages/Main/PsychologistLayout";

function App() {
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
					theme="dark"
				/>
				<Routes>
					<Route path="/" element={<Auth />}>
						<Route index element={<Login />} />
						<Route path="signup" element={<Signup />} />
						<Route path="send-email" element={<SendEmail />} />
						<Route path="verify-otp" element={<VerifyOTP />} />
						<Route
							path="reset-password"
							element={<ResetPassword />}
						/>
					</Route>
					<Route path="/main/" element={<Main />}>
						<Route
							path={"teacher"}
							element={
								<ProtectedRoutes role={2}>
									<TeacherLayout />
								</ProtectedRoutes>
							}
						>
							<Route index element={<Students />} />
							<Route path="reports" element={<Students />} />
							<Route path="chat" element={<Students />} />
							<Route path="profile" element={<Profile />} />
							<Route path="*" element={<NotFound />} />
						</Route>

						<Route
							path={"psychologist"}
							element={
								<ProtectedRoutes role={3}>
									<PsychologistLayout />
								</ProtectedRoutes>
							}
						>
							<Route index element={<Clients />} />
							<Route path="schedules" element={<Clients />} />
							<Route path="chat" element={<Clients />} />
							<Route path="feedback" element={<Clients />} />
							<Route path="profile" element={<Profile />} />
							<Route path="*" element={<NotFound />} />
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
