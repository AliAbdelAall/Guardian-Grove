import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

//  Styles
import generalStyles from "../../Styles/generalStyles";

// Tools
import { useSendRequest } from "../../core/tools/remote/request";
import { requestMethods } from "../../core/enum/requestMetods";
import { setLocalUser } from "../../core/tools/local/user";

// Assets
const logo = require("../../assets/logo/logo.png");

// Components
import LoginButton from "../../components/LoginButton";
import LoginInput from "../../components/LoginInput";
import Toast from "react-native-toast-message";
import OtpBottomSheet from "../../components/OtpBottomSheet";
const Login = () => {
	const [error, setError] = useState({
		status: false,
		message: "",
	});
	const [credentials, setCredentials] = useState({
		username: "",
		password: "",
	});

	const [isbottomSheetVisible, setBottomSheetVisibility] = useState(false);

	const router = useRouter();
	const sendRequest = useSendRequest();

	const handleInputChange = (value: String, field: string) => {
		setCredentials({ ...credentials, [field]: value });
		console.log(credentials);
	};

	const handleLoginValidation = () => {
		const { username, password } = credentials;

		if (username.length < 3 || username.length > 20) {
			setError({
				...error,
				status: true,
				message: "Username must be 3->20 charachters",
			});
			return;
		}

		if (password.length < 8) {
			setError({
				...error,
				status: true,
				message: "Password must be at least 8 characters long",
			});
			return;
		}

		setError({ status: false, message: "" });

		console.log("before request");

		sendRequest(requestMethods.POST, "/api/auth/login", {
			...credentials,
		})
			.then((response) => {
				if (response.status === 200) {
					setLocalUser(response.data.token).then(() => {
						console.log(response.data);
						router.replace("/Home");
					});
				}
			})
			.catch((error) => {
				if (error.response.status === 400) {
					setError({
						...error,
						status: true,
						message: error.response.data.error,
					});
				}
				Toast.show({
					type: "error",
					text1: "Error",
					text2: error.response.data.error,
				});
				console.log(error.response);
			});
	};

	return (
		<View style={styles.container}>
			<Image source={logo} style={styles.image}></Image>
			<View style={[styles.center, styles.Width80]}>
				<Text style={generalStyles.h1}>Welcome back</Text>
				<Text style={[styles.textcenter, styles.lineHeight14]}>
					You can search course, apply course and find scholarship for
					abroad studies
				</Text>
			</View>
			<OtpBottomSheet
				visibility={isbottomSheetVisible}
				setVisibility={setBottomSheetVisibility}
			/>
			<View style={[styles.gap15, styles.fullWidth]}>
				<LoginInput
					value={credentials.username}
					handlechange={(value: string) =>
						handleInputChange(value, "username")
					}
					placeholder={"Username"}
				/>
				<View>
					<LoginInput
						value={credentials.password}
						handlechange={(value: string) =>
							handleInputChange(value, "password")
						}
						placeholder={"Password"}
						password={true}
					/>
					<Pressable onPress={() => setBottomSheetVisibility(true)}>
						<Text>Forgot Password?</Text>
					</Pressable>
				</View>

				<LoginButton
					text={"Login"}
					handlePress={handleLoginValidation}
				/>

				<Text style={[styles.textcenter, styles.fontSize16]}>
					{"Don't have an account? "}
					<Pressable
						onPress={() => {
							router.push("/Signup");
						}}
					>
						<Text style={[styles.fontMedium, styles.primaryColor]}>
							Sign Up
						</Text>
					</Pressable>
				</Text>
			</View>
			<Toast />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 30,
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	image: {
		width: 100,
		height: 100,
	},
	center: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	row: {
		flexDirection: "row",
	},
	fullWidth: {
		minWidth: "100%",
	},
	Width80: {
		width: "80%",
	},
	lineHeight14: {
		lineHeight: 24,
		marginBottom: 10,
	},

	autoStretch: {
		flex: 1,
	},
	loginButton: {
		height: 55,
		paddingLeft: 15,
		borderColor: "gray",
		borderWidth: 1,
		borderRadius: 12,
		width: "auto",
	},
	gap15: {
		gap: 15,
	},
	textcenter: {
		textAlign: "center",
	},
	backgroundRed: {
		backgroundColor: "red",
	},
	fontMedium: {
		fontWeight: "500",
	},
	primaryColor: {
		color: "#75AB19",
	},
	fontSize16: {
		fontSize: 16,
	},
});

export default Login;
