import React, { useState } from "react";

// Styles
import "./style.css";

// Calendar
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { userProfileSliceName } from "../../../../core/redux/userProfile";
import {
	addSchedules,
	deleteSchedule,
	schedulesSliceName,
} from "../../../../core/redux/schedules";

// Tools
import { useSendRequest } from "../../../../core/tools/remote/request";
import { requestMethods } from "../../../../../../mobile/core/enum/requestMetods";
import { toast } from "react-toastify";

const Schedules = () => {
	const psychologist = useSelector((global) => global[userProfileSliceName]);
	const { schedules } = useSelector((global) => global[schedulesSliceName]);

	const sendRequest = useSendRequest();
	const dispatch = useDispatch();

	const locales = {
		"en-US": enUS,
	};

	const localizer = dateFnsLocalizer({
		format,
		parse,
		startOfWeek,
		getDay,
		locales,
	});

	const currentEvents = schedules.map((schedule) => ({
		id: schedule.id,
		start: new Date(schedule.start),
		end: new Date(schedule.end),
		title: schedule.title,
	}));

	const initialEvents = [
		{
			id: 1,
			start: new Date(2024, 4, 10, 10, 0),
			end: new Date(2024, 4, 10, 12, 0),
			title: "Meeting with Client A",
		},
		{
			id: 2,
			start: new Date(2024, 4, 12, 14, 0),
			end: new Date(2024, 4, 12, 16, 0),
			title: "Presentation at Conference",
		},
	];

	const [meetingDuration, setMeetingDuration] = useState(30);

	const handleAddSlotSelection = ({ start, end }) => {
		const startTimestamp = start.getTime();
		const endTimestamp = end.getTime();
		const durationInMinutes = (endTimestamp - startTimestamp) / (1000 * 60);

		if (durationInMinutes < meetingDuration) {
			console.log("The selected time range is too small");
			return;
		}

		const numSlots = Math.floor(durationInMinutes / meetingDuration);

		const newEvents = [];
		let currentStartTime = startTimestamp;
		for (let i = 0; i < numSlots; i++) {
			const currentEndTime =
				currentStartTime + meetingDuration * 60 * 1000;

			const formattedStartDate = new Date(currentStartTime).toISOString();
			const formattedEndDate = new Date(currentEndTime).toISOString();

			newEvents.push({
				psychologistId: psychologist.psychologist.id,
				start: formattedStartDate,
				end: formattedEndDate,
				title: "Available Slot",
			});
			currentStartTime = currentEndTime;
		}

		handleSaveNewSlots(newEvents);
	};

	const handleSaveNewSlots = (events) => {
		sendRequest(requestMethods.POST, "/api/psychologist/add-slots", {
			schedules: events,
		})
			.then((response) => {
				if (response.status === 201) {
					toast.success(response.data.message);
					console.log(response.data.schedules);
					dispatch(addSchedules(response.data.schedules));
				}
			})
			.catch((error) => {
				toast.error(error.response.error);
			});
	};

	const eventStyleGetter = (event) => {
		let backgroundColor;
		if (event.title === "Available Slot") {
			backgroundColor = "#677294";
		} else {
			backgroundColor = "#75AB19";
		}
		return { style: { backgroundColor } };
	};

	const handleEventDelete = (id) => {
		sendRequest(requestMethods.POST, "/api/psychologist/delete-slot", {
			eventId: id,
		})
			.then((response) => {
				if (response.status === 200) {
					dispatch(deleteSchedule(id));
					toast.success(response.data.message);
				}
			})
			.catch((error) => {
				toast.error(error.response.error);
			});
	};
	return (
		<div className="full-width">
			<div className="full-width calendar-container">
				<div>
					<label htmlFor="meetingDuration">
						Meeting Duration (minutes)
					</label>
					<input
						type="number"
						id="meetingDuration"
						value={meetingDuration}
						onChange={(e) =>
							setMeetingDuration(parseInt(e.target.value))
						}
					/>
				</div>
				<Calendar
					selectable
					localizer={localizer}
					events={currentEvents}
					startAccessor="start"
					endAccessor="end"
					onSelectSlot={handleAddSlotSelection}
					onSelectEvent={(event) => handleEventDelete(event.id)}
					style={{ height: 700 }}
					popup={true}
					popupOffset={50}
					eventPropGetter={eventStyleGetter}
				/>
			</div>
		</div>
	);
};

export default Schedules;
