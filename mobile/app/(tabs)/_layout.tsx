import { Stack, Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import OctIcons from "@expo/vector-icons/Octicons";
import { StatusBar } from "expo-status-bar";

const HomeLayout = () => {
	return (
		<Tabs
		// screenOptions={{
		// 	tabBarShowLabel: false,
		// 	tabBarActiveTintColor: "#fff",
		// 	tabBarInactiveTintColor: "white",
		// 	tabBarStyle: {
		// 		backgroundColor: "#75AB19",
		// 		borderTopWidth: 1,
		// 		borderTopColor: "#fff",
		// 		height: 60,
		// 	},
		// }}
		// <StatusBar style="light" />
		>
			<Tabs.Screen
				name="Home"
				options={{
					tabBarIcon: ({ color, focused }) => (
						<View>
							<OctIcons name="home" size={24} color={color} />
						</View>
					),
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
			<Tabs.Screen
				name="Teachers"
				options={{
					title: "Teachers",
					headerShown: false,
				}}
			/>
			<Tabs.Screen
				name="Chat"
				options={{
					title: "Chat",
					headerShown: false,
				}}
			/>
		</Tabs>
	);
};

export default HomeLayout;
