import React, { FC } from "react";
import { Pressable, Text } from "react-native";
import { styles } from "./styles";

type props = {
	name: string;
	isActive: boolean;
	handlePress: () => void;
};

const FilterButton: FC<props> = ({ name, isActive, handlePress }) => {
	return (
		<Pressable
			style={isActive ? styles.activeFilter : styles.inactiveFilter}
			onPress={handlePress}
		>
			<Text
				style={
					isActive
						? styles.activeFilterText
						: styles.inactiveFilterText
				}
			>
				{name}
			</Text>
		</Pressable>
	);
};

export default FilterButton;
