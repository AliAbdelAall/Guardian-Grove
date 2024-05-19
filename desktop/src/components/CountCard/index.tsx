import { FC } from "react";
import "./style.css";
type props = {
	icon: string;
	count: number;
	group: string;
};

const CountCard: FC<props> = ({ icon, count, group }) => {
	return (
		<div className="flex row space-between count-card-wrapper">
			<img src={icon} alt="icon" />
			<div className="flex column align-end">
				<p className="text-acient">You have</p>
				<h1 className="text-primary">{count}</h1>
				<p className="text-acient">{group}</p>
			</div>
		</div>
	);
};

export default CountCard;
