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
import Client from "./pages/Main/components/Client";
import Child from "./pages/Main/components/Child/index ";
import Schedules from "./pages/Main/components/Schedules/index ";
import Feedback from "./pages/Main/components/Feedback";
import Chat from "./pages/Main/components/Chat";

// Sockets
import io from "socket.io-client";

const socket = io.connect("http://localhost:3000");

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
					theme="light"
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
							<Route path="students">
								<Route index element={<Students />} />
								<Route path="student/:id" element={<Child />} />
							</Route>
							<Route path="school" element={<Students />} />
							<Route
								path="chat/:id"
								element={<Chat socket={socket} />}
							/>
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
							<Route path="clients/">
								<Route index element={<Clients />} />
								<Route path="client/:id" element={<Client />} />
								<Route path="child/:id" element={<Child />} />
							</Route>
							<Route path="schedules" element={<Schedules />} />
							<Route
								path="chat/:id"
								element={<Chat socket={socket} />}
							/>
							<Route path="feedback" element={<Feedback />} />
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
