import ProfileInput from "../ProfileInput";
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import DateTimePicker from "react-native-modal-datetime-picker";
import { DateInputStyles } from "./style";

const DateInput = ({ handleDateConfirmation, prevDob, dob }) => {
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

	const showDatePicker = () => {
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

	return (
		<View>
			<View>
				<DateTimePicker
					isVisible={isDatePickerVisible}
					mode="date"
					onConfirm={(date) => {
						hideDatePicker();
						handleDateConfirmation(date.toISOString());
					}}
					onCancel={hideDatePicker}
				/>
			</View>
			<View style={DateInputStyles.dateInputWrapper}>
				<ProfileInput
					placeholder="YYYY-MM-DD"
					label={"Date Of Birth"}
					input={
						dob
							? dob.slice(0, 10)
							: prevDob
							? prevDob.slice(0, 10)
							: ""
					}
				/>
				<Pressable
					style={DateInputStyles.calendarIconwrapper}
					onPress={showDatePicker}
				>
					<FontAwesome
						name="calendar"
						size={16}
						style={DateInputStyles.calendarIcon}
					/>
				</Pressable>
			</View>
		</View>
	);
};

export default DateInput;
