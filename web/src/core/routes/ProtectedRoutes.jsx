import React, { useEffect, useState } from "react";
import { userProfileSliceName } from "../redux/userProfile";
import { useSelector } from "react-redux";
import NotFound from "../../pages/Main/components/NotFound/index ";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ role, children }) => {
	const [roleId, setRoleId] = useState(0);
	const user = useSelector((global) => global[userProfileSliceName]);
	const navigate = useNavigate();
	useEffect(() => {
		setRoleId(user.roleId);
	}, [user]);
	console.log("user: ", user);
	if (roleId === 0) {
		return <h1>Loading...</h1>;
	}
	if (roleId !== role) {
		return <NotFound />;
	}
	return children;
};
export default ProtectedRoutes;
