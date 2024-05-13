import React from "react";

const Conversation = ({ profilePic, name, dot }) => {
	return (
		<div className="flex space-between conversation">
			<div className="flex center conversation-info">
				<img
					src={`${import.meta.env.VITE_PROFILE_PIC_URL}${profilePic}`}
					alt="image"
				/>
				<p>{name}</p>
			</div>
			<div className={dot ? " dot-marker" : ""}></div>
		</div>
	);
};

export default Conversation;
