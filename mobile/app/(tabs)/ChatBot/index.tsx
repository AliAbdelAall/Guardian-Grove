import { View, Text } from "react-native";
import React, { useCallback, useState } from "react";
import {
	Bubble,
	Day,
	GiftedChat,
	IMessage,
	Send,
	Time,
} from "react-native-gifted-chat";
import { conversationStyles } from "../../../Styles/conversationStyles";
import IonIcons from "@expo/vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { RootState } from "../../../core/redux/store";
import { userSliceName } from "../../../core/redux/user/index.";
import { useSendRequest } from "../../../core/tools/remote/request";
import { requestMethods } from "../../../core/enum/requestMetods";

const ChatBot = () => {
	const [messages, setMessages] = useState<IMessage[]>([]);
	const sendRequest = useSendRequest();
	const parent = useSelector((global: RootState) => global[userSliceName]);

	return (
		<GiftedChat
			renderAvatar={null}
			messages={messages}
			renderDay={(props) => (
				<Day {...props} textStyle={conversationStyles.dayTextStyle} />
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
	);
};

export default ChatBot;
