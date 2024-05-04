import React from "react";
import { useLocation } from "react-router-dom";
import "react-image-crop/dist/ReactCrop.css";
import { MdEdit } from "react-icons/md";

// Styles
import "./style.css";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
	editProfilPic,
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

	return (
		<div className="flex column full-width profile-container">
			<h2>Profile</h2>
			<div className="flex align-center space-around full-width">
				<div className="flex column align-center">
					<div className="profile-image-wrapper">
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
					<div className="flex column profile-input-wrapper">
						<label
							className="text-sm font-bold text-primary"
							htmlFor=""
						>
							Email
						</label>
						<p className="text-lg text-acient">{email}</p>
					</div>
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
							value={dob}
							color="#75AB19"
							contentEditable={false}
							onChange={(e) => console.log(e.target.value)}
						/>
					</div>
					<div className="flex column profile-input-wrapper">
						<label
							className="text-sm font-bold text-primary"
							htmlFor=""
						>
							Speciality
						</label>
						<input
							placeholder={
								location.pathname === "/main/teacher/profile"
									? "Math teacher"
									: "Family/Development specialist"
							}
							aria-placeholder="math"
							className="text-lg text-acient"
							type="text"
							value={
								location === "/main/teacher/profile"
									? teacher.speciality
									: psychologist.speciality
							}
							contentEditable={false}
						/>
					</div>

					{location.pathname === "/main/teacher/profile" ? (
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
								value={user.psychologist.yearsOfExperience}
								contentEditable={false}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Profile;