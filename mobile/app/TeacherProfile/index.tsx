import React from "react";
import { View, Image } from "react-native";
import { Stack } from "expo-router";

// styles
import { psychoProfileStyles } from "../../Styles/psychologists/profile";
import { profileStyles } from "../../Styles/main/profileStyles";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../core/redux/store";
import { teachersSliceName } from "../../core/redux/teachers";

// Components
import LoginButton from "../../components/LoginButton";
import ProfileInput from "../../components/ProfileInput";

const TeacherProfile = () => {
	const id = 3;

	const teachers = useSelector(
		(global: RootState) => global[teachersSliceName]
	);
	const teacher = teachers.find((teacher) => (teacher.id = id));

	const calculateStudentAge = (dob: string) => {
		const birthDate = new Date(dob);
		if (isNaN(birthDate.getTime())) {
			return null;
		}
		const currentDate = new Date();
		const difference = currentDate.getTime() - birthDate.getTime();
		const age = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
		return age.toString();
	};

	return (
		<View>
			<Stack.Screen
				options={{
					title: `${teacher.firstName} ${teacher.lastName}`,
					headerStyle: {
						backgroundColor: "#75AB19",
					},
					headerTitleStyle: {
						color: "white",
						fontSize: 24,
					},

					headerShadowVisible: false,
					headerTintColor: "white",
				}}
			/>
			<View>
				<View style={psychoProfileStyles.profilePicContainer}>
					<Image
						style={psychoProfileStyles.profileImage}
						src={`${process.env.EXPO_PUBLIC_PROFILE_PICS_URL}${teacher.profilePic}`}
					/>
				</View>
				<View style={psychoProfileStyles.profileBodyWrapper}>
					<View style={profileStyles.inputContainer}>
						<ProfileInput
							label={"Name"}
							input={`${teacher.firstName} ${teacher.lastName}`}
						/>
						<ProfileInput
							label={"Age"}
							input={`${calculateStudentAge(
								teacher.dob.toString()
							)} years old`}
						/>
						<ProfileInput label={"Email"} input={teacher.email} />
						<ProfileInput
							label={"speciality"}
							input={`${teacher.speciality} Specialist`}
						/>
						<ProfileInput label={"School"} input={teacher.school} />

						<LoginButton text={"Reports"} handlePress={() => {}} />
					</View>
				</View>
			</View>
		</View>
	);
};

export default TeacherProfile;
