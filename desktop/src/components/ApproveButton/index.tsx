import { FC } from "react";
import "./style.css";

type props = {
	handleClick: () => void;
};
const ApproveButton: FC<props> = ({ handleClick }) => {
	return (
		<button
			className="approve-button no-bor no-outln white font-medium"
			onClick={handleClick}
		>
			Approve
		</button>
	);
};

export default ApproveButton;
