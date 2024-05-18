import { FC } from "react";

// Styles
import "./style.css";
type props = {
	text: string;
	handleClick: () => void;
};

const SmallButton: FC<props> = ({ text, handleClick }) => {
	return (
		<div className="flex justify-end full-width">
			<button
				className="small-btn text-regular white bg-primary"
				onClick={handleClick}
			>
				{text}
			</button>
		</div>
	);
};

export default SmallButton;
