import React from "react";
import { View, Image } from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";

// styles
import { psychoProfileStyles } from "../../Styles/psychologists/profile";
import { profileStyles } from "../../Styles/main/profileStyles";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../core/redux/store";
import { teachersSliceName } from "../../core/redux/teachers";
import { reportsSliceName } from "../../core/redux/reports";
import {
	addConversation,
	conversationsSliceName,
} from "../../core/redux/conversations";

// Components
import LoginButton from "../../components/LoginButton";
import ProfileInput from "../../components/ProfileInput";

// Tools
import IonIcons from "@expo/vector-icons/Ionicons";
import { useSendRequest } from "../../core/tools/remote/request";
import { requestMethods } from "../../core/enum/requestMetods";
import Toast from "react-native-toast-message";

const TeacherProfile = () => {
	const { id } = useLocalSearchParams();
	const teacherId = Array.isArray(id) ? id[0] : id;

	const sendRequest = useSendRequest();
	const dispatch = useDispatch();
	const reports = useSelector(
		(global: RootState) => global[reportsSliceName]
	);
	const teachers = useSelector(
		(global: RootState) => global[teachersSliceName]
	);
	const conversations = useSelector(
		(global: RootState) => global[conversationsSliceName]
	);
	const teacher = teachers.find(
		(teacher) => teacher.id === JSON.parse(teacherId)
	);

	const teacherReports = reports.filter(
		(report) => report.teacherId === teacher.id
	);
	const conversation = conversations.find(
		(conversation) => conversation.teacherId === teacher.id
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
				"/api/parent/create-conversation-teacher",
				{ teacherId: teacher.id }
			)
				.then((response) => {
					if (response.status === 201) {
						const { newConversation } = response.data;
						dispatch(addConversation(newConversation));
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
							input={`${teacher.firstName} ${teacher.lastName}`}
						/>
						<ProfileInput
							label={"Age"}
							input={`${calculateStudentAge(
								teacher.dob?.toString()
							)} years old`}
						/>
						<ProfileInput label={"Email"} input={teacher.email} />
						<ProfileInput
							label={"speciality"}
							input={`${teacher.speciality} Specialist`}
						/>
						<ProfileInput label={"School"} input={teacher.school} />

						{teacherReports.length !== 0 && (
							<LoginButton
								text={"Reports"}
								handlePress={() => {
									router.push(`/ChildrenReports/${id}`);
								}}
							/>
						)}
					</View>
				</View>
			</View>
		</View>
	);
};

export default TeacherProfile;
