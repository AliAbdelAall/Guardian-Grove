import React, { useState } from "react";
import { FlatList, Image, ScrollView, Text, View } from "react-native";

// Styles
import { childrenStyles } from "../../../Styles/main/childrenStyles";

// Component
import ProfileInput from "../../../components/ProfileInput";
import LoginButton from "../../../components/LoginButton";
import Child from "../../../components/Child";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../../core/redux/store";
import { userSliceName } from "../../../core/redux/user/index.";
import { childrenSliceName } from "../../../core/redux/children";

// Assets
const ProfilePic = require("../../../assets/profile/profile.jpg");

const Children = () => {
	const children = useSelector(
		(global: RootState) => global[childrenSliceName]
	);

	return (
		<ScrollView style={childrenStyles.childrenContainer}>
			<View>
				<View style={childrenStyles.childrenTextWrapper}>
					<Text style={childrenStyles.childrenText}>
						to help the psychologists to get the info needed to help
						your children
					</Text>
				</View>
				<FlatList
					data={children}
					renderItem={(element) => {
						const { id, name, profilePic, school, dob } =
							element.item;
						return (
							<Child
								key={id}
								profilePic={`${process.env.REACT_APP_PROFILE_PICS_URL}+${profilePic}`}
								name={name}
								school={school ?? "No School"}
								dob={dob}
							/>
						);
					}}
				></FlatList>
			</View>
			<LoginButton text={"Add Child"} handlePress={() => {}} />
		</ScrollView>
	);
};

export default Children;
