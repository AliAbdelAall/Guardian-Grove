import React from "react";
import { Outlet } from "react-router-dom";
import { role } from "../../../core/enums/role";
import Sidebar from "../components/Sidebar";
const TeacherLayout = () => {
	return (
		<>
			<Sidebar role={role.TEACHER} />
			<Outlet />
		</>
	);
};

export default TeacherLayout;
