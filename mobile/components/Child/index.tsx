import React, { FC } from "react";
import { Image, Text, View } from "react-native";
import ProfileInput from "../ProfileInput";
import { Style } from "./Style";

type Props = {
	name: string;
	profilePic: string;
	school: string | null;
	dob: string | null;
};

const Child: FC<Props> = ({ name, profilePic, school, dob }) => {
	return (
		<View style={Style.childWrapper}>
			<View style={Style.childImageWrapper}>
				<Image style={Style.childImage} src={profilePic} />
				<Text style={Style.childName}>{name}</Text>
			</View>
			<View style={Style.inputWrapper}>
				<ProfileInput label={"School"} input={school} />
				<ProfileInput label={"Date Of Birth"} input={dob} />
			</View>
		</View>
	);
};

export default Child;
