import { View, Text } from "react-native";
import React, { useCallback, useState, useEffect } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../../core/redux/store";
import { psychologistsSliceName } from "../../core/redux/Psychologists";
import { Bubble, Day, GiftedChat, Send, Time } from "react-native-gifted-chat";
import { conversationStyles } from "../../Styles/conversationStyles";
import IonIcons from "@expo/vector-icons/Ionicons";

const Conversation = () => {
	const { id } = useLocalSearchParams();
	const psychologists = useSelector(
		(global: RootState) => global[psychologistsSliceName]
	);

	const psychologist = psychologists.find(
		(psychologist) => psychologist.id === JSON.parse(id[0])
	);
	const [messages, setMessages] = useState([]);
	useEffect(() => {
		setMessages([
			{
				_id: 1,
				text: "Hello developer",
				createdAt: new Date("2024-05-13T18:12:55.352Z"),
				user: {
					_id: 2,
				},
			},
		]);
	}, []);

	const onSend = useCallback((messages = []) => {
		setMessages((previousMessages) =>
			GiftedChat.append(previousMessages, messages)
		);
	}, []);

	return (
		<>
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
			<GiftedChat
				renderAvatar={null}
				messages={messages}
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
					_id: 1,
				}}
			/>
		</>
	);
};

export default Conversation;
