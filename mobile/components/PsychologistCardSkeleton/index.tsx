import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { View, StyleSheet } from "react-native";

const PsychologistCardSkeleton = () => (
	<View style={styles.psychologistCardWrapper}>
		{[...Array(2)].map((_, index) => (
			<ContentLoader
				key={index}
				speed={2}
				width={175}
				height={250}
				viewBox="0 0 175 250"
				backgroundColor="#B3B9CA"
				foregroundColor="#ecebeb"
			>
				<Rect x="0" y="0" rx="15" ry="15" width="175" height="165" />
				<Rect x="10" y="175" rx="5" ry="5" width="155" height="20" />
				<Rect x="10" y="205" rx="5" ry="5" width="115" height="20" />
				<Rect x="130" y="205" rx="5" ry="5" width="35" height="20" />
			</ContentLoader>
		))}
	</View>
);

const styles = StyleSheet.create({
	psychologistCardWrapper: {
		flexDirection: "row",
		justifyContent: "space-between",
		height: 250,
		width: "100%",
		marginBottom: 3,
		borderRadius: 12,
	},
});

export default PsychologistCardSkeleton;
