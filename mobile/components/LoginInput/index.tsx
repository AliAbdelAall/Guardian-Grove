import React, { FC } from "react";
import { StyleSheet, TextInput, View } from "react-native";
type Props = {
	value: string;
	handlechange: (value: String) => void;
	placeholder: string;
	password?: boolean;
	half?: boolean;
};
const LoginInput: FC<Props> = ({
	value,
	handlechange,
	placeholder,
	password = false,
	half = false,
}) => {
	return (
		<TextInput
			style={[styles.loginInput, half ? styles.halfWidth : null]}
			value={value}
			onChangeText={handlechange}
			secureTextEntry={password}
			placeholder={placeholder}
			placeholderTextColor={"#B3B9CA"}
		/>
	);
};

const styles = StyleSheet.create({
	loginInput: {
		height: 50,
		paddingLeft: 15,
		borderColor: "#B3B9CA",
		borderWidth: 1,
		color: "#677294",
		borderRadius: 12,
		fontSize: 18,
	},
	fullWidth: {
		width: "100%",
	},
	halfWidth: {
		width: "48.4%",
	},
});

export default LoginInput;
