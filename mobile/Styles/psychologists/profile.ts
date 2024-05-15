import { StyleSheet } from "react-native";

export const psychoProfileStyles = StyleSheet.create({
	profilePicContainer: {
		backgroundColor: "#75AB19",
		height: 250,
		display: "flex",
		alignItems: "center",
		paddingTop: 5,
		borderBottomRightRadius: 30,
		borderBottomLeftRadius: 30,
		position: "relative",
	},
	profileImage: {
		width: 200,
		height: 200,
		borderRadius: 10,
	},
	profileBodyWrapper: {
		marginTop: 20,
		paddingLeft: 20,
		paddingRight: 20,
	},
	chatIcon: {
		color: "#fff",
		position: "absolute",
		right: 25,
		bottom: 20,
	},
});
