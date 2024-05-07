import { Stack, Tabs } from "expo-router";
import React from "react";

const TeachersLayout = () => {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					title: "Teachers",
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

export default TeachersLayout;
