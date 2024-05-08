import React from "react";
import { Outlet } from "react-router-dom";
import { role } from "../../../core/enums/role";
import Sidebar from "../components/Sidebar";
const PsychologistLayout = () => {
	return (
		<>
			<Sidebar role={role.PSYCHOLOGIST} />
			<Outlet />
		</>
	);
};

export default PsychologistLayout;
