import { FC } from "react";

// Assets
import parentsIcon from "../../../../assets/icons/parent.svg";
import teachersIcon from "../../../../assets/icons/teacher.svg";
import psychologistsIcon from "../../../../assets/icons/psychologist.svg";
import BabyIcon from "../../../../assets/icons/baby.svg";
import kidIcon from "../../../../assets/icons/kid.svg";
import teenagerIcon from "../../../../assets/icons/teenager.svg";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../../../core/redux/store";

// Components
import CountCard from "../../../../components/CountCard";

const Overview: FC = () => {
	const childrenCount = useSelector(
		(global: RootState) => global.childrenCountSlice
	);
	const parents = useSelector((global: RootState) => global.parentsSlice);
	const psycologists = useSelector(
		(global: RootState) => global.psychologistsSlice
	);
	const teachers = useSelector((global: RootState) => global.teachersSlice);

	return (
		<div className="flex column overview-container">
			<h1 className="text-acient page-header">Overview</h1>
			<div className="flex wrap space-between count-wrapper">
				<CountCard
					icon={parentsIcon}
					count={parents.count}
					group="Parents"
				/>
				<CountCard
					icon={teachersIcon}
					count={teachers.count}
					group="Teachers"
				/>
				<CountCard
					icon={psychologistsIcon}
					count={psycologists.count}
					group="Psychologists"
				/>
				<CountCard
					icon={BabyIcon}
					count={childrenCount.age1_3}
					group="1y-3y"
				/>
				<CountCard
					icon={kidIcon}
					count={childrenCount.age3_6}
					group="3y-6y"
				/>
				<CountCard
					icon={teenagerIcon}
					count={childrenCount.age6_12}
					group="6y-12y"
				/>
				<CountCard
					icon={teenagerIcon}
					count={childrenCount.age12_18}
					group="12y-18y"
				/>
			</div>
		</div>
	);
};

export default Overview;
