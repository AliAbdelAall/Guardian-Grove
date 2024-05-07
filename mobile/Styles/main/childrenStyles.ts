import { StyleSheet } from "react-native";

export const childrenStyles = StyleSheet.create({
	childrenContainer: {
		flex: 1,
	},
	ChildrenScrollable: {
		display: "flex",
		flexDirection: "column",
		paddingLeft: 20,
		paddingRight: 20,
		backgroundColor: "#fff",
		paddingBottom: 15,
	},
	childrenTextWrapper: {
		width: "100%",
		display: "flex",
		alignItems: "center",
	},
	childrenText: {
		width: "80%",
		marginTop: 12,
		marginBottom: 20,
		lineHeight: 25,
		textAlign: "center",
		color: "#677294",
		fontSize: 16,
	},
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
	popupContainer: {
		flex: 1,
		justifyContent: "flex-end",
	},
	overlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	popupWrapper: {
		display: "flex",
		gap: 20,
		backgroundColor: "#fff",
		height: 500,
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
	pickerInputWrapper: {
		borderWidth: 1,
		borderRadius: 10,
		borderColor: "#B3B9CA",
	},
	addChildButtonWrapper: {
		padding: 20,
		shadowColor: "#3A3A3A",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		marginTop: 3,
		zIndex: 1,
		backgroundColor: "white",
	},
});
