import { Stack, Tabs } from "expo-router";
import React from "react";

const ChatLayout = () => {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					title: "Chat",
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

export default ChatLayout;
