import React, { FC } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { styles } from "./styles";

type props = {
	label: string;
	input: string;
	placeholder?: string;
};
const ProfileInput: FC<props> = ({ label, input, placeholder }) => {
	return (
		<View style={styles.inputWrapper}>
			<Text style={styles.inputlabel}>{label}</Text>
			<TextInput
				placeholder={placeholder}
				placeholderTextColor={"#B3B9CA"}
				editable={false}
				style={styles.inputValue}
				value={input}
			/>
		</View>
	);
};

export default ProfileInput;
