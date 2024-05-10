import React from "react";
import { View, Image } from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";

// styles
import { psychoProfileStyles } from "../../Styles/psychologists/profile";
import { profileStyles } from "../../Styles/main/profileStyles";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../core/redux/store";
import { psychologistsSliceName } from "../../core/redux/Psychologists";
import { instructionsSliceName } from "../../core/redux/instructions";

// Tools
import { StarRatingDisplay } from "react-native-star-rating-widget";
import LoginButton from "../../components/LoginButton";
import ProfileInput from "../../components/ProfileInput";

const PsichologisProfile = () => {
	const { id } = useLocalSearchParams();

	const instructions = useSelector(
		(global: RootState) => global[instructionsSliceName]
	);
	const psychologists = useSelector(
		(global: RootState) => global[psychologistsSliceName]
	);
	const psychologist = psychologists.find(
		(psychologist) => psychologist.id == parseInt(id[0])
	);

	const psychologistInstructions = instructions.filter(
		(instruction) => instruction.psychologistId === parseInt(id[0])
	);

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
					title: `${psychologist.firstName} ${psychologist.lastName}`,
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
						src={`${process.env.EXPO_PUBLIC_PROFILE_PICS_URL}${psychologist.profilePic}`}
					/>
					<StarRatingDisplay
						rating={psychologist.rating}
						maxStars={5}
						starSize={25}
						enableHalfStar={true}
						emptyColor="#d9d9d9"
						starStyle={{ marginHorizontal: 0 }}
						style={{ marginVertical: 10 }}
					/>
				</View>
				<View style={psychoProfileStyles.profileBodyWrapper}>
					<View style={profileStyles.inputContainer}>
						<ProfileInput
							label={"Name"}
							input={`${psychologist.firstName} ${psychologist.lastName}`}
						/>
						<ProfileInput
							label={"Age"}
							input={`${calculateStudentAge(
								psychologist.dob?.toString()
							)} years old`}
						/>
						<ProfileInput
							label={"Email"}
							input={psychologist.email}
						/>
						<ProfileInput
							label={"speciality"}
							input={`${psychologist.speciality} Specialist`}
						/>
						<ProfileInput
							label={"Experience"}
							input={`${psychologist.yearsOfExperience} years`}
						/>

						<LoginButton
							text={"Book Appointment"}
							handlePress={() => {}}
						/>
						{psychologistInstructions.length !== 0 && (
							<LoginButton
								text={"Instructions"}
								handlePress={() =>
									router.push(
										`/ChildrenInstructions/${id[0]}`
									)
								}
							/>
						)}
					</View>
				</View>
			</View>
		</View>
	);
};

export default PsichologisProfile;
