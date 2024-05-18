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
