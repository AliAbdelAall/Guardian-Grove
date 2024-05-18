// src/services/PushNotificationService.js
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import * as Device from "expo-device";
import { router } from "expo-router";

export async function registerForPushNotificationsAsync() {
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

	const token = (
		await Notifications.getExpoPushTokenAsync({
			projectId: "7a429193-c95f-45bc-83ce-365bc842d481",
		})
	).data;

	return token ? token : "";
}

export function registerNotificationHandlers() {
	Notifications.setNotificationHandler({
		handleNotification: async () => ({
			shouldShowAlert: true,
			shouldPlaySound: true,
			shouldSetBadge: false,
		}),
	});

	Notifications.addNotificationReceivedListener((notification) => {
		console.log("Notification received:", notification);
	});

	Notifications.addNotificationResponseReceivedListener((response) => {
		console.log("Notification response received:", response);

		const data = response.notification.request.content.data;

		if (data.screen && data.childId) {
			router.push(`${data.screen}${data.childId}`);
		}
	});
}
