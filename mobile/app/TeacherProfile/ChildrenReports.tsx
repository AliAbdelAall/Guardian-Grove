import React from "react";
import {
	View,
	Text,
	ScrollView,
	FlatList,
	Image,
	Pressable,
} from "react-native";
import { Stack, router } from "expo-router";

// Styles
import { ChildStyles } from "../../Styles/ChildReport";

// Redux
import { teachersSliceName } from "../../core/redux/teachers";
import { childrenSliceName } from "../../core/redux/children";
import { useSelector } from "react-redux";
import { RootState } from "../../core/redux/store";
import { reportsSliceName } from "../../core/redux/reports";
import ChildNameImage from "../../components/ChildNameImage";
import ReportContainer from "../../components/ReportContainer";

const ChildrenReports = () => {
	const id = 1;
	const teachers = useSelector(
		(global: RootState) => global[teachersSliceName]
	);
	const children = useSelector(
		(global: RootState) => global[childrenSliceName]
	);
	const reports = useSelector(
		(global: RootState) => global[reportsSliceName]
	);

	const teacher = teachers.find((teacher) => (teacher.id = id));

	const students = children.filter((child) => child.teacherId === id);

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
				}}
			/>
			<ScrollView style={ChildStyles.ReportsContainer}>
				<FlatList
					data={studentsWithReport}
					scrollEnabled={false}
					renderItem={(student) => {
						const { id, name, profilePic, report } = student.item;
						return (
							report && (
								<View key={id}>
									<ChildNameImage
										key={name}
										name={name}
										profilePic={profilePic}
									/>
									<ReportContainer
										key={id}
										dateTime={report.createdAt}
										report={report.report}
										route="/TeacherProfile/ChildReports"
									/>
								</View>
							)
						);
					}}
				/>
			</ScrollView>
		</View>
	);
};

export default ChildrenReports;
