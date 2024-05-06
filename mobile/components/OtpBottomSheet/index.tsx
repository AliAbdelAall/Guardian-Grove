import React, { FC, useState } from "react";
import { Modal, StyleSheet, Text, TextInput, View } from "react-native";
import { styles } from "./styles";
import LoginButton from "../../components/LoginButton";
import LoginInput from "../../components/LoginInput";

type Props = {
	visibility: boolean;
	setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
};

const OtpBottomSheet: FC<Props> = ({ visibility, setVisibility }) => {
	const [email, setEmail] = useState("");
	const [OTP, setOTP] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");
	const [step, setstep] = useState(1);
	const [sheetVisibility, setSheetVisibility] = useState(true);

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
									value={email}
									handlechange={(e: string) => setEmail(e)}
								/>
							)}
							{step === 2 && (
								<LoginInput
									placeholder={"1234"}
									value={OTP}
									handlechange={(e: string) => setOTP(e)}
								/>
							)}
							{step === 3 && (
								<View style={styles.passwordResetInputsWrapper}>
									<LoginInput
										placeholder={"New Password"}
										value={newPassword}
										handlechange={(e: string) =>
											setNewPassword(e)
										}
									/>
									<LoginInput
										placeholder={"Re-enter Password"}
										value={confirmNewPassword}
										handlechange={async (e: string) =>
											setConfirmNewPassword(e)
										}
									/>
								</View>
							)}
							{(step === 1 || step === 2) && (
								<View style={styles.buttonsContainer}>
									<View style={styles.halfButton}>
										<LoginButton
											handlePress={() => {
												setstep(1);
												setVisibility(false);
											}}
											text={"Cancel"}
										/>
									</View>
									<View style={styles.halfButton}>
										<LoginButton
											handlePress={() => {
												setstep(step + 1);
												setSheetVisibility(false);
												setTimeout(() => {
													setSheetVisibility(true);
												}, 100);
											}}
											text={"Next"}
										/>
									</View>
								</View>
							)}
							{step === 3 && (
								<LoginButton
									handlePress={() => {
										setstep(1);
										setVisibility(false);
									}}
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
