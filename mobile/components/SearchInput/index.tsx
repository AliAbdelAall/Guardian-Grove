import { View, Text, TextInput } from "react-native";
import React, { FC } from "react";

// Styles
import { styles } from "./styles";

// Icons
import FontAwesome from "@expo/vector-icons/FontAwesome";

type props = {
	value: string;
	handleTextChange: React.Dispatch<React.SetStateAction<string>>;
};

const SearchInput: FC<props> = ({ value, handleTextChange }) => {
	return (
		<View style={styles.searchInputwrapper}>
			<TextInput
				placeholderTextColor={"#B3B9CA"}
				style={styles.searchInput}
				placeholder="Search"
				value={value}
				onChangeText={handleTextChange}
			/>
			<FontAwesome
				size={16}
				style={styles.searchIcon}
				name="search"
			/>
		</View>
	);
};

export default SearchInput;
