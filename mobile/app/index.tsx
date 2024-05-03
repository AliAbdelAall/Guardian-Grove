import React from "react";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Redirect, Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../core/redux/store";

const App = () => {
	return (
		<>
			<Stack>
				<Stack.Screen name="Login" redirect={true} />
				<Stack.Screen name="Signup" />
				<Stack.Screen name="Home" />
				<Stack.Screen name="Profile" />
				<Stack.Screen name="Children" />
			</Stack>
			<Redirect href={"Login"} />
			<StatusBar style="auto" />
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default App;
