import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

//  Styles
import generalStyles from "../../Styles/generalStyles";
import { styles } from "../../Styles/authStyles";

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

const Signup = () => {
	const [error, setError] = useState({
		status: false,
		message: "",
	});
	const [credentials, setCredentials] = useState({
		firstName: "",
		lastName: "",
		username: "",
		email: "",
		password: "",
		roleId: 1,
	});

	const router = useRouter();
	const sendRequest = useSendRequest();

	console.log(credentials);

	const handleInputChange = (value: String, field: string) => {
		setCredentials({ ...credentials, [field]: value });
		console.log(credentials);
	};

	const handleSignupValidation = () => {
		const { firstName, lastName, username, email, password, roleId } =
			credentials;
		const regex =
			/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

		if (firstName.length < 3) {
			setError({
				...error,
				status: true,
				message: "First Name must be at least 3 characters",
			});
			return;
		}
		if (lastName.length < 3) {
			setError({
				...error,
				status: true,
				message: "Last Name must be at least 3 characters",
			});
			return;
		}
		if (!regex.test(email)) {
			setError({ ...error, status: true, message: "Invalid email" });
			return;
		}
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

		sendRequest(requestMethods.POST, "/api/auth/signup", {
			...credentials,
		})
			.then((response) => {
				if (response.status === 201) {
					Toast.show({
						type: "error",
						text1: response.data.message,
					});
					setLocalUser(response.data.token);
					console.log(response.data);
					router.replace("/Home");
				}
			})
			.catch((error) => {
				Toast.show({
					type: "error",
					text1: error.response.error,
				});
				if (error.response.status === 400) {
					setError({
						...error,
						status: true,
						message: error.response.data.error,
					});
				}
			});
	};

	return (
		<View style={styles.container}>
			<Image source={logo} style={styles.logo}></Image>
			<View style={styles.authWrapper}>
				<Text style={generalStyles.h1}>Join us to start searching</Text>
				<Text style={styles.authText}>
					You can search course, apply course and find scholarship for
					abroad studies
				</Text>
			</View>

			<View style={styles.authInputs}>
				<View style={styles.splitInputsWrapper}>
					<LoginInput
						half={true}
						value={credentials.firstName}
						handlechange={(value: string) => {
							handleInputChange(value, "firstName");
						}}
						placeholder={"First Name"}
					/>
					<LoginInput
						half={true}
						value={credentials.lastName}
						handlechange={(value: String) =>
							handleInputChange(value, "lastName")
						}
						placeholder={"Last Name"}
					/>
				</View>
				<LoginInput
					value={credentials.username}
					handlechange={(value: string) =>
						handleInputChange(value, "username")
					}
					placeholder={"Username"}
				/>
				<LoginInput
					value={credentials.email}
					handlechange={(value: string) =>
						handleInputChange(value, "email")
					}
					placeholder={"Email"}
				/>
				<LoginInput
					value={credentials.password}
					handlechange={(value: string) =>
						handleInputChange(value, "password")
					}
					placeholder={"Password"}
					password={true}
				/>
				<LoginButton
					text={"Sign Up"}
					handlePress={handleSignupValidation}
				/>
				<View style={styles.authSwitchWrapper}>
					<Text style={styles.authSwitchText}>
						{"Already have an account? "}
					</Text>
					<Pressable
						onPress={() => {
							router.replace("/Login");
						}}
					>
						<Text style={styles.authSwitch}>Login</Text>
					</Pressable>
				</View>
			</View>
		</View>
	);
};

export default Signup;
