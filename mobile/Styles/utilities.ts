import { StyleSheet } from "react-native";

const utilities = StyleSheet.create({
	container: {
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 60,
		flex: 1,
	},
	image: {
		width: 100,
		height: 100,
	},

	center: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	row: {
		flexDirection: "row",
	},
	fullWidth: {
		minWidth: "100%",
	},
	Width80: {
		width: "80%",
	},
	lineHeight14: {
		lineHeight: 24,
		marginBottom: 10,
	},

	autoStretch: {
		flex: 1,
	},
	loginButton: {
		height: 55,
		paddingLeft: 15,
		borderColor: "gray",
		borderWidth: 1,
		borderRadius: 12,
		width: "auto",
	},
	gap15: {
		gap: 15,
	},
	textcenter: {
		textAlign: "center",
	},
	backgroundRed: {
		backgroundColor: "red",
	},
	fontMedium: {
		fontWeight: "500",
	},
	primaryColor: {
		color: "#75AB19",
	},
	fontSize16: {
		fontSize: 16,
	},
});

export default utilities;
