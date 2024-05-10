import React from "react";
import { View, ScrollView, FlatList } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

// Styles
import { ChildStyles } from "../../Styles/ChildReport";

// Redux
import { teachersSliceName } from "../../core/redux/teachers";
import { childrenSliceName } from "../../core/redux/children";
import { useSelector } from "react-redux";
import { RootState } from "../../core/redux/store";
import { reportsSliceName } from "../../core/redux/reports";

// Components
import ReportContainer from "../../components/ReportContainer";
import ChildNameImage from "../../components/ChildNameImage";

const ChildReports = () => {
	const { id } = useLocalSearchParams();
	const teachers = useSelector(
		(global: RootState) => global[teachersSliceName]
	);
	const children = useSelector(
		(global: RootState) => global[childrenSliceName]
	);
	const reports = useSelector(
		(global: RootState) => global[reportsSliceName]
	);

	const student = children.find((child) => child.id === JSON.parse(id[0]));

	const teacher = teachers.find(
		(teacher) => teacher.id === student.teacherId
	);

	const childreports = reports.filter(
		(report) => report.childId === JSON.parse(id[0])
	);

	return (
		<View>
			<Stack.Screen
				options={{
					title: `${teacher.firstName} ${teacher.lastName}`,
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
			<ScrollView style={ChildStyles.ReportsContainer}>
				<ChildNameImage
					key={student.name}
					name={student.name}
					profilePic={student.profilePic}
				/>
				<FlatList
					data={childreports}
					renderItem={(childReport) => {
						const { id, report, createdAt } = childReport.item;
						return (
							<ReportContainer
								key={id}
								dateTime={createdAt}
								report={report}
							/>
						);
					}}
				/>
			</ScrollView>
		</View>
	);
};

export default ChildReports;
