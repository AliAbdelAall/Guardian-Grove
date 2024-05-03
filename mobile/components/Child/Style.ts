import { StyleSheet } from "react-native";

export const Style = StyleSheet.create({
	childWrapper: {
		marginBottom: 25,
	},
	childImageWrapper: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
	},
	childImage: {
		width: 55,
		height: 55,
		borderRadius: 70,
	},
	childName: {
		fontSize: 22,
		color: "#677294",
		marginLeft: 12,
	},
	inputWrapper: {
		display: "flex",
		flexDirection: "column",
		gap: 10,
	},
});
