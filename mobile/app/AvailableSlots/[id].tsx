import React, { useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { Calendar } from "react-native-calendars";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../core/redux/store";
import {
	availableSlotsSliceName,
	removeSlot,
} from "../../core/redux/availableSlots";
import { psychologistsSliceName } from "../../core/redux/Psychologists";
import { Stack, useLocalSearchParams } from "expo-router";
import { slotsStyles } from "../../Styles/availableSlots";
import LoginButton from "../../components/LoginButton";
import { useSendRequest } from "../../core/tools/remote/request";
import { requestMethods } from "../../core/enum/requestMetods";
import Toast from "react-native-toast-message";

const AvailableSlots = () => {
	const { id } = useLocalSearchParams();

	const slots = useSelector(
		(global: RootState) => global[availableSlotsSliceName]
	);
	const psychologists = useSelector(
		(global: RootState) => global[psychologistsSliceName]
	);

	const psychologist = psychologists.find(
		(psychologist) => psychologist.id === JSON.parse(id[0])
	);
	const psychologistSlots = slots.filter(
		(slot) => slot.psychologistId === psychologist.id
	);

	const [selectedDate, setSelectedDate] = useState(null);
	const [selectedSlot, setSelectedSlot] = useState(null);

	const markedDates = transformAvailableSlots(psychologistSlots);

	function transformAvailableSlots(availableSlots: any) {
		const formattedMarkedDates = {};
		availableSlots.forEach((slot: any) => {
			const startDate = slot.start.split("T")[0];
			if (!formattedMarkedDates[startDate]) {
				formattedMarkedDates[startDate] = { marked: true };
				formattedMarkedDates[startDate].slots = [];
			}
			formattedMarkedDates[startDate].slots.push({
				id: slot.id,
				startTime: new Date(slot.start).toLocaleTimeString([], {
					hour: "numeric",
					minute: "2-digit",
				}),
				endTime: new Date(slot.end).toLocaleTimeString([], {
					hour: "numeric",
					minute: "2-digit",
				}),
			});
		});
		return formattedMarkedDates;
	}

	return (
		<>
			<Stack.Screen
				options={{
					title: `${psychologist.firstName} ${psychologist.lastName}`,
					headerStyle: {
						backgroundColor: "#75AB19",
					},
					headerTitleStyle: {
						color: "white",
						fontSize: 24,
					},
					headerShadowVisible: false,
					headerTintColor: "white",
				}}
			/>
			<View style={{ flex: 1 }}>
				<Calendar
					markedDates={markedDates}
					markingType="custom"
					onDayPress={handleDayPress}
				/>
				<View style={slotsStyles.avilableSlots}>
					{selectedDate && (
						<FlatList
							numColumns={3}
							ItemSeparatorComponent={() => {
								return <View style={{ height: 15 }}></View>;
							}}
							columnWrapperStyle={{
								justifyContent: "space-between",
							}}
							data={markedDates[selectedDate]?.slots ?? []}
							renderItem={(slot) => {
								const { id, startTime } = slot.item;
								return (
									<Pressable
										onPress={() => {
											handleSlotSelection(slot.item);
											console.log("Slot: ", slot.item);
										}}
										style={slotsStyles.avilableSlotWrpper}
									>
										<Text
											style={slotsStyles.avilableSlotText}
											key={id}
										>
											{startTime}
										</Text>
									</Pressable>
								);
							}}
						/>
					)}
					{selectedSlot && (
						<Text style={slotsStyles.selectedSlotText}>
							Selected Slot: {selectedSlot.startTime} -{" "}
							{selectedSlot.endTime}
						</Text>
					)}
					{selectedSlot && (
						<LoginButton
							text={"Book Meeting"}
							handlePress={handleBookSlot}
						/>
					)}
				</View>
			</View>
		</>
	);
};

export default AvailableSlots;
