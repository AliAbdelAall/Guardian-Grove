import { Stack } from "expo-router";
import React from "react";

const TeacherProfileLayout = () => {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
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
				name="ChildrenReports"
				options={{
					title: "Reports",
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
				name="ChildReports"
				options={{
					title: "Reports",
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

export default TeacherProfileLayout;
