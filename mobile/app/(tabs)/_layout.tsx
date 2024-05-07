import { Stack, Tabs } from "expo-router";
import React from "react";

const HomeLayout = () => {
	return (
		<Tabs>
			<Tabs.Screen
				name="Home"
				options={{
					title: "Home",
					headerShown: false,
				}}
			/>
			<Tabs.Screen
				name="Profile"
				options={{
					title: "Profile",
					headerShown: false,
				}}
			/>
			<Tabs.Screen
				name="Psychologists"
				options={{
					title: "Psychologists",
					headerShown: false,
				}}
			/>
		</Tabs>
	);
};

export default HomeLayout;
