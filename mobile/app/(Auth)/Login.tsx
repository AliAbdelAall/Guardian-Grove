import React, { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";

//  Styles
import generalStyles from "../../Styles/generalStyles";
import { styles } from "../../Styles/authStyles";

// Tools
import { useSendRequest } from "../../core/tools/remote/request";
import { requestMethods } from "../../core/enum/requestMetods";
import { setLocalUser } from "../../core/tools/local/user";
import Toast from "react-native-toast-message";

// Assets
const logo = require("../../assets/logo/logo.png");

// Components
import LoginButton from "../../components/LoginButton";
import LoginInput from "../../components/LoginInput";
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
			<Image source={logo} style={styles.logo}></Image>
			<View style={styles.authWrapper}>
				<Text style={generalStyles.h1}>Welcome back</Text>
				<Text style={styles.authText}>
					You can search course, apply course and find scholarship for
					abroad studies
				</Text>
			</View>
			<OtpBottomSheet
				visibility={isbottomSheetVisible}
				setVisibility={setBottomSheetVisibility}
			/>
			<View style={styles.authInputs}>
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
						<Text style={styles.forgotPasswordText}>
							Forgot Password?
						</Text>
					</Pressable>
				</View>

				<LoginButton
					text={"Login"}
					handlePress={handleLoginValidation}
				/>
				<View style={styles.authSwitchWrapper}>
					<Text style={styles.authSwitchText}>
						{"Don't have an account? "}
					</Text>
					<Pressable
						onPress={() => {
							router.replace("/Signup");
						}}
					>
						<Text style={styles.authSwitch}>Sign Up</Text>
					</Pressable>
				</View>
			</View>
			<Toast />
		</View>
	);
};

export default Login;
