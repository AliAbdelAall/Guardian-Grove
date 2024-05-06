import React, { FC } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { styles } from "./styles";

type props = {
	label: string;
	input: string;
};
const ProfileInput: FC<props> = ({ label, input }) => {
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
