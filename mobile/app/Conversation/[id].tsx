import { View, Text } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../../core/redux/store";
import { psychologistsSliceName } from "../../core/redux/Psychologists";

const Conversation = () => {
	const { id } = useLocalSearchParams();
	const psychologists = useSelector(
		(global: RootState) => global[psychologistsSliceName]
	);

	const psychologist = psychologists.find(
		(psychologist) => psychologist.id === JSON.parse(id[0])
	);
	return (
		<>
			<Stack.Screen
				options={{
					title: `${psychologist.firstName} ${psychologist.lastName}`,
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
			<View>
				<Text>Conversation</Text>
			</View>
		</>
	);
};

export default Conversation;
