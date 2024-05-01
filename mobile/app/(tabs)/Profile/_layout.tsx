import { Stack, Tabs } from "expo-router";
import React from "react";

const ProfileLayout = () => {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					title: "Profile",
				}}
			/>
			<Stack.Screen
				name="Children"
				options={{
					title: "Children",
				}}
			/>
		</Stack>
	);
};

export default ProfileLayout;
