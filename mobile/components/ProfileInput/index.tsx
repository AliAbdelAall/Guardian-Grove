import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { styles } from "./styles";

const ProfileInput = ({ label, input }) => {
	return (
		<View style={styles.inputWrapper}>
			<Text style={styles.inputlabel}>{label}</Text>
			<TextInput
				editable={false}
				style={styles.inputValue}
				value={input}
			/>
		</View>
	);
};

export default ProfileInput;
