import React from "react";
import { View, ScrollView, FlatList } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

// Styles
import { ChildStyles } from "../../Styles/ChildReport";

// Redux
import { useSelector } from "react-redux";
import { childrenSliceName } from "../../core/redux/children";
import { RootState } from "../../core/redux/store";
import { instructionsSliceName } from "../../core/redux/instructions";
import { psychologistsSliceName } from "../../core/redux/Psychologists";

// components
import ChildNameImage from "../../components/ChildNameImage";
import ReportContainer from "../../components/ReportContainer";

const ChildrenInstructions = () => {
	const { id } = useLocalSearchParams();

	const psychologists = useSelector(
		(global: RootState) => global[psychologistsSliceName]
	);
	const children = useSelector(
		(global: RootState) => global[childrenSliceName]
	);
	const instructions = useSelector(
		(global: RootState) => global[instructionsSliceName]
	);

	const psychologist = psychologists.find(
		(psychologist) => psychologist.id === JSON.parse(id[0])
	);

	const childrenWithInstruction = children.map((child) => {
		const instruction = instructions.find(
			(instruction) => instruction.childId === child.id
		);
		return { ...child, instruction };
	});

	return (
		<View>
			<Stack.Screen
				options={{
					title: `DR. ${psychologist.firstName} ${psychologist.lastName}`,
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
				<FlatList
					data={childrenWithInstruction}
					scrollEnabled={false}
					renderItem={(student) => {
						const { name, profilePic, instruction } = student.item;
						return (
							instruction && (
								<View key={student.item.id}>
									<ChildNameImage
										key={name}
										name={name}
										profilePic={profilePic}
									/>
									<ReportContainer
										key={student.item.id}
										dateTime={instruction.createdAt}
										report={instruction.Instruction}
										route={`/ChildInstructions/${student.item.id}`}
									/>
								</View>
							)
						);
					}}
				/>
			</View>
		</View>
	);
};

export default ChildrenInstructions;
