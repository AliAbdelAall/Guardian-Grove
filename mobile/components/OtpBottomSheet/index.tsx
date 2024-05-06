import React, { FC, useState } from "react";
import { Modal, StyleSheet, Text, TextInput, View } from "react-native";
import { styles } from "./styles";
import LoginButton from "../../components/LoginButton";
import LoginInput from "../../components/LoginInput";
import Toast from "react-native-toast-message";
import { useSendRequest } from "../../core/tools/remote/request";
import { requestMethods } from "../../core/enum/requestMetods";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
	visibility: boolean;
	setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
};

const OtpBottomSheet: FC<Props> = ({ visibility, setVisibility }) => {
	const initialIdfoState = {
		email: "",
		OTP: "",
		newPassword: "",
		confirmNewPassword: "",
	};
	const [info, setInfo] = useState(initialIdfoState);
	const [sheetVisibility, setSheetVisibility] = useState(true);
	const [step, setStep] = useState(1);

	const sendRequest = useSendRequest();

	console.log(info);

	const handleSendEmail = async () => {
		const { email } = info;
		const regex =
			/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		if (!regex.test(email)) {
			Toast.show({
				type: "error",
				text1: "Invalid Email",
			});
			return;
		}
		sendRequest(requestMethods.POST, "/api/otp/send-otp", {
			email,
		})
			.then(async (response) => {
				if (response.status === 201) {
					await AsyncStorage.setItem(
						"userId",
						JSON.stringify(response.data.userId)
					);
					setStep(step + 1);
					setSheetVisibility(false);
					setTimeout(() => {
						setSheetVisibility(true);
					}, 100);
				}
			})
			.catch((error) => {
				console.log("error: ", error.response);
				Toast.show({
					type: "error",
					text1: error.response.error,
				});
			});
	};

	const handleOtpvalidtion = async () => {
		const { OTP } = info;
		const stringifiedId = await AsyncStorage.getItem("userId");
		const id = JSON.parse(stringifiedId);
		if (isNaN(parseInt(OTP)) || OTP.length !== 4) {
			Toast.show({
				type: "error",
				text1: "OTP must be 4 numbers",
			});
			return;
		}
		sendRequest(requestMethods.POST, "/api/otp/verify-otp", {
			id,
			userOTP: OTP,
		})
			.then((response) => {
				if (response.status === 200) {
					Toast.show({
						type: "success",
						text1: "Verifiction Successful",
					});
					setStep(step + 1);
					setSheetVisibility(false);
					setTimeout(() => {
						setSheetVisibility(true);
					}, 100);
				}
			})
			.catch((error) => {
				console.log("error: ", error.response);
				Toast.show({
					type: "error",
					text1: error.response.error,
				});
			});
	};

	const handlePasswordReset = async () => {
		const { newPassword, confirmNewPassword } = info;
		const stringifiedId = await AsyncStorage.getItem("userId");
		const id = JSON.parse(stringifiedId);
		if (newPassword !== confirmNewPassword) {
			Toast.show({
				type: "error",
				text1: "passwords don't match",
			});
			return;
		}
		sendRequest(requestMethods.POST, "/api/otp/reset-password", {
			id,
			newPassword,
			confirmNewPassword,
		})
			.then((response) => {
				if (response.status === 200) {
					Toast.show({
						type: "success",
						text1: "Password Reset Successful",
					});
					setVisibility(false);
					setStep(1);
					setInfo(initialIdfoState);
				}
			})
			.catch((error) => {
				console.log("error: ", error.response);
				Toast.show({
					type: "error",
					text1: error.response.error,
				});
			});
	};

	return (
		<View>
			<Modal animationType="fade" transparent={true} visible={visibility}>
				<View style={styles.overlay}></View>
			</Modal>

			<Modal
				animationType="slide"
				transparent={true}
				visible={visibility && sheetVisibility}
			>
				<View style={styles.bottomSheetContainer}>
					<View>
						<View style={styles.bottomSheetWrapper}>
							<Text style={styles.bottomSheetHeading}>
								{step === 1 && "Forgot Password"}
								{step === 2 && "Enter 4 Digits Code"}
								{step === 3 && "Reset Password"}
							</Text>
							<Text style={styles.bottomSheetText}>
								{step === 1 &&
									"Enter your email for the verification proccesss,we will send 4 digits code to your email."}
								{step === 2 &&
									"Enter the 4 digits code that you received on your email."}
								{step === 3 &&
									"Set the new password for your account so you can login and access all the features."}
							</Text>

							{step === 1 && (
								<LoginInput
									placeholder={"Email"}
									value={info.email}
									handlechange={(e: string) =>
										setInfo({ ...info, email: e })
									}
								/>
							)}
							{step === 2 && (
								<LoginInput
									placeholder={"1234"}
									value={info.OTP}
									handlechange={(e: string) =>
										setInfo({ ...info, OTP: e })
									}
								/>
							)}
							{step === 3 && (
								<View style={styles.passwordResetInputsWrapper}>
									<LoginInput
										password={true}
										placeholder={"New Password"}
										value={info.newPassword}
										handlechange={(e: string) =>
											setInfo({ ...info, newPassword: e })
										}
									/>
									<LoginInput
										password={true}
										placeholder={"Re-enter Password"}
										value={info.confirmNewPassword}
										handlechange={async (e: string) =>
											setInfo({
												...info,
												confirmNewPassword: e,
											})
										}
									/>
								</View>
							)}
							{(step === 1 || step === 2) && (
								<View style={styles.buttonsContainer}>
									<View style={styles.halfButton}>
										<LoginButton
											handlePress={() => {
												setStep(1);
												setVisibility(false);
											}}
											text={"Cancel"}
										/>
									</View>
									<View style={styles.halfButton}>
										<LoginButton
											handlePress={() => {
												if (step === 1) {
													handleSendEmail();
												}
												if (step === 2) {
													handleOtpvalidtion();
												}
											}}
											text={"Next"}
										/>
									</View>
								</View>
							)}
							{step === 3 && (
								<LoginButton
									handlePress={handlePasswordReset}
									text={"Confirm"}
								/>
							)}
						</View>
					</View>
				</View>
			</Modal>
		</View>
	);
};

export default OtpBottomSheet;
