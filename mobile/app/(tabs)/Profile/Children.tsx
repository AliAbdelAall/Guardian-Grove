import React, { useState } from "react";
import { FlatList, Image, Modal, ScrollView, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";

// Styles
import { childrenStyles } from "../../../Styles/main/childrenStyles";

// Component
import ProfileInput from "../../../components/ProfileInput";
import LoginButton from "../../../components/LoginButton";
import Child from "../../../components/Child";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../core/redux/store";
import { addChild, childrenSliceName } from "../../../core/redux/children";
import LoginInput from "../../../components/LoginInput";
import DateInput from "../../../components/DateInput";

// Tools
import { useSendRequest } from "../../../core/tools/remote/request";
import { requestMethods } from "../../../core/enum/requestMetods";
import { schoolSliceName } from "../../../core/redux/schools";
import Toast from "react-native-toast-message";

// Assets
const ProfilePic = require("../../../assets/profile/profile.jpg");

const Children = () => {
	const children = useSelector(
		(global: RootState) => global[childrenSliceName]
	);
	const schools = useSelector((global: RootState) => global[schoolSliceName]);
	const [childInfo, setChildInfo] = useState({
		name: "",
		dob: "",
		schoolId: 0,
	});
	const [showPopoup, setShowPopoup] = useState(false);
	const dispatch = useDispatch();
	const sendRequest = useSendRequest();

	console.log(childInfo);

	const handleSchoolChange = (value: number, index: number) => {
		setChildInfo({ ...childInfo, schoolId: value });
	};

	const handleDateConfirmation = (date: string) => {
		const inputDate = new Date(date);

		const year = inputDate.getFullYear();
		const month = String(inputDate.getMonth() + 1).padStart(2, "0");
		const day = String(inputDate.getDate()).padStart(2, "0");

		const formattedDateString = `${year}-${month}-${day}T00:00:00.000Z`;
		console.log(inputDate, typeof inputDate);
		setChildInfo({ ...childInfo, dob: formattedDateString });
	};

	return (
		<ScrollView style={childrenStyles.childrenContainer}>
			<View>
				<View style={childrenStyles.childrenTextWrapper}>
					<Text style={childrenStyles.childrenText}>
						to help the psychologists to get the info needed to help
						your children
					</Text>
				</View>

				<Modal
					animationType="fade"
					transparent={true}
					visible={showPopoup}
				>
					<View style={childrenStyles.overlay}></View>
				</Modal>

				<Modal
					animationType="slide"
					transparent={true}
					visible={showPopoup}
					onRequestClose={() => {}}
				>
					<View style={childrenStyles.popupContainer}>
						<View style={childrenStyles.popupWrapper}>
							<LoginButton
								handlePress={() => {}}
								text={"Upload Image"}
							/>
							<LoginInput
								key={"Name"}
								placeholder={"Name"}
								handlechange={(e: string) =>
									setChildInfo({ ...childInfo, name: e })
								}
								value={childInfo.name}
							/>
							<DateInput
								dob={childInfo.dob}
								prevDob={childInfo.dob}
								handleDateConfirmation={handleDateConfirmation}
							/>
							<View style={{ borderWidth: 1, borderRadius: 10 }}>
								<Picker
									selectedValue={childInfo.schoolId}
									onValueChange={handleSchoolChange}
								>
									<Picker.Item
										style={{
											color: "#75AB19",
											fontSize: 18,
										}}
										label="Choose School"
										value={0}
										key={0}
									/>
									{schools?.map((school) => {
										const { id, name } = school;
										return (
											<Picker.Item
												style={{
													color: "#677294",
													fontSize: 18,
												}}
												key={id}
												label={name}
												value={id}
											/>
										);
									})}
								</Picker>
							</View>
							<View style={childrenStyles.buttonsContainer}>
								<View style={childrenStyles.halfButton}>
									<LoginButton
										handlePress={() => setShowPopoup(false)}
										text={"Cancel"}
									/>
								</View>
								<View style={childrenStyles.halfButton}>
									<LoginButton
										handlePress={() => setShowPopoup(false)}
										text={"Confirm"}
									/>
								</View>
							</View>
						</View>
					</View>
				</Modal>
				<FlatList
					data={children}
					scrollEnabled={false}
					renderItem={(element) => {
						const { id, name, profilePic, school, dob } =
							element.item;
						return (
							<Child
								key={id}
								profilePic={`${process.env.EXPO_PUBLIC_PROFILE_PICS_URL}${profilePic}`}
								name={name}
								school={school ?? "No School"}
								dob={dob.slice(0, 10)}
							/>
						);
					}}
				></FlatList>
			</View>
			<LoginButton
				text={"Add Child"}
				handlePress={() => setShowPopoup(true)}
			/>
		</ScrollView>
	);
};

export default Children;
