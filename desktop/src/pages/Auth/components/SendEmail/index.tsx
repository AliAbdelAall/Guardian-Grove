import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Assets
import fullLogo from "../../../../assets/logo/full-logo.png";

// components
import LoginInput from "../../../../components/LoginInput";
import SmallButton from "../../../../components/SmallButton";

// Utilities
import { toast } from "react-toastify";
import { useSendRequest } from "../../../../core/tools/remote/request";
import { requestMethods } from "../../../../core/enums/requestMethods";

type error = {
	status: boolean;
	message: string;
};

const SendEmail = () => {
	const navigate = useNavigate();
	const sendRequest = useSendRequest();

	const [email, setEmail] = useState<string>("");

	const [error, setError] = useState<error>({
		status: false,
		message: "",
	});

	const handleInputChange = (value: string) => {
		setEmail(value);
		setError({ status: false, message: "" });
	};

	return (
		<div className="flex column align-center login-container">
			<img src={fullLogo} width={100} height={120} alt="logo" />

			<div className="flex column center input-wrapper">
				<div className="flex column center info-wrapper">
					<h3>Enter your email</h3>
					<p className="text-acient">
						A secret code will be sent to your email
					</p>
				</div>

				{error.status && (
					<p className="text-sm text-error">{error.message}</p>
				)}

				<LoginInput
					id={"email-input"}
					label={"email"}
					placeholder={"jhondoe@gmail.com"}
					handleChange={(e: any) => handleInputChange(e.target.value)}
				/>
			</div>

			<div className="flex column center full-width login-wrapper">
				<SmallButton text={"Next"} handleClick={handleSendEmail} />
			</div>
		</div>
	);
};

export default SendEmail;
