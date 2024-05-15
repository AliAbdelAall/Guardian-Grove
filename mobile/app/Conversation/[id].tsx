import { View, Text } from "react-native";
import React, { useCallback, useState, useEffect } from "react";
import { Stack, useLocalSearchParams } from "expo-router";

// Styles
import { conversationStyles } from "../../Styles/conversationStyles";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../core/redux/store";
import { psychologistsSliceName } from "../../core/redux/Psychologists";
import { userSliceName } from "../../core/redux/user/index.";

// Tools
import {
	Bubble,
	Day,
	GiftedChat,
	IMessage,
	Send,
	Time,
} from "react-native-gifted-chat";
import IonIcons from "@expo/vector-icons/Ionicons";
import { messagesSliceName } from "../../core/redux/messages";
import { conversationsSliceName } from "../../core/redux/conversations";
import { teachersSliceName } from "../../core/redux/teachers";

type user = {
	profileId: number;
	name: string;
};

const Conversation = () => {
	const { id } = useLocalSearchParams();
	const conversations = useSelector(
		(global: RootState) => global[conversationsSliceName]
	);
	const messages = useSelector(
		(global: RootState) => global[messagesSliceName]
	);
	const psychologists = useSelector(
		(global: RootState) => global[psychologistsSliceName]
	);
	const teachers = useSelector(
		(global: RootState) => global[teachersSliceName]
	);
	const parent = useSelector((global: RootState) => global[userSliceName]);

	const conversation = conversations.find(
		(conversation) => conversation.id === parseInt(id[0])
	);
	const conversationMessages = messages.filter(
		(message) => message.conversationId === conversation.id
	);
	const [user, setUser] = useState<user>();
	const isTeacher = conversation.teacherId !== null;

	useEffect(() => {
		getUser();
	}, []);

	const mappedMessages: IMessage[] = conversationMessages.map(
		(message): IMessage => {
			const senderId = message.senderId;
			const createdAt = new Date(message.createdAt);
			return {
				_id: message.id.toString(),
				text: message.text,
				createdAt,
				user: {
					_id: senderId,
				},
			};
		}
	);

	const getUser = () => {
		let user: user;
		if (isTeacher) {
			const teacher = teachers.find(
				(teacher) => teacher.id === conversation.teacherId
			);
			user = {
				profileId: teacher.profileId,
				name: `${teacher.firstName} ${teacher.lastName}`,
			};
		} else {
			const psychologist = psychologists.find(
				(psychologist) =>
					psychologist.id === conversation.psychologistId
			);
			user = {
				profileId: psychologist.profileId,
				name: `Dr. ${psychologist.firstName} ${psychologist.lastName}`,
			};
		}
		setUser(user);
	};

	const [testMessages, setMessages] = useState(mappedMessages);

	const onSend = useCallback((messages = []) => {
		setMessages((previousMessages) =>
			GiftedChat.append(previousMessages, messages)
		);
	}, []);

	return (
		<>
			<Stack.Screen
				options={{
					title: user ? user.name : "",
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
			<GiftedChat
				renderAvatar={null}
				messages={testMessages}
				onSend={(messages) => onSend(messages)}
				renderDay={(props) => (
					<Day
						{...props}
						textStyle={conversationStyles.dayTextStyle}
					/>
				)}
				renderBubble={(props) => (
					<Bubble
						{...props}
						textStyle={{
							right: conversationStyles.bubbleText,
							left: conversationStyles.bubbleText,
						}}
						wrapperStyle={{
							right: conversationStyles.bubbleWrapperRight,
							left: conversationStyles.bubbleWrapperLeft,
						}}
						renderTime={(props) => (
							<Time
								{...props}
								timeTextStyle={{
									left: conversationStyles.bubbleTimeText,
									right: conversationStyles.bubbleTimeText,
								}}
							/>
						)}
					/>
				)}
				renderSend={(props) => (
					<Send {...props}>
						<IonIcons
							style={conversationStyles.sendButton}
							name="send"
							size={24}
							color={"#75AB19"}
						/>
					</Send>
				)}
				user={{
					_id: parent.profileId,
				}}
			/>
		</>
	);
};

export default Conversation;
