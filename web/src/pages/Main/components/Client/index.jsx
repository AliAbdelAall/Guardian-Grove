import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// Styles
import "./style.css";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { parentsSliceName } from "../../../../core/redux/parents";
import { childrenSliceName } from "../../../../core/redux/children";
import { schoolsSliceName } from "../../../../core/redux/shcools";
import {
	addConversation,
	conversationsSliceName,
} from "../../../../core/redux/convesations";

// Components
import InfoBar from "../../../../components/InfoBar";
import StudentCard from "../../../../components/StudentCard";
import SmallButton from "../../../../components/SmallButton";
import LoginButton from "../../../../components/LoginButton";

// Tools
import { toast } from "react-toastify";
import { useSendRequest } from "../../../../core/tools/remote/request";
import { requestMethods } from "../../../../core/enums/requestMethods";

const Client = () => {
	const { id } = useParams();

	const { parents } = useSelector((global) => global[parentsSliceName]);
	const { children } = useSelector((global) => global[childrenSliceName]);
	const { schools } = useSelector((global) => global[schoolsSliceName]);
	const { conversations } = useSelector(
		(global) => global[conversationsSliceName]
	);

	const navigate = useNavigate();
	const sendRequest = useSendRequest();
	const dispatch = useDispatch();

	const client = parents.find((parent) => parent.id == id);
	const conversation = conversations.find(
		(conversation) => conversation.parentId === client.id
	);
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

	const handleCreateConversation = () => {
		if (conversation) {
			navigate(`/main/psychologist/chat/${conversation.id}`);
		} else {
			sendRequest(
				requestMethods.POST,
				"/api/psychologist/create-conversation",
				{
					parentId: client.id,
				}
			)
				.then((response) => {
					if (response.status === 201) {
						const { conversation } = response.data;
						dispatch(addConversation(conversation));
						toast.success("conversation created successfully");
						navigate(`/main/psychologist/chat/${conversation.id}`);
					}
				})
				.catch((error) => {
					console.log(error);
					toast.error(error.response);
				});
		}
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
						<LoginButton
							text={"chat with Parent"}
							handleClick={handleCreateConversation}
						/>
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
