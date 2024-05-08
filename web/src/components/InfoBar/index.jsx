import React from "react";
import "./style.css";

const InfoBar = ({ label, text }) => {
	return (
		<div
			className="flex column info-bar
    info-bar
    info-bar-wrapper"
		>
			<label className="text-sm font-bold text-primary" htmlFor="">
				{label}
			</label>
			<p className="text-lg text-acient">{text}</p>
		</div>
	);
};

export default InfoBar;
