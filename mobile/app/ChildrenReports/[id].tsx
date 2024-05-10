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

// components
import ChildNameImage from "../../components/ChildNameImage";
import ReportContainer from "../../components/ReportContainer";

const ChildrenReports = () => {
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

	const teacher = teachers.find(
		(teacher) => teacher.id === JSON.parse(id[0])
	);

	const students = children.filter(
		(child) => child.teacherId === JSON.parse(id[0])
	);

	const studentsWithReport = students.map((student) => {
		const latestReport = reports.find(
			(report) => report.childId === student.id
		);
		return { ...student, report: latestReport };
	});

	console.log(studentsWithReport);

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
			<View style={ChildStyles.ReportsContainer}>
				<FlatList
					data={studentsWithReport}
					scrollEnabled={false}
					renderItem={(student) => {
						const { name, profilePic, report } = student.item;
						return (
							report && (
								<View key={student.item.id}>
									<ChildNameImage
										key={name}
										name={name}
										profilePic={profilePic}
									/>
									<ReportContainer
										key={student.item.id}
										dateTime={report.createdAt}
										report={report.report}
										route={`/ChildReports/${student.item.id}`}
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

export default ChildrenReports;
