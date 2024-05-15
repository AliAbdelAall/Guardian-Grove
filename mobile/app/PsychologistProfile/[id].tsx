import React from "react";
import { View, Image } from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";

// styles
import { psychoProfileStyles } from "../../Styles/psychologists/profile";
import { profileStyles } from "../../Styles/main/profileStyles";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../core/redux/store";
import { psychologistsSliceName } from "../../core/redux/Psychologists";
import { instructionsSliceName } from "../../core/redux/instructions";
import {
	addConversation,
	conversationsSliceName,
} from "../../core/redux/conversations";

// Components
import LoginButton from "../../components/LoginButton";
import ProfileInput from "../../components/ProfileInput";

// Tools
import { StarRatingDisplay } from "react-native-star-rating-widget";
import IonIcons from "@expo/vector-icons/Ionicons";
import { useSendRequest } from "../../core/tools/remote/request";
import { requestMethods } from "../../core/enum/requestMetods";
import Toast from "react-native-toast-message";

const PsichologistProfile = () => {
	const { id } = useLocalSearchParams();
	const psychologistId = Array.isArray(id) ? id[0] : id;
	const sendRequest = useSendRequest();
	const dispatch = useDispatch();

	const instructions = useSelector(
		(global: RootState) => global[instructionsSliceName]
	);
	const psychologists = useSelector(
		(global: RootState) => global[psychologistsSliceName]
	);
	const psychologist = psychologists.find(
		(psychologist) => psychologist.id == parseInt(psychologistId)
	);
	const conversations = useSelector(
		(global: RootState) => global[conversationsSliceName]
	);

	const psychologistInstructions = instructions.filter(
		(instruction) => instruction.psychologistId === parseInt(psychologistId)
	);
	const conversation = conversations.find(
		(conversation) => conversation.psychologistId === psychologist.id
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

	const handleCreateConversation = () => {
		if (conversation) {
			router.push(`/Conversation/${conversation.id}`);
		} else {
			sendRequest(
				requestMethods.POST,
				"/api/parent/create-conversation-psychologist",
				{ psychologistId: psychologist.id }
			)
				.then((response) => {
					if (response.status === 201) {
						const { newConversation } = response.data;
						dispatch(addConversation(conversation));
						Toast.show({
							type: "success",
							text1: "conversation created successfully",
						});
						router.push(`/Conversation/${newConversation.id}`);
					}
				})
				.catch((error) => {
					console.log(error);
					Toast.show({
						type: "error",
						text1: error.response,
					});
				});
		}
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
					<IonIcons
						name="chatbubble-ellipses-outline"
						size={30}
						style={psychoProfileStyles.chatIcon}
						onPress={handleCreateConversation}
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
							handlePress={() =>
								router.push(`/AvailableSlots/${psychologistId}`)
							}
						/>
						{psychologistInstructions.length !== 0 && (
							<LoginButton
								text={"Instructions"}
								handlePress={() =>
									router.push(
										`/ChildrenInstructions/${psychologistId}`
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

export default PsichologistProfile;
