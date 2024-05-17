import admin, { ServiceAccount } from "firebase-admin";
import serviceAccount from "../../serviceAccountKey.json";

const firebaseServiceAccount: ServiceAccount = serviceAccount as ServiceAccount;

admin.initializeApp({
	credential: admin.credential.cert(firebaseServiceAccount),
});

export const sendNotificationToParent = async (
	deviceToken: string,
	title: string,
	body: string
) => {
	try {
		const message = {
			token: deviceToken,
			notification: {
				title,
				body,
			},
		};

		await admin.messaging().send(message);
		console.log("Notification sent successfully!");
	} catch (error) {
		console.error("Error sending notification:", error);
	}
};
