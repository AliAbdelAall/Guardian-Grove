import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 40,
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	logo: {
		width: 100,
		height: 100,
	},
	authWrapper: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: "80%",
	},
	authText: {
		textAlign: "center",
		lineHeight: 24,
		marginBottom: 25,
		color: "#677294",
	},
	authInputs: {
		gap: 15,
		minWidth: "100%",
	},
	forgotPasswordText: {
		fontSize: 16,
		paddingTop: 12,
		paddingBottom: 40,
		fontWeight: "500",
		color: "#677294",
	},
	authSwitchWrapper: {
		display: "flex",
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "center",
	},
	authSwitchText: {
		fontSize: 16,
		textAlign: "center",
		color: "#677294",
	},
	authSwitch: {
		fontWeight: "600",
		color: "#75AB19",
		alignSelf: "center",
		fontSize: 16,
	},
	authSwitchButton: {
		paddingVertical: 0,
		alignSelf: "flex-end",
	},
});
