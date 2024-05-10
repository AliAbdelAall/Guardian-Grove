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

// Components
import ReportContainer from "../../components/ReportContainer";
import ChildNameImage from "../../components/ChildNameImage";

const ChildReports = () => {
	const id = 1;
	const childId = 1;
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

	const student = children.find((child) => child.teacherId === childId);

	const childreports = reports.filter((report) => report.childId === childId);

	return (
		<View>
			<Stack.Screen
				options={{
					title: `${teacher.firstName} ${teacher.lastName}`,
				}}
			/>
			<View style={ChildStyles.ReportsContainer}>
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
			</View>
		</View>
	);
};

export default ChildReports;
