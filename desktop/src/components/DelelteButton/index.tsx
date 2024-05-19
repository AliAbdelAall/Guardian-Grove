import { FC } from "react";
import "./style.css";

type props = {
	handleClick: () => void;
};
const DeleteButton: FC<props> = ({ handleClick }) => {
	return (
		<button
			className="delete-button no-bor no-outln white font-medium"
			onClick={handleClick}
		>
			Delete
		</button>
	);
};

export default DeleteButton;
