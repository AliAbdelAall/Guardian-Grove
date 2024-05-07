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
import { schoolSliceName } from "../../../core/redux/schools";

// Tools
import { useSendRequest } from "../../../core/tools/remote/request";
import { requestMethods } from "../../../core/enum/requestMetods";
import Toast from "react-native-toast-message";
import ChildInput from "../../../components/childInput";

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

	const handleAddChild = () => {
		const { name, schoolId, dob } = childInfo;
		if (!name || !schoolId || !dob) {
			Toast.show({
				type: "error",
				text1: "All child Data must be specified",
			});
			return;
		}
		sendRequest(requestMethods.POST, "/api/child/add-child", {
			...childInfo,
		})
			.then((response) => {
				if (response.status === 201) {
					dispatch(addChild(response.data.child));
					Toast.show({
						type: "success",
						text1: "Child added successfuly",
					});
					setShowPopoup(false);
				}
			})
			.catch((error) => {
				Toast.show({
					type: "error",
					text1: error.response.error,
				});
			});
	};
	return (
		<View style={childrenStyles.childrenContainer}>
			<ScrollView
				style={childrenStyles.ChildrenScrollable}
				showsVerticalScrollIndicator={false}
			>
				<View>
					<View style={childrenStyles.childrenTextWrapper}>
						<Text style={childrenStyles.childrenText}>
							to help the psychologists to get the info needed to
							help your children
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
								<ChildInput
									key={"Name"}
									label={"Name"}
									placeholder={"Mathew"}
									handleChange={(e: string) =>
										setChildInfo({ ...childInfo, name: e })
									}
									value={childInfo.name}
								/>
								<DateInput
									dob={childInfo.dob}
									prevDob={childInfo.dob}
									handleDateConfirmation={
										handleDateConfirmation
									}
								/>
								<View style={childrenStyles.pickerInputWrapper}>
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
											handlePress={() =>
												setShowPopoup(false)
											}
											text={"Cancel"}
										/>
									</View>
									<View style={childrenStyles.halfButton}>
										<LoginButton
											handlePress={handleAddChild}
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
							const { id, name, profilePic, schoolId, dob } =
								element.item;
							const school = schools.find(
								(school) => school.id === schoolId
							);
							return (
								<Child
									key={id}
									profilePic={`${process.env.EXPO_PUBLIC_PROFILE_PICS_URL}${profilePic}`}
									name={name}
									school={school.name ?? "No School"}
									dob={dob.slice(0, 10)}
								/>
							);
						}}
					></FlatList>
				</View>
			</ScrollView>
			<View style={childrenStyles.addChildButtonWrapper}>
				<LoginButton
					text={"Add Child"}
					handlePress={() => setShowPopoup(true)}
				/>
			</View>
		</View>
	);
};

export default Children;
