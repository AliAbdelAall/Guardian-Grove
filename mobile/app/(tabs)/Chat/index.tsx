import { View, Text, Image, Pressable, FlatList } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";

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
import { conversationsSliceName } from "../../../core/redux/conversations";
import { teachersSliceName } from "../../../core/redux/teachers";
import { psychologistsSliceName } from "../../../core/redux/Psychologists";

const Chat = () => {
	const user = useSelector((global: RootState) => global[userSliceName]);
	const conversations = useSelector(
		(global: RootState) => global[conversationsSliceName]
	);
	const teachers = useSelector(
		(global: RootState) => global[teachersSliceName]
	);
	const psychologists = useSelector(
		(global: RootState) => global[psychologistsSliceName]
	);

	const [activeButton, setActiveButton] = useState("All");

	const conversationsWithInfo = conversations?.map((conversation) => {
		if (conversation.psychologistId !== null) {
			const user = psychologists.find(
				(psychologist) =>
					psychologist.id === conversation.psychologistId
			);
			return {
				...conversation,
				name: `Dr. ${user.firstName} ${user.lastName}`,
				profilePic: user.profilePic,
				role: "Psychologists",
			};
		} else {
			const user = teachers.find(
				(teacher) => teacher.id === conversation.teacherId
			);
			return {
				...conversation,
				name: `${user.firstName} ${user.lastName}`,
				profilePic: user.profilePic,
				role: "Teachers",
			};
		}
	});

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
				<FlatList
					data={conversationsWithInfo}
					renderItem={(conversation) => {
						const { id, name, profilePic } = conversation.item;
						return (
							<Pressable
								key={id}
								onPress={() =>
									router.push(`/Conversation/${id}`)
								}
							>
								<View style={chatStyles.conversationWrapper}>
									<View
										style={
											chatStyles.conversationInfoWrapper
										}
									>
										<Image
											style={chatStyles.conversationImage}
											src={`${process.env.EXPO_PUBLIC_PROFILE_PICS_URL}${profilePic}`}
										/>
										<Text
											style={chatStyles.conversationName}
										>
											{name}
										</Text>
									</View>
									<View style={chatStyles.onlineDot}></View>
								</View>
							</Pressable>
						);
					}}
				/>
			</View>
		</View>
	);
};

export default Chat;
