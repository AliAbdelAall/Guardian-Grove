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
const ChildrenReports = () => {
	const id = 1;
	const teachers = useSelector(
		(global: RootState) => global[teachersSliceName]
	);
	const children = useSelector(
		(global: RootState) => global[childrenSliceName]
	);
	const teacher = teachers.find((teacher) => (teacher.id = id));

	const students = children.filter(
		(child) => parseInt(child.teacherId) === id
	);
	return (
		<View>
			<Stack.Screen
				options={{
					title: `${teacher.firstName} ${teacher.lastName}`,
				}}
			/>
			<ScrollView style={ChildStyles.ReportsContainer}>
				<FlatList
					data={students}
					scrollEnabled={false}
					renderItem={(student) => {
						const { id, name, profilePic } = student.item;
						return (
							<View>
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
										<Text style={ChildStyles.dateText}>
											Last Report 03/4/2024
										</Text>
										<Text style={ChildStyles.reportText}>
											Lorem ipsum dolor sit amet,
											consectetur adipiscing elit. Vivamus
											sit amet lectus nec dolor imperdiet
											consectetur. Donec non ex quis leo
											vehicula mattis.{" "}
										</Text>
									</View>

									<Pressable
										onPress={() =>
											router.push(
												"/TeacherProfile/ChildReports"
											)
										}
									>
										<Text style={ChildStyles.seeAllText}>
											See All
										</Text>
									</Pressable>
								</View>
							</View>
						);
					}}
				/>
			</ScrollView>
		</View>
	);
};

export default ChildrenReports;
