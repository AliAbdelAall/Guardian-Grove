import React from "react";

const Message = ({ message, time, sent }) => {
	return (
		<div
			className={`flex column ${
				sent ? "sent-message-wrapper" : "recieved-message-wrapper"
			}`}
		>
			<p className="recieved-message">{message}</p>
			<p className="message-time">{time}</p>
		</div>
	);
};

export default Message;
