import React, { useState } from "react";
import {
	Image,
	Pressable,
	Text,
	TextInput,
	View,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import LoginButton from "../../../components/LoginButton";
import { useRouter } from "expo-router";
const profilePic = require("../../../assets/profile/profile.jpg");
import { profileStyles } from "../../../Styles/main/profileStyles";

const Profile = () => {
	const [dob, setDob] = useState(
		new Date().toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		})
	);

	const router = useRouter();

	const parent = {
		name: "John Doe",
		email: "john@gmai.com",
		dob,
	};

	return (
		<View>
			{/* Header */}
			<View style={profileStyles.profilePicContainer}>
				<Text style={profileStyles.profileText}>
					Update your profile to connect with people with better
					impression.
				</Text>
				{/* ProfilePic */}
				<View style={profileStyles.profileImageWrapper}>
					<Image
						style={profileStyles.profileImage}
						source={profilePic}
					/>
					<Pressable>
						<View style={profileStyles.editProfile}></View>
					</Pressable>
				</View>
			</View>

			<View style={profileStyles.infoContainer}>
				<Text style={profileStyles.infoText}>Personal Information</Text>
				<View style={profileStyles.inputContainer}>
					<View style={profileStyles.inputWrapper}>
						<Text style={profileStyles.inputlabel}>Name</Text>
						<TextInput
							editable={false}
							style={profileStyles.inputValue}
							value={parent.name}
						/>
					</View>
					<View style={profileStyles.inputWrapper}>
						<Text style={profileStyles.inputlabel}>Email</Text>
						<TextInput
							editable={false}
							style={profileStyles.inputValue}
							value={parent.email}
						/>
					</View>
					<View style={profileStyles.inputWrapper}>
						<Text style={profileStyles.inputlabel}>Birth Date</Text>
						<TextInput
							editable={false}
							style={profileStyles.inputValue}
							value={parent.dob}
						/>
					</View>
					<LoginButton
						text={"Children"}
						handlePress={() => router.push("/Profile/Children")}
					/>
				</View>
			</View>
		</View>
	);
};

export default Profile;
