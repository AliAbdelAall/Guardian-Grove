import { View, Text, Image } from "react-native";
import React, { FC } from "react";
import { ChildStyles } from "../../Styles/ChildReport";

type props = {
	profilePic: String;
	name: string;
};

const ChildNameImage: FC<props> = ({ profilePic, name }) => {
	return (
		<View style={ChildStyles.childInfoWrapper}>
			<Image
				src={`${process.env.EXPO_PUBLIC_PROFILE_PICS_URL}${profilePic}`}
				style={{
					height: 55,
					width: 55,
					borderRadius: 28,
				}}
			/>
			<Text style={ChildStyles.childInfoName}>{name}</Text>
		</View>
	);
};

export default ChildNameImage;
