import { FC } from "react";

// Styles
import "./style.css";
type props = {
	id: string;
	label: string;
	placeholder: string;
	type?: string;
	handleChange: (e: any) => void;
};
const LoginInput: FC<props> = ({
	id,
	label,
	placeholder,
	handleChange,
	type = "text",
}) => {
	return (
		<div className="flex column login-input">
			<label className="font-medium" htmlFor={`${id}`}>
				{label}
			</label>
			<input
				className="font-light"
				type={type}
				id={`${id}`}
				placeholder={placeholder}
				onChange={handleChange}
			/>
		</div>
	);
};

export default LoginInput;
