import { Stack, Tabs } from "expo-router";
import React, { useEffect } from "react";

// Redux
import { useDispatch } from "react-redux";
import { setTeachers } from "../../../core/redux/teachers";
import { setUser } from "../../../core/redux/user/index.";
import { setSchools } from "../../../core/redux/schools";
import { setChildren } from "../../../core/redux/children";
import { setInstructions } from "../../../core/redux/instructions";
import { setReports } from "../../../core/redux/reports";
import { setpsychologists } from "../../../core/redux/Psychologists";
import { setAvailableSlots } from "../../../core/redux/availableSlots";
import { setConversations } from "../../../core/redux/conversations";
import { setMessages } from "../../../core/redux/messages";

// Tools
import { useSendRequest } from "../../../core/tools/remote/request";
import { requestMethods } from "../../../core/enum/requestMetods";
import Toast from "react-native-toast-message";
import {
	registerForPushNotificationsAsync,
	registerNotificationHandlers,
} from "../../../services/notification/pushNotification";

const HomeLayout = () => {
	const dispatch = useDispatch();
	const sendRequest = useSendRequest();

	useEffect(() => {
		const saveToken = async () => {
			const token = await registerForPushNotificationsAsync();
			console.log("Device Token", token);
			if (token) {
				sendRequest(requestMethods.POST, "/api/parent/save-token", {
					token,
				})
					.then((response) => {
						if (response.status === 201) {
							console.log(response.data.message);
						}
					})
					.catch((error) => {
						console.log(error.response);
					});
			}
		};
		saveToken();
		registerNotificationHandlers();
		loadPsychologistAndTeachers();
	}, []);

	const loadPsychologistAndTeachers = () => {
		sendRequest(
			requestMethods.GET,
			"/api/parent/get-psychologists-teachers"
		)
			.then((response) => {
				if (response.status === 200) {
					console.log(response.data);
					const {
						teachers,
						psychologists,
						user,
						children,
						schools,
						reports,
						instructions,
						schedules,
						conversations,
					} = response.data;
					dispatch(setTeachers(teachers));
					dispatch(setpsychologists(psychologists));
					dispatch(setUser(user));
					dispatch(setChildren(children));
					dispatch(setSchools(schools));
					dispatch(setReports(reports));
					dispatch(setInstructions(instructions));
					dispatch(setAvailableSlots(schedules));
					const allConversations = [];
					const allMessages = [];
					conversations?.forEach((conversation: any) => {
						const { Message, ...rest } = conversation;
						allConversations.push({ ...rest });
						allMessages.push(...Message);
					});
					dispatch(setConversations(allConversations));
					dispatch(setMessages(allMessages));
				}
			})
			.catch((error) => {
				console.log(error);
				Toast.show({
					type: "error",
					text1: "Something went Wrong!",
				});
			});
	};

	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					headerShown: false,
				}}
			></Stack.Screen>
		</Stack>
	);
};

export default HomeLayout;
