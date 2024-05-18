import { FC, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

// Styles
import "./style.css";

// Redux
import { useDispatch } from "react-redux";
import { setChildrenCount } from "../../core/redux/childrenCount";
import { setParents } from "../../core/redux/parents";
import { setReviews } from "../../core/redux/reviews";

// Tools
import { useSendRequest } from "../../core/tools/remote/request";
import { requestMethods } from "../../core/enums/requestMethods";

// Toastify
import { toast } from "react-toastify";
import { setTeachers } from "../../core/redux/teachers";
import { setPsycologists } from "../../core/redux/psychologists";
import Sidebar from "./components/Sidebar";

const Main: FC = () => {
	const navigate = useNavigate();
	const sendRequest = useSendRequest();
	const dispatch = useDispatch();
	let admin = "Admin";

	return (
		<div className="flex ">
			<Sidebar admin={admin} />
			<Outlet />
		</div>
	);
};

export default Main;
