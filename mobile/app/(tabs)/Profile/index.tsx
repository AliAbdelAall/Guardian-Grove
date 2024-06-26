import React, { useState } from "react";
import { Button, Image, Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";

// Styles
import { profileStyles } from "../../../Styles/main/profileStyles";

// Redux
import { RootState } from "../../../core/redux/store";
import {
	updateDob,
	updateProfilePic,
	userSliceName,
} from "../../../core/redux/user/index.";
import { useDispatch, useSelector } from "react-redux";

// Components
import LoginButton from "../../../components/LoginButton";
import ProfileInput from "../../../components/ProfileInput";
import { useSendRequest } from "../../../core/tools/remote/request";
import { requestMethods } from "../../../core/enum/requestMetods";

// Tools
import DateTimePicker from "react-native-modal-datetime-picker";
import Toast from "react-native-toast-message";

// Assets
const profilePic = require("../../../assets/profile/profile.jpg");

// Icons
import FontAwesome from "@expo/vector-icons/FontAwesome";
import DateInput from "../../../components/DateInput";

const Profile = () => {
	const user = useSelector((global: RootState) => global[userSliceName]);
	const dispatch = useDispatch();
	const sendRequest = useSendRequest();
	const router = useRouter();

	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const [prevDob, setPrevDob] = useState(user.dob);

	const selectImage = async (useLibarary: boolean) => {
		let result: ImagePicker.ImagePickerResult;

		if (useLibarary) {
			result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [4, 4],
				quality: 0.75,
			});
		} else {
			result = await ImagePicker.launchCameraAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [4, 4],
				quality: 0.75,
			});
		}
		if (!result.canceled) {
			handleImageupload(result.assets[0].uri);
			console.log(result.assets[0].uri);
		}
	};

	const showDatePicker = () => {
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

	const handleDateConfirmation = (date: string) => {
		const inputDate = new Date(date);

		const year = inputDate.getFullYear();
		const month = String(inputDate.getMonth() + 1).padStart(2, "0");
		const day = String(inputDate.getDate()).padStart(2, "0");

		const formattedDateString = `${year}-${month}-${day}T00:00:00.000Z`;

		dispatch(updateDob(formattedDateString));

		sendRequest(requestMethods.PUT, "/api/parent/edit-dob", {
			dob: `${formattedDateString}`,
		})
			.then((response) => {
				if (response.status === 200) {
					Toast.show({
						type: "success",
						text1: "Updated successfully",
					});
					setPrevDob(formattedDateString);
				}
			})
			.catch((error) => {
				Toast.show({
					type: "error",
					text1: "Something went wrong",
				});
				dispatch(updateDob(prevDob));
			});
	};

	const handleImageupload = async (imageURI: string) => {
		const blob = await fetch(imageURI).then((response) => response.blob());
		const formData = new FormData();
		formData.append("image", blob);
		sendRequest(
			requestMethods.POST,
			"api/parent/update-profile-picture",
			formData
		)
			.then((response) => {
				if (response.status === 200) {
					dispatch(updateProfilePic(response.data.profilePic));
					Toast.show({
						type: "success",
						text1: "Updated successfully",
					});
				}
			})
			.catch((error) => {
				Toast.show({
					type: "error",
					text1: "Something went wrong",
				});
				console.log(error.response);
			});
	};

	return (
		<View>
			<View style={profileStyles.profilePicContainer}>
				<Text style={profileStyles.profileText}>
					Update your profile to connect with people with better
					impression.
				</Text>
				<View style={profileStyles.profileImageWrapper}>
					<Image
						style={profileStyles.profileImage}
						src={`${process.env.EXPO_PUBLIC_PROFILE_PICS_URL}${user.profilePic}`}
					/>
					<Pressable onPress={() => selectImage(false)}>
						<View style={profileStyles.editProfile}>
							<FontAwesome
								name="camera"
								size={16}
								color={"#677294"}
							/>
						</View>
					</Pressable>
				</View>
			</View>

			<View style={profileStyles.infoContainer}>
				<Text style={profileStyles.infoText}>Personal Information</Text>
				<View style={profileStyles.inputContainer}>
					<ProfileInput
						label={"Name"}
						input={`${user.firstName} ${user.lastName}`}
					/>
					<ProfileInput label={"Email"} input={user.email} />
					<DateInput
						dob={user?.dob}
						prevDob={prevDob}
						handleDateConfirmation={handleDateConfirmation}
					/>

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
