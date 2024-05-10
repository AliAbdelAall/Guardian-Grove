import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { View, StyleSheet } from "react-native";

const TeacherCardSkeleton = () => (
	<View style={styles.psychologistCardWrapper}>
		{[...Array(3)].map((_, index) => (
			<ContentLoader
				key={index}
				speed={2}
				width={350}
				height={75}
				viewBox="0 0 350 75"
				backgroundColor="#B3B9CA"
				foregroundColor="#ecebeb"
			>
				{/* Image */}
				<Rect x="0" y="0" rx="5" ry="5" width="75" height="75" />

				{/* Text placeholders */}
				<Rect x="90" y="5" rx="5" ry="5" width="180" height="15" />
				<Rect x="90" y="30" rx="5" ry="5" width="120" height="15" />
				<Rect x="90" y="55" rx="5" ry="5" width="120" height="15" />
			</ContentLoader>
		))}
	</View>
);

const styles = StyleSheet.create({
	psychologistCardWrapper: {
		flexDirection: "column",
		gap: 15,
		height: 75,
		width: "100%",
	},
});

export default TeacherCardSkeleton;
