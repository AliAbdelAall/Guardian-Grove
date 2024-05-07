import React, { useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";

// Styles
import { psychologistsStyles } from "../../../Styles/psychologists/psycholoists";

// Redux
import { RootState } from "../../../core/redux/store";
import { useSelector } from "react-redux";
import { teachersSliceName } from "../../../core/redux/teachers";

// Components
import SearchInput from "../../../components/SearchInput";
import TeacherCard from "../../../components/TeacherCard";
import { router } from "expo-router";

const teachers = () => {
	const teachers = useSelector(
		(global: RootState) => global[teachersSliceName]
	);

	const [searchText, setSearchText] = useState("");

	const filteredTeaches = teachers.filter(
		(teacher) =>
			`${teacher.firstName} ${teacher.lastName}`
				.toLowerCase()
				.includes(searchText.toLowerCase()) ||
			teacher.speciality
				.toLowerCase()
				.includes(searchText.toLowerCase()) ||
			teacher.school.toLowerCase().includes(searchText.toLowerCase())
	);

	return (
		<View style={psychologistsStyles.psychologistsContainer}>
			<SearchInput value={searchText} handleTextChange={setSearchText} />

			<FlatList
				data={filteredTeaches}
				numColumns={2}
				style={{ marginTop: 20 }}
				ItemSeparatorComponent={() => {
					return <View style={{ height: 8 }}></View>;
				}}
				columnWrapperStyle={{ justifyContent: "space-between" }}
				renderItem={(psychologist) => {
					const {
						id,
						firstName,
						lastName,
						profilePic,
						speciality,
						school,
					} = psychologist.item;

					return (
						<TouchableOpacity
							onPress={() => router.push("/TeacherProfile")}
						>
							<TeacherCard
								key={id}
								id={id}
								name={`${firstName}${lastName}`}
								profilePic={`${process.env.EXPO_PUBLIC_PROFILE_PICS_URL}${profilePic}`}
								school={school}
								speciality={`${speciality}`}
							/>
						</TouchableOpacity>
					);
				}}
			/>
		</View>
	);
};

export default teachers;
