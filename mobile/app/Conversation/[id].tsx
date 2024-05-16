import React, { useCallback, useState, useEffect } from "react";
import { Stack, useLocalSearchParams } from "expo-router";

// Styles
import { conversationStyles } from "../../Styles/conversationStyles";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../core/redux/store";
import { psychologistsSliceName } from "../../core/redux/Psychologists";
import { userSliceName } from "../../core/redux/user/index.";
import { addMessage, messagesSliceName } from "../../core/redux/messages";
import { conversationsSliceName } from "../../core/redux/conversations";
import { teachersSliceName } from "../../core/redux/teachers";

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
import socket from "../../core/socket";

type user = {
	profileId: number;
	name: string;
};

const Conversation = () => {
	const { id } = useLocalSearchParams();
	const conversationId = Array.isArray(id) ? id[0] : id;

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
	const dispatch = useDispatch();
	const conversation = conversations.find(
		(conversation) => conversation.id === JSON.parse(conversationId)
	);
	const conversationMessages = messages.filter(
		(message) => message.conversationId === conversation.id
	);
	const [messageId, setMessageId] = useState(0);
	const isTeacher = conversation.teacherId !== null;

	useEffect(() => {
		if (JSON.parse(conversationId) !== 0) {
			socket.emit(
				"join-conversation",
				conversationId,
				(conversation: string) => {
					console.log(`Joined conversation: ${conversation}`);
				}
			);
			socket.on("receive-message", (message) => {
				console.log("Received message:", message);

				dispatch(addMessage(message));
				setMessageId(message.conversationId);
			});
		}

		return () => {
			socket.off("receive-message");
		};
	}, [conversationId]);

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
			(psychologist) => psychologist.id === conversation.psychologistId
		);
		user = {
			profileId: psychologist.profileId,
			name: `Dr. ${psychologist.firstName} ${psychologist.lastName}`,
		};
	}

	const sendMessage = useCallback((messages = []) => {
		const lastMessage = messages[messages.length - 1];
		const messageText = lastMessage.text;

		if (messageText) {
			const newMessage = {
				conversationId: JSON.parse(conversationId),
				text: messageText,
				senderId: parent.profileId,
				createdAt: new Date(),
			};
			socket.emit("send-message", newMessage);
		}
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
				messages={mappedMessages}
				onSend={(messages) => sendMessage(messages)}
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
