import React from "react";
import "./style.css";

import ProfilePic from "../../../../assets/images/profile-pictures/profile.jpg";

const Chat = () => {
	return (
		<div className="flex chat-container">
			<div className="flex column consesations-search-wrapper">
				<input type="text" />

				<div className="flex column conversations-wrapper">
					<div className="flex space between conversation">
						<div className="flex center conversation-info">
							<img src={ProfilePic} alt="image" />
							<p>name name</p>
						</div>
						<div className="dot-marker"></div>
					</div>

					<div className="conversation">
						<div className="flex center conversation-info">
							<img src={ProfilePic} alt="image" />
							<p>name name</p>
						</div>
						<div className="dot-marker"></div>
					</div>
				</div>
			</div>
			<div className="messages-container">
				<div className="messages header"></div>

				<div className="messages-wrapper">
					<p>date</p>
					<div className="recieved-message-wrapper">
						<p className="recieved-message">message</p>
						<p className="message time">3:00 pm</p>
					</div>
					<div className="sent-message-wrapper">
						<p className="sent-message">message</p>
						<p className="message time">3:00 pm</p>
					</div>
				</div>
				<div>
					<input type="text" />
					<button>send</button>
				</div>
			</div>
		</div>
	);
};

export default Chat;
