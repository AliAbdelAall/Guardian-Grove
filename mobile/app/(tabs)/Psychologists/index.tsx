import React, { useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

// Styles
import { psychologistsStyles } from "../../../Styles/psychologists/psycholoists";

// Redux
import { psychologistsSliceName } from "../../../core/redux/Psychologists";
import { RootState } from "../../../core/redux/store";
import { useSelector } from "react-redux";
import PsychologistCard from "../../../components/PsychologistCard";

// Components
import FilterButton from "../../../components/FilterButton";
import SearchInput from "../../../components/SearchInput";

const Psychologists = () => {
	const psychologists = useSelector(
		(global: RootState) => global[psychologistsSliceName]
	);

	const [activeButton, setActiveButton] = useState("All");
	const [searchText, setSearchText] = useState("");
	console.log(searchText);

	const filteredPsychologists = psychologists.filter((psychologist) => {
		if (
			activeButton !== "All" &&
			psychologist.speciality !== activeButton
		) {
			return false;
		}
		if (
			searchText.trim() !== "" &&
			!`Dr. ${psychologist.firstName}${psychologist.lastName}`
				.toLowerCase()
				.includes(searchText.toLowerCase())
		) {
			return false;
		}
		return true;
	});

	const handlePress = (buttonName: string) => {
		setActiveButton(buttonName);
	};

	return (
		<View style={psychologistsStyles.psychologistsContainer}>
			<SearchInput value={searchText} handleTextChange={setSearchText} />

			<View style={psychologistsStyles.filterButtonsWrapper}>
				<FilterButton
					isActive={activeButton === "All"}
					name="All"
					handlePress={() => handlePress("All")}
				/>
				<FilterButton
					isActive={activeButton === "Family"}
					name="Family"
					handlePress={() => handlePress("Family")}
				/>
				<FilterButton
					isActive={activeButton === "Development"}
					name="Development"
					handlePress={() => handlePress("Development")}
				/>
				<FilterButton
					isActive={activeButton === "Recent"}
					name="Recent"
					handlePress={() => handlePress("Recent")}
				/>
			</View>
			<FlatList
				data={filteredPsychologists}
				numColumns={2}
				ItemSeparatorComponent={() => {
					return <View style={{ height: 15 }}></View>;
				}}
				columnWrapperStyle={{ justifyContent: "space-between" }}
				renderItem={(psychologist) => {
					const {
						id,
						firstName,
						lastName,
						profilePic,
						rating,
						speciality,
					} = psychologist.item;

					return (
						<TouchableOpacity
							onPress={() =>
								router.push(`/PsychologistProfile/${id}`)
							}
						>
							<PsychologistCard
								key={id}
								id={id}
								profilePic={`${process.env.EXPO_PUBLIC_PROFILE_PICS_URL}${profilePic}`}
								name={`${firstName} ${lastName}`}
								speciality={speciality}
								rating={rating}
							/>
						</TouchableOpacity>
					);
				}}
			/>
		</View>
	);
};

export default Psychologists;
