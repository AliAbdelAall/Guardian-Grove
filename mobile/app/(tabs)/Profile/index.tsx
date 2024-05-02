import React, { useState } from "react";
import { Button, Image, Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";

// Styles
import { profileStyles } from "../../../Styles/main/profileStyles";

// Components
import LoginButton from "../../../components/LoginButton";
import ProfileInput from "../../../components/ProfileInput";
import DateTimePicker from "react-native-modal-datetime-picker";

// Assets
const profilePic = require("../../../assets/profile/profile.jpg");

const Profile = () => {
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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

	const showDatePicker = () => {
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

	const handleConfirm = (date) => {
		console.warn("A date has been picked: ", date);
		hideDatePicker();
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

			<View>
				<DateTimePicker
					isVisible={isDatePickerVisible}
					mode="date"
					onConfirm={handleConfirm}
					onCancel={hideDatePicker}
				/>
			</View>

			<View style={profileStyles.infoContainer}>
				<Text style={profileStyles.infoText}>Personal Information</Text>
				<View style={profileStyles.inputContainer}>
					<ProfileInput label={"Name"} input={parent.name} />
					<ProfileInput label={"Email"} input={parent.email} />
					<View>
						<ProfileInput
							label={"Date Of Birth"}
							input={parent.dob}
						/>
						<Pressable onPress={showDatePicker}>
							<Text>show Date</Text>
						</Pressable>
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
