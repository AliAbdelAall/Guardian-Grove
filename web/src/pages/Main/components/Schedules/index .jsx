import React, { useState } from "react";
import "./style.css";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import SmallButton from "../../../../components/SmallButton";

const Schedules = () => {
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

	const [events, setEvents] = useState(initialEvents);
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
			newEvents.push({
				id: events.length + i + 1,
				start: new Date(currentStartTime),
				end: new Date(currentEndTime),
				title: "Available Slot",
			});
			currentStartTime = currentEndTime;
		}

		setEvents([...events, ...newEvents]);
	};

	const handleEventDelete = (eventId) => {
		const updatedEvents = events.filter((event) => event.id !== eventId);
		setEvents(updatedEvents);
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
					events={events}
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
