import React, { useState } from "react";
import "./style.css";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";

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
			color: "#FF5733",
		},
		{
			id: 2,
			start: new Date(2024, 4, 12, 14, 0),
			end: new Date(2024, 4, 12, 16, 0),
			title: "Presentation at Conference",
			color: "#33FFA1",
		},
	];

	const [events, setEvents] = useState(initialEvents);
	const [meetingDuration, setMeetingDuration] = useState(60); // Default meeting duration in minutes

	const handleSelectSlot = ({ start }) => {
		const end = new Date(start);
		end.setMinutes(end.getMinutes() + meetingDuration);

		const newEvent = {
			id: events.length + 1,
			start: start,
			end: end,
			title: "Available Slot",
			color: "#33FFA1",
		};

		setEvents([...events, newEvent]);
	};

	const handleEventDelete = (eventId) => {
		const updatedEvents = events.filter((event) => event.id !== eventId);
		setEvents(updatedEvents);
	};

	return (
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
				onSelectSlot={handleSelectSlot}
				onSelectEvent={(event) => handleEventDelete(event.id)}
				style={{ height: 750, width: 1150 }}
				popup={true}
				popupOffset={50}
			/>
		</div>
	);
};

export default Schedules;
