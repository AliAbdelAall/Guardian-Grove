import React from "react";
import "./style.css";

import InfoBar from "../../../../components/InfoBar";
import { useSelector } from "react-redux";
import { parentsSliceName } from "../../../../core/redux/parents";
import { childrenSliceName } from "../../../../core/redux/children";
import { schoolsSliceName } from "../../../../core/redux/shcools";
import { Link, useNavigate, useParams } from "react-router-dom";
import StudentCard from "../../../../components/StudentCard";
import SmallButton from "../../../../components/SmallButton";

const Client = () => {
	const { id } = useParams();

	const { parents } = useSelector((global) => global[parentsSliceName]);
	const { children } = useSelector((global) => global[childrenSliceName]);
	const { schools } = useSelector((global) => global[schoolsSliceName]);

	const navigate = useNavigate();

	const client = parents.find((parent) => parent.id == id);
	const clientChildren = children.filter(
		(child) => child.parentId === client.id
	);

	const calculateAge = (dateOfBirth) => {
		const dob = new Date(dateOfBirth);
		const currentDate = new Date();
		let ageDiff = currentDate - dob;
		let ageDate = new Date(ageDiff);
		return Math.abs(ageDate.getUTCFullYear() - 1970);
	};

	const getSchoolName = (schoolId) => {
		const school = schools.find((school) => school.id === schoolId);
		return school.name;
	};

	return (
		<div>
			<div className="back-button">
				<SmallButton
					text={"< Back"}
					handleClick={() => navigate("/main/psychologist/clients")}
				/>
			</div>

			<div className="flex space-between client-profile-container">
				<div className="flex column align-center image-info-wrapper">
					<img
						className="profile-image"
						src={`${import.meta.env.VITE_PROFILE_PIC_URL}${
							client.profile.profilePic
						}`}
						alt="Profile"
					/>

					<div className="flex column info-Wrapper">
						<InfoBar
							label={"Name"}
							text={`${client.profile.firstName} ${client.profile.lastName}`}
						/>
						<InfoBar
							label={"Age"}
							text={calculateAge(client.profile.dob)}
						/>
						<InfoBar label={"Email"} text={client.profile.email} />
					</div>
				</div>
				<div className="client-chlidren-container">
					<h3>Children</h3>

					<div className="flex wrap align-start client-chlidren-wrapper">
						{clientChildren?.map((child) => {
							const { id, name, profilePic, dob, schoolId } =
								child;

							return (
								<Link
									to={`/main/psychologist/clients/child/${id}`}
								>
									<StudentCard
										key={id}
										id={id}
										name={name}
										profilePic={`${
											import.meta.env.VITE_PROFILE_PIC_URL
										}${profilePic}`}
										age={calculateAge(dob)}
										school={getSchoolName(schoolId)}
									></StudentCard>
								</Link>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Client;
