import { Stack } from "expo-router";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../core/redux/store";

const RootLayout = () => {
	return (
		<Provider store={store}>
			<Stack>
				<Stack.Screen
					name="(Auth)"
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="(tabs)"
					options={{
						headerShown: false,
					}}
				/>
			</Stack>
		</Provider>
	);
};

export default RootLayout;
