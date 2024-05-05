import React, { FC } from "react";
import { Image, Text, View } from "react-native";
import { StarRatingDisplay } from "react-native-star-rating-widget";

// Styles
import { styles } from "./styles";

type props = {
	id: number;
	profilePic: string;
	name: string;
	rating: number | null;
	speciality: string | null;
};

const PsychologistCard: FC<props> = ({
	id,
	profilePic,
	name,
	speciality,
	rating,
}) => {
	return (
		<View style={styles.psychologistCardWrapper}>
			<Image
				src={profilePic}
				style={styles.psychologistCardImage}
			></Image>
			<View style={styles.psychologistCardInfoWrapper}>
				<Text style={styles.psychologistCardName}>{`Dr. ${name}`}</Text>
				<Text
					style={styles.psychologistCardSpeciality}
				>{`${speciality} specialist`}</Text>
				<StarRatingDisplay
					rating={rating}
					maxStars={5}
					starSize={20}
					enableHalfStar={true}
					emptyColor="#C4C4C4"
					starStyle={styles.starStyle}
					style={styles.starRatingDisplay}
				/>
			</View>
		</View>
	);
};

export default PsychologistCard;
