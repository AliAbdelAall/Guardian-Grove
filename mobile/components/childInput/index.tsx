import React, { FC } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { styles } from "./styles";

type props = {
	label: string;
	value: string;
	placeholder: string;
	handleChange: (value: String) => void;
};
const ChildInput: FC<props> = ({ label, value, placeholder, handleChange }) => {
	return (
		<View style={styles.inputWrapper}>
			<Text style={styles.inputlabel}>{label}</Text>
			<TextInput
				placeholder={placeholder}
				placeholderTextColor={styles.placeholder.color}
				style={styles.inputValue}
				value={value}
				onChangeText={handleChange}
			/>
		</View>
	);
};

export default ChildInput;
