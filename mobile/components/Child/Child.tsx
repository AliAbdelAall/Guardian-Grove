import React from "react";
import { Image, Text, View } from "react-native";
import ProfileInput from "../ProfileInput";
import { childStyle } from "./childStyle";
const ProfilePic = require("../../assets/profile/profile.jpg");
const Child = ({ name, dob }) => {
	return (
		<View style={childStyle.childWrapper}>
			<View style={childStyle.childImageWrapper}>
				<Image style={childStyle.childImage} source={ProfilePic} />
				<Text style={childStyle.childName}>Mathew</Text>
			</View>
			<View style={childStyle.inputWrapper}>
				<ProfileInput label={"Name"} input={name} />
				<ProfileInput label={"Date Of Birth"} input={dob} />
			</View>
		</View>
	);
};

export default Child;
