import React, { FC } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { styles } from "./styles";

type props = {
	id: number;
	profilePic: string;
	name: string;
	school: string | null;
	speciality: string | null;
};

const TeacherCard: FC<props> = ({
	id,
	profilePic,
	name,
	school,
	speciality,
}) => {
	return (
		<View style={styles.teachercardContainer}>
			<View style={styles.teachercardWrapper}>
				<Image src={profilePic} style={styles.teachercardImage}></Image>
				<View style={styles.teachercardInfoWrapper}>
					<Text style={styles.teacherCardName}>{name}</Text>
					<Text style={styles.teacherCardSchoold}>{school}</Text>
					<Text
						style={styles.teacherCardSpeciality}
					>{`${speciality} teacher`}</Text>
				</View>
			</View>
			<Pressable style={styles.connectButton}>
				<Text style={styles.connectButtonText}>Connect</Text>
			</Pressable>
		</View>
	);
};

export default TeacherCard;
