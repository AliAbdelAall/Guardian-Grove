import { Stack } from "expo-router";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../core/redux/store";
import io from "socket.io-client";

const socket = io("http://localhost:3000");
socket.emit("connection", () => {
	console.log(socket);
});
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
				<Stack.Screen
					name="index"
					options={{
						headerShown: false,
					}}
				/>
			</Stack>
		</Provider>
	);
};

export default RootLayout;
