import React from "react";
import "./style.css";

import ProfilePic from "../../../../assets/images/profile-pictures/profile.jpg";

const Chat = () => {
	return (
		<div className="flex chat-container">
			<div className="flex column consesations-search-wrapper">
				<input type="text" placeholder="Search" />

				<div className="flex column conversations-wrapper">
					<div className="flex space-between conversation">
						<div className="flex center conversation-info">
							<img src={ProfilePic} alt="image" />
							<p>name name</p>
						</div>
						<div className="dot-marker"></div>
					</div>

					<div className="flex space-between conversation">
						<div className="flex center conversation-info">
							<img src={ProfilePic} alt="image" />
							<p>name name</p>
						</div>
						<div className="dot-marker"></div>
					</div>
				</div>
			</div>
			<div className="flex column messages-container">
				<div className="messages-header"></div>

				<div className="flex column messages-wrapper">
					<p className="messages-date">2024-04-23</p>

					<div className="flex column recieved-message-wrapper">
						<p className="recieved-message">
							hello i just want to check if you can take care of
							my child reports ?
						</p>
						<p className="message-time">3:00 pm</p>
					</div>
					<div className="flex column sent-message-wrapper">
						<p className="sent-message">
							sure what is you son name so i can start sending
							reports starting tomoorw
						</p>
						<p className="message-time">3:00 pm</p>
					</div>
				</div>
				<div className="flex message-input-wrapper">
					<textarea
						className="message-input"
						placeholder="Message..."
						type="text"
					/>
					<button className="message-send-btn">Send</button>
				</div>
			</div>
		</div>
	);
};

export default Chat;
