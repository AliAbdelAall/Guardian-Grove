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

const ChildReports = () => {
	const id = 1;
	const childId = 1;
	const teachers = useSelector(
		(global: RootState) => global[teachersSliceName]
	);
	const children = useSelector(
		(global: RootState) => global[childrenSliceName]
	);
	const teacher = teachers.find((teacher) => (teacher.id = id));

	const student = children.find(
		(child) => parseInt(child.teacherId) === childId
	);

	return (
		<View>
			<Stack.Screen
				options={{
					title: `${teacher.firstName} ${teacher.lastName}`,
				}}
			/>
			<View style={ChildStyles.ReportsContainer}>
				<View style={ChildStyles.childInfoWrapper}>
					<Image
						src={`${process.env.EXPO_PUBLIC_PROFILE_PICS_URL}${student.profilePic}`}
						style={{
							height: 55,
							width: 55,
							borderRadius: 28,
						}}
					/>
					<Text style={ChildStyles.childInfoName}>
						{student.name}
					</Text>
				</View>
				<View>
					<View style={ChildStyles.reportContainer}>
						<View>
							<Text style={ChildStyles.dateText}>03/4/2024</Text>
							<Text style={ChildStyles.reportText}>
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit. Vivamus sit amet lectus nec
								dolor imperdiet consectetur. Donec non ex quis
								leo vehicula mattis.
							</Text>
						</View>
					</View>
					<View style={ChildStyles.reportContainer}>
						<View>
							<Text style={ChildStyles.dateText}>03/4/2024</Text>
							<Text style={ChildStyles.reportText}>
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit. Vivamus sit amet lectus nec
								dolor imperdiet consectetur. Donec non ex quis
								leo vehicula mattis.
							</Text>
						</View>
					</View>
					<View style={ChildStyles.reportContainer}>
						<View>
							<Text style={ChildStyles.dateText}>03/4/2024</Text>
							<Text style={ChildStyles.reportText}>
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit. Vivamus sit amet lectus nec
								dolor imperdiet consectetur. Donec non ex quis
								leo vehicula mattis.
							</Text>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
};

export default ChildReports;
