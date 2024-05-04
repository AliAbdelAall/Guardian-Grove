import React from "react";
import { useLocation } from "react-router-dom";
import "react-image-crop/dist/ReactCrop.css";
import { MdEdit } from "react-icons/md";

// Styles
import "./style.css";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
	editDob,
	editProfilPic,
	updateSpeciality,
	userProfileSliceName,
} from "../../../../core/redux/userProfile";

// Tools
import { toast } from "react-toastify";
import { useSendRequest } from "../../../../core/tools/remote/request";
import { requestMethods } from "../../../../core/enums/requestMethods";

const Profile = () => {
	const user = useSelector((global) => global[userProfileSliceName]);
	const {
		firstName,
		lastName,
		email,
		profilePic,
		dob,
		teacher,
		psychologist,
	} = user;

	const location = useLocation();
	const dispatch = useDispatch();
	const sendRequest = useSendRequest();

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append("image", file);
		sendRequest(
			requestMethods.POST,
			"/api/web/update-profile-picture",
			formData
		)
			.then((response) => {
				if (response.status === 200) {
					dispatch(editProfilPic(response.data.profilePic));
					toast.success(response.data.message);
				}
			})
			.catch((error) => {
				toast.error("Somthing went wrong");
			});
	};

	const handleDobChange = (e) => {
		const dateTimeDob = `${e.target.value}T00:00:00.000Z`;
		console.log(dateTimeDob);
		sendRequest(requestMethods.POST, "/api/web/update-dob", {
			newDob: dateTimeDob,
		})
			.then((response) => {
				if (response.status === 200) {
					dispatch(editDob(response.data.dob));
					toast.success(response.data.message);
				}
			})
			.catch((error) => {
				console.log(error);
				toast.error("Something went wrong with dob");
			});
	};

	const handlePsychologistSpecialityChange = (e) => {
		const speciality = e.target.value;
		sendRequest(
			requestMethods.POST,
			"/api/psychologist/update-speciality",
			{
				speciality,
			}
		).then((response) => {
			if (response.status === 200) {
				dispatch(
					updateSpeciality({
						user: "psychologist",
						speciality: response.data.speciality,
					})
				);
				toast.success(response.data.message);
			}
		});
	};

	return (
		<div className="flex column full-width profile-container">
			<h2>Profile</h2>
			<div className="flex align-center space-around full-width">
				<div className="flex column align-center">
					<div className="profile-image-wrapper">
						{/* image and image Input */}
						<img
							className="profile-image"
							src={`${
								import.meta.env.VITE_PROFILE_PIC_URL
							}${profilePic}`}
							alt="Profile"
						/>

						<label
							className="flex center file-input"
							htmlFor="image-Input"
						>
							<MdEdit size={30} color="#677294" />
						</label>
						<input
							className="hidden"
							type="file"
							id="image-Input"
							name="image"
							onChange={(e) => handleImageChange(e)}
							accept="image/*"
						/>
					</div>

					<h2>{`${firstName} ${lastName}`}</h2>
				</div>
				<div className="flex column profile-inputs-wrapper">
					{/* Email  */}
					<div className="flex column profile-input-wrapper">
						<label
							className="text-sm font-bold text-primary"
							htmlFor=""
						>
							Email
						</label>
						<p className="text-lg text-acient">{email}</p>
					</div>
					{/* DOB */}
					<div className="flex column profile-input-wrapper">
						<label
							className="text-sm font-bold text-primary"
							htmlFor=""
						>
							Date Of Birth
						</label>
						<input
							placeholder="YYYY-MM-DD"
							className="text-lg text-acient"
							type="date"
							value={dob?.slice(0, 10)}
							color="#75AB19"
							contentEditable={false}
							onChange={(e) => handleDobChange(e)}
						/>
					</div>
					{/* Speciality */}
					{location.pathname === "/main/teacher/profile" ? (
						// Speciality Teacher
						<div className="flex column profile-input-wrapper">
							<label
								className="text-sm font-bold text-primary"
								htmlFor=""
							>
								Speciality
							</label>
							<input
								className="text-lg text-acient"
								type="text"
								value={user.teacher.school}
								contentEditable={false}
							/>
						</div>
					) : (
						// Speciality psychologist
						<div className="flex column profile-input-wrapper">
							<label
								className="text-sm font-bold text-primary"
								htmlFor=""
							>
								Speciality
							</label>
							{psychologist.speciality ? (
								<p className="text-lg text-acient">
									{psychologist.speciality + " Specialist"}
								</p>
							) : (
								<select
									name=""
									id=""
									onChange={(e) =>
										handlePsychologistSpecialityChange(e)
									}
								>
									<option value="">Speciality</option>
									<option value="Family">Family</option>
									<option value="Development">
										Development
									</option>
								</select>
							)}
						</div>
					)}

					{location.pathname === "/main/teacher/profile" ? (
						// School
						<div className="flex column profile-input-wrapper">
							<label
								className="text-sm font-bold text-primary"
								htmlFor=""
							>
								School
							</label>
							<input
								className="text-lg text-acient"
								type="text"
								value={user.teacher.school}
								contentEditable={false}
							/>
						</div>
					) : (
						// Years Of Experience
						<div className="flex column profile-input-wrapper">
							<label
								className="text-sm font-bold text-primary"
								htmlFor=""
							>
								Years Of Experience
							</label>
							<input
								className="text-lg text-acient"
								type="number"
								min={0}
								max={45}
								value={user.psychologist.yearsOfExperience}
								contentEditable={true}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Profile;
