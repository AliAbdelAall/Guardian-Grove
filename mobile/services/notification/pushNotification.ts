// src/services/PushNotificationService.js
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import * as Device from "expo-device";
import { useSendRequest } from "../../core/tools/remote/request";
import { requestMethods } from "../../core/enum/requestMetods";

export async function registerForPushNotificationsAsync() {
	const sendRequest = useSendRequest();
	if (!Device.isDevice) {
		console.warn("Must use physical device for Push Notifications");
		return;
	}

	const { status: existingStatus } = await Permissions.getAsync(
		Permissions.NOTIFICATIONS
	);
	let finalStatus = existingStatus;

	if (existingStatus !== "granted") {
		const { status } = await Permissions.askAsync(
			Permissions.NOTIFICATIONS
		);
		finalStatus = status;
	}

	if (finalStatus !== "granted") {
		alert("Failed to get push token for push notification!");
		return;
	}

	const token = (await Notifications.getExpoPushTokenAsync()).data;
	console.log("FCM Token:", token);

	sendRequest(requestMethods.POST, "/api/device-token/save-token", {
		token,
	})
		.then((response) => {
			if (response.status === 201) {
				console.log(response.data.message);
			}
		})
		.catch((error) => {
			console.log(error.response);
		});
}
