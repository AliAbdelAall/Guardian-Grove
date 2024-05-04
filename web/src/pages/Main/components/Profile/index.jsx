import React from "react";
import "./style.css";
import { useLocation } from "react-router-dom";

import ProfilePic from "../../../../assets/images/profile-pictures/profile.jpg";

import { useSelector } from "react-redux";
import { userProfileSliceName } from "../../../../core/redux/userProfile";
import { MdEdit } from "react-icons/md";

const Profile = ({ yearOfExperience = null, school = null }) => {
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
	return (
		<div className="flex column full-width profile-container">
			<h2>Profile</h2>
			<div className="flex align-center space-around full-width">
				<div className="flex column align-center">
					<img
						className="profile-image"
						src={`${
							import.meta.env.VITE_PROFILE_PIC_URL
						}${profilePic}`}
						alt="Profile"
					/>

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
						<input
							className="text-lg text-acient"
							type="text"
							value={email}
							contentEditable={false}
						/>
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
							type="text"
							value={dob}
							contentEditable={false}
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
									: "Family specialist"
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
								type="text"
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
