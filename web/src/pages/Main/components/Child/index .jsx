import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// Styles
import "./style.css";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { childrenSliceName } from "../../../../core/redux/children";
import { schoolsSliceName } from "../../../../core/redux/shcools";
import { userProfileSliceName } from "../../../../core/redux/userProfile";
import { addReport, reportsSliceName } from "../../../../core/redux/reports";
import {
	addInstruction,
	instructionsSliceName,
} from "../../../../core/redux/instructions";

// Components
import InfoBar from "../../../../components/InfoBar";
import SmallButton from "../../../../components/SmallButton";
import ReportContainer from "../../../../components/ReportContainer";

// Tools
import { useSendRequest } from "../../../../core/tools/remote/request";
import { requestMethods } from "../../../../core/enums/requestMethods";
import { toast } from "react-toastify";

const Child = () => {
	const { id } = useParams();

	const user = useSelector((global) => global[userProfileSliceName]);
	const { reports } = useSelector((global) => global[reportsSliceName]);
	const { instructions } = useSelector(
		(global) => global[instructionsSliceName]
	);
	const { children } = useSelector((global) => global[childrenSliceName]);
	const { schools } = useSelector((global) => global[schoolsSliceName]);

	const [inputText, setInputText] = useState("");
	const location = useLocation();
	const navigate = useNavigate();
	const sendRequest = useSendRequest();
	const dispatch = useDispatch();

	const path = location.pathname;
	const isTeacherPath = path.includes("teacher");
	const isPsychologistPath = path.includes("psychologist");

	const child = children.find((child) => child.id == id);

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
	const handleSendRequest = () => {
		if (isTeacherPath) {
			handleSendReport();
		} else {
			handleSendInstruction();
		}
	};

	const handleSendInstruction = () => {
		sendRequest(requestMethods.POST, "api/psychologist/send-instruction", {
			childId: JSON.parse(id),
			instruction: inputText,
		})
			.then((response) => {
				if (response.status === 201) {
					toast.success(response.data.message);
					dispatch(addInstruction(response.data.instruction));
					setInputText("");
				}
			})
			.catch((error) => {
				toast.error(error.response.error);
			});
	};

	const handleSendReport = () => {
		sendRequest(requestMethods.POST, "api/teacher/send-report", {
			childId: JSON.parse(id),
			report: inputText,
		})
			.then((response) => {
				if (response.status === 201) {
					toast.success(response.data.message);
					dispatch(addReport(response.data.report));
					setInputText("");
				}
			})
			.catch((error) => {
				toast.error(error.response.error);
			});
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
						<div className="flex full-width input-bar-container">
							<textarea
								className="text-acient"
								placeholder={
									isTeacherPath ? "Report" : "Instructions"
								}
								type="text"
								value={inputText}
								onChange={(e) => setInputText(e.target.value)}
							/>
							<button onClick={handleSendRequest}>Send</button>
						</div>
						<div className="flex column instrucions-container">
							{isTeacherPath ? (
								reports.length !== 0 ? (
									reports?.map((reports) => (
										<ReportContainer
											key={reports.id}
											dateTime={reports.createdAt}
											id={reports.id}
											report={reports.report}
										/>
									))
								) : (
									<h4>No Reports Yet.</h4>
								)
							) : instructions.length !== 0 ? (
								instructions?.map((instruction) => (
									<ReportContainer
										key={instruction.id}
										dateTime={instruction.createdAt}
										id={instruction.id}
										report={instruction.instruction}
									/>
								))
							) : (
								<h4>No Instructions yet.</h4>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Child;