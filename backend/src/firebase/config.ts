import admin, { ServiceAccount } from "firebase-admin";
import serviceAccount from "../../serviceAccountKey.json";

const firebaseServiceAccount: ServiceAccount = serviceAccount as ServiceAccount;

admin.initializeApp({
	credential: admin.credential.cert(firebaseServiceAccount),
});

export const sendNotificationToParent = async (
	deviceToken: string,
	title: string,
	body: string,
	screen: string,
	childId: number
) => {
	try {
		const message = {
			to: deviceToken,
			sound: "default",
			title,
			body,
			data: {
				screen,
				childId,
			},
		};

		await fetch("https://exp.host/--/api/v2/push/send", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(message),
		});
		console.log("Notification sent successfully!");
	} catch (error) {
		console.error("Error sending notification:", error);
	}
};
