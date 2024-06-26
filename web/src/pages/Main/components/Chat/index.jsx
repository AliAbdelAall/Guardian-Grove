import React, { useEffect, useState, Fragment } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// Styles
import "./style.css";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { parentsSliceName } from "../../../../core/redux/parents";
import {
	addMessage,
	conversationsSliceName,
} from "../../../../core/redux/convesations";
import { userProfileSliceName } from "../../../../core/redux/userProfile";

// Components
import Conversation from "../../../../components/Conversation";
import Message from "../../../../components/Message";
import { toast } from "react-toastify";

const Chat = ({ socket }) => {
	const { id } = useParams();

	const { parents } = useSelector((global) => global[parentsSliceName]);
	const { conversations } = useSelector(
		(global) => global[conversationsSliceName]
	);
	const user = useSelector((global) => global[userProfileSliceName]);
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();
	const [message, setMessage] = useState("");
	const [messageId, setMessageId] = useState(0);
	console.log(conversations);

	const isTeacher = location.pathname.includes("teacher");

	const conversationId = id ? parseInt(id) : 0;

	let conversationsWithParents = [];

	useEffect(() => {
		let mounted = true;

		if (conversationId !== 0) {
			socket.emit(
				"join-conversation",
				conversationId.toString(),
				(conversation) => {
					toast.success(`joined conversation: ${conversation}`);
					console.log(conversation);
				}
			);
			if (mounted) {
				socket.on("receive-message", (message) => {
					console.log("newMessage in room: ", message);
					dispatch(
						addMessage({
							conversationId: message.conversationId,
							message,
						})
					);
					setMessageId(message.id);
				});
			}
		}
		return () => {
			mounted = false;
			socket.off("receive-message");
		};
	}, [conversationId]);

	conversationsWithParents = conversations?.map((conversation) => {
		const parent = parents.find(
			(parent) => parent.id === conversation.parentId
		);
		console.log("parent: ", parent);
		const messagesByDate = conversation.Message
			? conversation.Message.reduce((acc, message) => {
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
			  }, {})
			: {};
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
			const newMessage = {
				conversationId,
				text: message,
				senderId: user.id,
				createdAt: new Date(),
			};
			socket.emit("send-message", newMessage);
			setMessage("");
		}
	};

	const redirectConversation = (id) => {
		if (isTeacher) {
			navigate(`/main/teacher/chat/${id}`);
		} else {
			navigate(`/main/psychologist/chat/${id}`);
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
									redirectConversation(conversation.id)
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
							value={message}
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
