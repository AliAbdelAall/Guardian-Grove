import React, { useState } from "react";
import { Button, Image, Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";

// Styles
import { profileStyles } from "../../../Styles/main/profileStyles";

// Redux
import { RootState } from "../../../core/redux/store";
import { updateDob, userSliceName } from "../../../core/redux/user/index.";

// Components
import LoginButton from "../../../components/LoginButton";
import ProfileInput from "../../../components/ProfileInput";
import DateTimePicker from "react-native-modal-datetime-picker";
import { useDispatch, useSelector } from "react-redux";
import { useSendRequest } from "../../../core/tools/remote/request";
import { requestMethods } from "../../../core/enum/requestMetods";
import Toast from "react-native-toast-message";

// Assets
const profilePic = require("../../../assets/profile/profile.jpg");

const Profile = () => {
	const user = useSelector((global: RootState) => global[userSliceName]);
	const dispatch = useDispatch();
	const sendRequest = useSendRequest();
	const router = useRouter();

	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const [prevDob, setPrevDob] = useState(user.dob);

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
					<Pressable>
						<View style={profileStyles.editProfile}></View>
					</Pressable>
				</View>
			</View>

			<View>
				<DateTimePicker
					isVisible={isDatePickerVisible}
					mode="date"
					onConfirm={(e) => handleDateConfirmation(e.toDateString())}
					onCancel={hideDatePicker}
				/>
			</View>

			<View style={profileStyles.infoContainer}>
				<Text style={profileStyles.infoText}>Personal Information</Text>
				<View style={profileStyles.inputContainer}>
					<ProfileInput
						label={"Name"}
						input={`${user.firstName} ${user.lastName}`}
					/>
					<ProfileInput label={"Email"} input={user.email} />
					<View>
						<ProfileInput
							label={"Date Of Birth"}
							input={user?.dob?.slice(0, 10) ?? prevDob}
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
