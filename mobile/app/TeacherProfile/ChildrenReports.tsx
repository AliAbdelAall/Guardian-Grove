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
									<View style={ChildStyles.childInfoWrapper}>
										<Image
											src={`${process.env.EXPO_PUBLIC_PROFILE_PICS_URL}${profilePic}`}
											style={{
												height: 55,
												width: 55,
												borderRadius: 28,
											}}
										/>
										<Text style={ChildStyles.childInfoName}>
											{name}
										</Text>
									</View>
									<View style={ChildStyles.reportContainer}>
										<View>
											<View
												style={
													ChildStyles.dateTimeWrapper
												}
											>
												<Text
													style={ChildStyles.dateText}
												>
													{`Last Report ${report.createdAt.slice(
														0,
														10
													)}`}
												</Text>
												<Text>
													{report.createdAt.slice(
														11,
														16
													)}
												</Text>
											</View>
											<Text
												style={ChildStyles.reportText}
											>
												{report.report}
											</Text>
										</View>

										<Pressable
											onPress={() =>
												router.push(
													"/TeacherProfile/ChildReports"
												)
											}
										>
											<Text
												style={ChildStyles.seeAllText}
											>
												See All
											</Text>
										</Pressable>
									</View>
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
