import { useState } from "react";
import { useNavigate } from "react-router-dom";

// assets
import fullLogo from "../../../../assets/logo/full-logo.png";

// components
import LoginInput from "../../../../components/LoginInput";
import LoginButton from "../../../../components/LoginButton";

// Utilities
import { useSendRequest } from "../../../../core/tools/remote/request";
import { requestMethods } from "../../../../core/enums/requestMethods";
import { setLocalUser } from "../../../../core/tools/local/user";
import { AxiosError, AxiosResponse } from "axios";

type error = {
	status: boolean;
	message: string;
};

type credentials = {
	username: string;
	password: string;
};

const Login = () => {
	const navigate = useNavigate();
	const sendRequest = useSendRequest();

	const [credentials, setCredetials] = useState<credentials>({
		username: "",
		password: "",
	});

	const [error, setError] = useState<error>({
		status: false,
		message: "",
	});

	console.log(credentials);

	const handleInputChange = (value: string, field: string) => {
		setCredetials({ ...credentials, [field]: value });
		setError({ status: false, message: "" });
	};

	const handleLoginValidation = () => {
		const { username, password } = credentials;

		if (username.length < 3 || username.length > 20) {
			setError({
				...error,
				status: true,
				message: "Username must be 3->20 charachters",
			});
			return;
		}
		if (password.length < 8) {
			setError({
				...error,
				status: true,
				message: "Password must be at least 8 characters long",
			});
			return;
		}

		sendRequest(requestMethods.POST, "/api/auth/login", {
			...credentials,
		})
			.then((response: AxiosResponse) => {
				if (response.status === 200) {
					setLocalUser(response.data.token);
					console.log(response.data);
					navigate("/main");
				}
			})
			.catch((error: AxiosError) => {
				if (error.response?.status === 400) {
					setError({
						...error,
						status: true,
						message: error.response.statusText,
					});
				}
			});
	};

	return (
		<div className="flex column align-center login-container">
			<img src={fullLogo} width={100} height={120} alt="logo" />

			<div className="flex column input-wrapper">
				{error.status && (
					<p className="text-sm text-error">{error.message}</p>
				)}

				<LoginInput
					id={"username-input"}
					label={"Username"}
					placeholder={"JhonDoe"}
					handleChange={(e) =>
						handleInputChange(e.target.value, "username")
					}
				/>

				<LoginInput
					id={"password-input"}
					label={"Password"}
					placeholder={"********"}
					type={"password"}
					handleChange={(e) =>
						handleInputChange(e.target.value, "password")
					}
				/>

				<p
					className="text-acient font-medium"
					onClick={() => navigate("/send-email")}
				>
					Forgot password?
				</p>
			</div>

			<div className="flex column center full-width login-wrapper">
				<LoginButton
					text={"Log in"}
					handleClick={handleLoginValidation}
				/>
			</div>
		</div>
	);
};

export default Login;
