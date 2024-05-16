import { Stack, Tabs } from "expo-router";
import React from "react";

const ChatBotLayout = () => {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					title: "Chat With AI",
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
		</Stack>
	);
};

export default ChatBotLayout;
