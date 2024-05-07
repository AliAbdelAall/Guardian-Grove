import { StyleSheet } from "react-native";

export const ChildStyles = StyleSheet.create({
	childInfoWrapper: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		gap: 15,
	},
	ReportsContainer: {
		marginTop: 40,
		paddingLeft: 20,
		paddingRight: 20,
	},
	childInfoName: {
		fontSize: 18,
		color: "#75AB19",
	},
	reportContainer: {
		display: "flex",
		padding: 10,
		marginTop: 5,
		borderRadius: 10,
		backgroundColor: "#ECECEC",
	},
	reportWrapper: {
		padding: 10,
	},
	dateText: {
		fontSize: 18,
		fontWeight: "500",
		marginBottom: 5,
		color: "#333333",
	},
	reportText: {
		fontSize: 16,
		color: "#677294",
	},
	seeAllText: {
		fontSize: 14,
		marginTop: 5,
		color: "#75AB19",
		alignSelf: "flex-end",
	},
});
