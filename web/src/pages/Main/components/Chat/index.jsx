import React from "react";
import "./style.css";

import Conversation from "../../../../components/Conversation";
import Message from "../../../../components/Message";

const Chat = () => {
	return (
		<div className="flex chat-container">
			<div className="flex column consesations-search-wrapper">
				<input type="text" placeholder="Search" />

				<div className="flex column conversations-wrapper">
					<Conversation
						key={1}
						name={"jhon Doe"}
						dot={true}
						profilePic={"1714905175140-639219459.jpg"}
					/>

					<Conversation
						key={2}
						name={"jhon Doe"}
						dot={true}
						profilePic={"1714905175140-639219459.jpg"}
					/>
				</div>
			</div>
			<div className="flex column messages-container">
				<div className="messages-header"></div>

				<div className="flex column messages-wrapper">
					<p className="messages-date">2024-04-23</p>

					<Message
						key={1}
						message={
							"hello i just want to check if you can take care ofmy child reports ?"
						}
						time={"3:00 pm"}
						sent={false}
					/>
					<Message
						key={2}
						message={
							"sure what is you son name so i can start sendingreports starting tomoorw"
						}
						time={"3:00 pm"}
						sent={true}
					/>
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
