import React, { useEffect, useState, Fragment } from "react";

// Styles
import "./style.css";

// Redux
import { useSelector } from "react-redux";
import { parentsSliceName } from "../../../../core/redux/parents";
import { conversationsSliceName } from "../../../../core/redux/convesations";

// Components
import Conversation from "../../../../components/Conversation";
import Message from "../../../../components/Message";

// Socket
import io from "socket.io-client";

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

	const [conversationId, setConversationId] = useState(0);

	let conversationsWithParents = [];

	useEffect(() => {}, [conversationId]);
	conversationsWithParents = conversations?.map((conversation) => {
		const parent = parents.find(
			(parent) => parent.id === conversation.parentId
		);
		console.log("parent: ", parent);
		const messagesByDate = conversation.Message.reduce((acc, message) => {
			const messageDate = new Date(message.createdAt);
			const dateKey = messageDate.toISOString().split("T")[0];
			const time = messageDate.toLocaleString("en-US", {
				hour: "numeric",
				minute: "numeric",
				hour12: true,
			});

			acc[dateKey] = acc[dateKey] || [];
			acc[dateKey].push({
				id: message.id,
				text: message.text,
				senderId: message.senderId,
				createdAt: message.createdAt,
				time: time,
			});

			return acc;
		}, {});
		return {
			id: conversation.id,
			parentId: parent.id,
			name: `${parent.profile.firstName} ${parent.profile.lastName}`,
			profilePic: parent.profile.profilePic,
			messages: messagesByDate,
		};
	});
	const conversation = conversationsWithParents?.find(
		(conversation) => conversation.id === conversationId
	);
	console.log(conversationId, conversation);

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
					{conversationsWithParents.length !== 0 ? (
						conversationsWithParents?.map((conversation) => (
							<Conversation
								key={conversation.id}
								isActive={conversationId === conversation.id}
								name={conversation.name}
								dot={true}
								profilePic={conversation.profilePic}
								handleClick={() =>
									setConversationId(conversation.id)
								}
							/>
						))
					) : (
						<div className="flex center full-width">
							<h4 className="text-acient">
								You have no conversations yet.
							</h4>
						</div>
					)}
				</div>
			</div>
			{conversationId !== 0 ? (
				<div className="flex column messages-container">
					<div className="messages-header"></div>

					<div className="flex column messages-wrapper">
						{Object.keys(conversation.messages).length === 0 && (
							<p>Send a message to start a conversation.</p>
						)}
						{Object.entries(conversation.messages).map(
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
						)}
					</div>
					<div className="flex message-input-wrapper">
						<textarea
							className="message-input"
							placeholder="Message..."
							type="text"
							onChange={(e) => setMessage(e.target.value)}
						/>
						<button
							className="message-send-btn"
							onClick={sendMessage}
						>
							Send
						</button>
					</div>
				</div>
			) : (
				<div className="flex center full-width">
					<h2 className="text-acient">
						Select a conversation and Start Chatting
					</h2>
				</div>
			)}
		</div>
	);
};

export default Chat;
