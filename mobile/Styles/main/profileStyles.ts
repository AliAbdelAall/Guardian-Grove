import { StyleSheet } from "react-native";

export const profileStyles = StyleSheet.create({
	profilePicContainer: {
		backgroundColor: "#75AB19",
		height: 230,
		display: "flex",
		alignItems: "center",
		borderBottomRightRadius: 30,
		borderBottomLeftRadius: 30,
	},
	profileText: {
		width: "80%",
		marginTop: 12,
		marginBottom: 10,
		lineHeight: 25,
		textAlign: "center",
		color: "white",
		fontSize: 16,
	},
	profileImageWrapper: {
		position: "relative",
	},
	profileImage: {
		width: 135,
		height: 135,
		borderRadius: 70,
	},
	editProfile: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: 30,
		height: 30,
		borderRadius: 15,
		backgroundColor: "white",
		position: "absolute",
		bottom: 0,
		right: "10%",
	},
	infoText: {
		color: "#333333",
		fontSize: 20,
		marginTop: 15,
		marginBottom: 15,
		fontWeight: "500",
	},
	infoContainer: {
		paddingLeft: 20,
		paddingRight: 20,
	},
	inputContainer: {
		display: "flex",
		flexDirection: "column",
		gap: 12,
	},
	inputWrapper: {
		height: 60,
		padding: 10,
		borderColor: "#B3B9CA",
		borderWidth: 1,
		borderRadius: 10,
	},
	inputlabel: {
		color: "#75AB19",
		fontSize: 12,
	},
	inputValue: {
		fontSize: 18,
		color: "#677294",
	},

	dateInputWrapper: {
		position: "relative",
		width: "100%",
		marginBottom: 25,
	},
	calendarIconwrapper: {
		position: "absolute",
		right: 15,
		top: "50%",
	},
	calendarIcon: {
		color: "#677294",
	},
});
