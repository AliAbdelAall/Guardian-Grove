import React from "react";

const ReportContainer = ({ id, dateTime, report }) => {
	return (
		<div key={id} className="flex column instruction-wrapper">
			<div className="flex space-between datetime-wrapper">
				<p className="text-lg font-medium">{dateTime.slice(0, 10)}</p>
				<p className="text-sm">{dateTime.slice(11, 16)}</p>
			</div>
			<p className="text-acient">{report}</p>
		</div>
	);
};

export default ReportContainer;
