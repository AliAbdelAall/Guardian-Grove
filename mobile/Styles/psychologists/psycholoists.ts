import { StyleSheet } from "react-native";

export const psychologistsStyles = StyleSheet.create({
	psychologistsContainer: {
		flex: 1,
		paddingLeft: 20,
		paddingRight: 20,
	},
	searchInputwrapper: {
		padding: 10,
		paddingLeft: 40,
		borderWidth: 1,
		borderColor: "#B3B9CA",
		borderRadius: 10,
		marginTop: 20,
		position: "relative",
	},
	searchIcon: {
		position: "absolute",
		top: "56%",

		left: 15,
		color: "#B3B9CA",
	},
	searchInput: {
		fontSize: 18,
		color: "#677294",
	},
	filterButtonsWrapper: {
		display: "flex",
		flexDirection: "row",
		gap: 10,
		marginTop: 20,
		marginBottom: 20,
	},
	activeFilter: {
		borderWidth: 1,
		borderColor: "#75AB19",
		backgroundColor: "#75AB19",
		paddingHorizontal: 15,
		paddingVertical: 5,
		borderRadius: 13,
	},
	activeFilterText: {
		fontWeight: "600",
		fontSize: 16,
		color: "#fff",
	},
	inactiveFilter: {
		borderWidth: 1,
		borderColor: "#75AB19",
		paddingHorizontal: 15,
		paddingVertical: 5,
		borderRadius: 13,
	},
	inactiveFilterText: {
		fontWeight: "600",
		fontSize: 16,
		color: "#75AB19",
	},
});
