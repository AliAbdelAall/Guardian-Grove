import React from "react";
import {
	FlatList,
	Pressable,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

// Redux
import { psychologistsSliceName } from "../../../core/redux/Psychologists";
import { RootState } from "../../../core/redux/store";
import { useSelector } from "react-redux";
import PsychologistCard from "../../../components/PsychologistCard";

// Icons
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Psychologists = () => {
	const psychologists = useSelector(
		(global: RootState) => global[psychologistsSliceName]
	);

	return (
		<View style={{ flex: 1, paddingLeft: 20, paddingRight: 20 }}>
			<View>
				<TextInput placeholder="Search" />
			</View>
			<View>
				<Pressable>
					<Text>All</Text>
				</Pressable>
				<Pressable>
					<Text>Family</Text>
				</Pressable>
				<Pressable>
					<Text>Development</Text>
				</Pressable>
				<Pressable>
					<Text>Recent</Text>
				</Pressable>
			</View>
			<FlatList
				data={psychologists}
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
