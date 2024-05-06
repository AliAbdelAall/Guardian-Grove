import bottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	bottomSheetContainer: {
		flex: 1,
		justifyContent: "flex-end",
	},
	bottomSheetWrapper: {
		display: "flex",
		gap: 20,
		backgroundColor: "#fff",
		height: 400,
		paddingTop: 35,
		paddingLeft: 25,
		paddingRight: 25,
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
	},
	buttonsContainer: {
		display: "flex",
		flexDirection: "row",
		gap: 10,
	},
	halfButton: {
		maxWidth: "48.8%",
	},
	bottomSheetHeading: {
		fontSize: 24,
		fontWeight: "600",
		color: "#333333",
	},
	bottomSheetText: {
		fontSize: 16,
		color: "#677294",
	},
	passwordResetInputsWrapper: {
		display: "flex",
		flexDirection: "column",
		gap: 10,
	},
});
