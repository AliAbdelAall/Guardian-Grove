import { FC } from "react";

// Styles
import "./style.css";

type props = {
	text: string;
	handleClick: () => void;
};
const LoginButton: FC<props> = ({ text, handleClick }) => {
	return (
		<button className="login-btn  white bg-primary" onClick={handleClick}>
			{text}
		</button>
	);
};

export default LoginButton;
