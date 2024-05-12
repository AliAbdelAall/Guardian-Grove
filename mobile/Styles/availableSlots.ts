import { StyleSheet } from "react-native";

export const slotsStyles = StyleSheet.create({
	avilableSlots: {
		padding: 20,
	},
	avilableSlotWrpper: {
		width: 100,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		padding: 5,
		borderRadius: 10,
		backgroundColor: "#75AB19",
	},
	avilableSlotText: {
		fontSize: 16,
		fontWeight: "500",
		color: "#fff",
	},
	selectedSlotText: {
		marginTop: 25,
		color: "#677294",
		marginBottom: 5,
	},
});
