import React from "react";
import { View, ScrollView, FlatList } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

// Styles
import { ChildStyles } from "../../Styles/ChildReport";

// Redux
import { useSelector } from "react-redux";
import { psychologistsSliceName } from "../../core/redux/Psychologists";
import { childrenSliceName } from "../../core/redux/children";
import { RootState } from "../../core/redux/store";
import { instructionsSliceName } from "../../core/redux/instructions";

// Components
import ReportContainer from "../../components/ReportContainer";
import ChildNameImage from "../../components/ChildNameImage";

const ChildInstructions = () => {
	const { id } = useLocalSearchParams();

	const psychologists = useSelector(
		(global: RootState) => global[psychologistsSliceName]
	);
	const instructions = useSelector(
		(global: RootState) => global[instructionsSliceName]
	);
	const children = useSelector(
		(global: RootState) => global[childrenSliceName]
	);

	const child = children.find((child) => child.id === JSON.parse(id[0]));

	const childInstructions = instructions.filter(
		(instruction) => instruction.childId === JSON.parse(id[0])
	);

	const psychologist = psychologists.find(
		(psychologist) => psychologist.id === instructions[0].psychologistId
	);
	return (
		<View>
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
			<View style={ChildStyles.ReportsContainer}>
				<ChildNameImage
					key={child.name}
					name={child.name}
					profilePic={child.profilePic}
				/>
				<FlatList
					data={childInstructions}
					renderItem={(childInstruction) => {
						const { id, instruction, createdAt } =
							childInstruction.item;
						return (
							<ReportContainer
								key={id}
								dateTime={createdAt}
								report={instruction}
							/>
						);
					}}
				/>
			</View>
		</View>
	);
};

export default ChildInstructions;
