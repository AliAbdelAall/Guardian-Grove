import { View, Text, Image, Pressable } from "react-native";
import React, { useState } from "react";

// Styles
import { psychologistsStyles } from "../../../Styles/psychologists/psycholoists";
import { chatStyles } from "../../../Styles/chatStyles";

// Components
import SearchInput from "../../../components/SearchInput";
import FilterButton from "../../../components/FilterButton";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../../core/redux/store";
import { userSliceName } from "../../../core/redux/user/index.";
import { router } from "expo-router";

const Chat = () => {
	const user = useSelector((global: RootState) => global[userSliceName]);
	const [activeButton, setActiveButton] = useState("All");

	const handlePress = (buttonName: string) => {
		setActiveButton(buttonName);
	};
	return (
		<View style={chatStyles.chatContainer}>
			<SearchInput value="" handleTextChange={() => {}} />
			<View style={psychologistsStyles.filterButtonsWrapper}>
				<FilterButton
					isActive={activeButton === "All"}
					name="All"
					handlePress={() => handlePress("All")}
				/>
				<FilterButton
					isActive={activeButton === "Psychologists"}
					name="Psychologists"
					handlePress={() => handlePress("Psychologists")}
				/>
				<FilterButton
					isActive={activeButton === "Teachers"}
					name="Teachers"
					handlePress={() => handlePress("Teachers")}
				/>
			</View>
			<View>
				<Pressable onPress={() => router.push("/Conversation/1")}>
					<View style={chatStyles.conversationWrapper}>
						<View style={chatStyles.conversationInfoWrapper}>
							<Image
								style={chatStyles.conversationImage}
								src={`${process.env.EXPO_PUBLIC_PROFILE_PICS_URL}1714905175140-639219459.jpg`}
							/>
							<Text
								style={chatStyles.conversationName}
							>{`${user.firstName}${user.lastName}`}</Text>
						</View>
						<View style={chatStyles.onlineDot}></View>
					</View>
				</Pressable>
			</View>
		</View>
	);
};

export default Chat;
