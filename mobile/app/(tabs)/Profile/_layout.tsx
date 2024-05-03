import { Stack, Tabs } from "expo-router";
import React from "react";

const ProfileLayout = () => {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					title: "Profile",
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
			<Stack.Screen
				name="Children"
				options={{
					title: "Children Profiles",
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

export default ProfileLayout;
