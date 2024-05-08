import React, { useState } from "react";
import "./style.css";

import InfoBar from "../../../../components/InfoBar";
import { useSelector } from "react-redux";
import { childrenSliceName } from "../../../../core/redux/children";
import { schoolsSliceName } from "../../../../core/redux/shcools";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import StudentCard from "../../../../components/StudentCard";
import SmallButton from "../../../../components/SmallButton";

const Child = () => {
	const { id } = useParams();

	const location = useLocation();

	const path = location.pathname;
	const isTeacherPath = path.includes("teacher");
	const isPsychologistPath = path.includes("psychologist");

	const { children } = useSelector((global) => global[childrenSliceName]);
	const { schools } = useSelector((global) => global[schoolsSliceName]);
	const [inputText, setInputText] = useState("");
	console.log(inputText);
	const navigate = useNavigate();

	const child = children.find((child) => child.id == id);

	const instructionsList = [
		{
			id: 1,
			date: "2024-02-24T00:00:00.000Z",
			insrtuction:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet lectus nec dolor imperdiet consectetur. Donec non ex quis leo vehicula mattis. ",
		},
		{
			id: 2,
			date: "2024-02-27T00:00:00.000Z",
			insrtuction:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet lectus nec dolor imperdiet consectetur. Donec non ex quis leo vehicula mattis. ",
		},
		{
			id: 3,
			date: "2024-03-14T00:00:00.000Z",
			insrtuction:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet lectus nec dolor imperdiet consectetur. Donec non ex quis leo vehicula mattis. ",
		},
	];

	const [instructions, setInstructions] = useState(instructionsList);

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

	const handleInputChange = () => {
		console.log(instructions[instructions.length - 1]);
		setInstructions([
			...instructions,
			{
				id: instructions[instructions.length - 1].id + 1,
				date: new Date().toString(),
				insrtuction: inputText,
			},
		]);
		setInputText("");
	};

	return (
		<div>
			<div className="back-button">
				<SmallButton
					text={"< Back"}
					handleClick={() => {
						isPsychologistPath
							? navigate(
									`/main/psychologist/clients/client/${child.parentId}`
							  )
							: navigate("/main/teacher/students");
					}}
				/>
			</div>

			<div className="flex space-between client-profile-container">
				<div className="flex column align-center image-info-wrapper">
					<img
						className="profile-image"
						src={`${import.meta.env.VITE_PROFILE_PIC_URL}${
							child.profilePic
						}`}
						alt="Profile"
					/>

					<div className="flex column info-Wrapper">
						<InfoBar label={"Name"} text={child.name} />
						<InfoBar
							label={"Age"}
							text={`${calculateAge(child.dob)} years old`}
						/>
						{isPsychologistPath && (
							<InfoBar
								label={"School"}
								text={getSchoolName(child.schoolId)}
							/>
						)}
					</div>
				</div>
				<div className="client-chlidren-container">
					<h3>{isTeacherPath ? "Reports" : "Instructions"}</h3>
					<div className="flex column">
						<div className="flex input-bar-container">
							<textarea
								className="text-acient"
								placeholder={
									isTeacherPath ? "Report" : "Instructions"
								}
								type="text"
								value={inputText}
								onChange={(e) => setInputText(e.target.value)}
							/>
							<button onClick={handleInputChange}>Send</button>
						</div>
						<div className="flex column instrucions-container">
							{instructions.length !== 0 ? (
								instructions?.map((instruction) => (
									<div
										key={instruction.id}
										className="flex column instruction-wrapper"
									>
										<div className="flex space-between datetime-wrapper">
											<p className="text-lg font-medium">
												{instruction.date.slice(0, 10)}
											</p>
											<p className="text-sm">
												{instruction.date.slice(11, 16)}
											</p>
										</div>
										<p className="text-acient">
											{instruction.insrtuction}
										</p>
									</div>
								))
							) : (
								<h4>
									{isTeacherPath
										? "No Reports Yet."
										: "No Instructions yet."}
								</h4>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Child;
