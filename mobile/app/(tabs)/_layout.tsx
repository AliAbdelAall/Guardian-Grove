import { Stack, Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import OctIcons from "@expo/vector-icons/Octicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { StatusBar } from "expo-status-bar";

const HomeLayout = () => {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: "#75AB19",
				tabBarInactiveTintColor: "#677294",
			}}
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
					tabBarIcon: ({ color, focused }) => (
						<View>
							<FontAwesome6
								name="circle-user"
								size={24}
								color={color}
							/>
						</View>
					),
					title: "Profile",
					headerShown: false,
				}}
			/>
			<Tabs.Screen
				name="Psychologists"
				options={{
					tabBarIcon: ({ color, focused }) => (
						<View>
							<FontAwesome6
								name="user-doctor"
								size={24}
								color={color}
							/>
						</View>
					),
					title: "Psychologists",
					headerShown: false,
				}}
			/>
			<Tabs.Screen
				name="Teachers"
				options={{
					tabBarIcon: ({ color, focused }) => (
						<View>
							<FontAwesome6
								name="user-graduate"
								size={24}
								color={color}
							/>
						</View>
					),
					title: "Teachers",
					headerShown: false,
				}}
			/>
			<Tabs.Screen
				name="Chat"
				options={{
					tabBarIcon: ({ color, focused }) => (
						<View>
							<OctIcons name="comment" size={24} color={color} />
						</View>
					),
					title: "Chat",
					headerShown: false,
				}}
			/>
			<Tabs.Screen
				name="ChatBot"
				options={{
					tabBarIcon: ({ color, focused }) => (
						<View>
							<FontAwesome5
								name="brain"
								size={24}
								color={color}
							/>
						</View>
					),
					title: "AI",
					headerShown: false,
				}}
			/>
		</Tabs>
	);
};

export default HomeLayout;
