import React, { useEffect, useState, Fragment } from "react";
import "./style.css";

import Conversation from "../../../../components/Conversation";
import Message from "../../../../components/Message";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { parentsSliceName } from "../../../../core/redux/parents";
import { conversationsSliceName } from "../../../../core/redux/convesations";

const socket = io.connect("http://localhost:3000");
socket.on("connect", () => {
	console.log(`you connected with Id ${socket.id}`);
	socket.emit("test", 10, "hello", { test: "tis is a test" });
});

const Chat = () => {
	const { parents } = useSelector((global) => global[parentsSliceName]);
	const { conversations } = useSelector(
		(global) => global[conversationsSliceName]
	);

	const [message, setMessage] = useState("");
	console.log(conversations);

	console.log(conversationsWithParents);

	const sendMessage = () => {
		if (message) {
			socket.emit("send-message", message);
			setMessage("");
		}
	};

	return (
		<div className="flex chat-container">
			<div className="flex column consesations-search-wrapper">
				<input type="text" placeholder="Search" />

				<div className="flex column conversations-wrapper">
					{conversationsWithParents?.map((conversation) => (
						<Conversation
							key={conversation.id}
							name={conversation.name}
							dot={true}
							profilePic={conversation.profilePic}
						/>
					))}
				</div>
			</div>
			<div className="flex column messages-container">
				<div className="messages-header"></div>

				<div className="flex column messages-wrapper">
					{conversationsWithParents?.map((conversation) =>
						Object.entries(conversation.messages).map(
							([date, messages]) => (
								<Fragment key={date}>
									<p className="messages-date">{date}</p>
									{messages.map((message) => (
										<Message
											key={message.id}
											message={message.text}
											time={message.time}
											sent={
												message.senderId !==
												conversation.parentId
											}
										/>
									))}
								</Fragment>
							)
						)
					)}
				</div>
				<div className="flex message-input-wrapper">
					<textarea
						className="message-input"
						placeholder="Message..."
						type="text"
						onChange={(e) => setMessage(e.target.value)}
					/>
					<button className="message-send-btn" onClick={sendMessage}>
						Send
					</button>
				</div>
			</div>
		</div>
	);
};

export default Chat;
