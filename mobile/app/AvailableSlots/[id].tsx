import React, { useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

// Styles
import { slotsStyles } from "../../Styles/availableSlots";
import { customTheme } from "../../Styles/calendarStyles";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../core/redux/store";
import {
	availableSlotsSliceName,
	removeSlot,
} from "../../core/redux/availableSlots";
import { psychologistsSliceName } from "../../core/redux/Psychologists";

// Tools
import Toast from "react-native-toast-message";
import { useSendRequest } from "../../core/tools/remote/request";
import { requestMethods } from "../../core/enum/requestMetods";
import { Calendar } from "react-native-calendars";

// Components
import LoginButton from "../../components/LoginButton";

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

	const sendRequest = useSendRequest();
	const dispatch = useDispatch();

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

	const handleDayPress = (date: any) => {
		setSelectedDate(date.dateString);
		setSelectedSlot(null);
	};

	const handleSlotSelection = (slot: any) => {
		setSelectedSlot(slot);
	};

	const handleBookSlot = async () => {
		sendRequest(requestMethods.POST, "/api/parent/book-meeting", {
			slotId: selectedSlot.id,
		})
			.then((response) => {
				if (response.status === 200) {
					dispatch(removeSlot(selectedSlot.id));
					Toast.show({
						type: "success",
						text1: response.data.message,
					});
				}
			})
			.catch((error) => {
				console.log(error);
				Toast.show({
					type: "error",
					text1: "Something went wrong.",
				});
			});
	};

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
					theme={customTheme}
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
