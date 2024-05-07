import React, { useState } from "react";
import {
	Animated,
	FlatList,
	Pressable,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

// Styles
import { psychologistsStyles } from "../../../Styles/psychologists/psycholoists";

// Redux
import { psychologistsSliceName } from "../../../core/redux/Psychologists";
import { RootState } from "../../../core/redux/store";
import { useSelector } from "react-redux";
import PsychologistCard from "../../../components/PsychologistCard";

// Icons
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FilterButton from "../../../components/FilterButton";

const Psychologists = () => {
	const psychologists = useSelector(
		(global: RootState) => global[psychologistsSliceName]
	);

	const [activeButton, setActiveButton] = useState("All");

	const handlePress = (buttonName: string) => {
		setActiveButton(buttonName);
	};

	return (
		<View style={psychologistsStyles.psychologistsContainer}>
			<View style={psychologistsStyles.searchInputwrapper}>
				<TextInput
					placeholderTextColor={"#B3B9CA"}
					style={psychologistsStyles.searchInput}
					placeholder="Search"
					value={searchText}
					onChangeText={setSearchText}
				/>
				<FontAwesome
					size={16}
					style={psychologistsStyles.searchIcon}
					name="search"
				/>
			</View>
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
						<TouchableOpacity>
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
