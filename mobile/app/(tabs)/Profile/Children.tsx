import React, { useState } from "react";
import { FlatList, Image, ScrollView, Text, View } from "react-native";

// Styles
import { childrenStyles } from "../../../Styles/main/childrenStyles";

// Component
import ProfileInput from "../../../components/ProfileInput";
import LoginButton from "../../../components/LoginButton";
import Child from "../../../components/Child/Child";

// Assets
const ProfilePic = require("../../../assets/profile/profile.jpg");

const Children = () => {
	const children = [
		{
			name: "Mathew",
			dob: "20/04/2024",
		},
		{
			name: "Lilly",
			dob: "20/04/2024",
		},
		{
			name: "Carl",
			dob: "20/04/2024",
		},
	];

	const [dob, setDob] = useState(
		new Date().toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		})
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
						return (
							<Child
								name={element.item.name}
								dob={element.item.dob}
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
