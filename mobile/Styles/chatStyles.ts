import { StyleSheet } from "react-native";

export const chatStyles = StyleSheet.create({
	chatContainer: {
		padding: 20,
	},
	conversationImage: {
		height: 70,
		width: 70,
		borderRadius: 35,
	},
	conversationWrapper: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 5,
		borderRadius: 10,
		backgroundColor: "#ECECEC",
		marginBottom: 10,
	},
	conversationInfoWrapper: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	conversationName: {
		fontSize: 20,
		color: "#677294",
	},
	onlineDot: {
		width: 15,
		height: 15,
		backgroundColor: "#75AB19",
		borderRadius: 8,
	},
	emptyStateText: {
		fontSize: 18,
		color: "#677294",
	},
});
