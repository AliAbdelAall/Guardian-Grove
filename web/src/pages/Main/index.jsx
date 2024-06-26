import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

// Styles
import "./style.css";

// Redux
import { useDispatch } from "react-redux";
import { setchildren } from "../../core/redux/children";
import { setParents } from "../../core/redux/parents";
import { setProfile } from "../../core/redux/userProfile";

// Tools
import { useSendRequest } from "../../core/tools/remote/request";
import { requestMethods } from "../../core/enums/requestMethods";

// Toastify
import { toast } from "react-toastify";

// Redux
import { setSchools } from "../../core/redux/shcools";
import { setReviews } from "../../core/redux/reviews";
import { setReports } from "../../core/redux/reports";
import { setInstructions } from "../../core/redux/instructions";
import { setSchedules } from "../../core/redux/schedules";
import { setConversations } from "../../core/redux/convesations";

const Main = ({ socket }) => {
	const navigate = useNavigate();
	const sendRequest = useSendRequest();
	const dispatch = useDispatch();
	const [role, setRole] = useState("");
	socket.on("connect", () => {
		console.log(`connected: ${socket.id}`);
	});
	useEffect(() => {
		checkRole();
	}, []);

	const checkRole = () => {
		sendRequest(requestMethods.GET, "/api/web/check-role")
			.then((response) => {
				if (response.status === 200) {
					const {
						userRole,
						profile,
						reviews,
						schedules,
						conversations,
					} = response.data;
					setRole(userRole);
					dispatch(setProfile(profile));
					if (reviews) {
						dispatch(setReviews(reviews));
					}
					if (schedules) {
						dispatch(setSchedules(schedules));
					}
					dispatch(setConversations(conversations));
					userRole === "Teacher" ? loadStudents() : loadClients();
				}
			})
			.catch((error) => {
				toast.error("something went wrong...");
			});
	};

	const loadStudents = () => {
		navigate("/main/teacher/students");
		sendRequest(requestMethods.GET, "/api/teacher/get-students")
			.then((response) => {
				if (response.status === 200) {
					console.log(response.data);
					const students = response.data.students;
					const parentsList = [];
					const studentsList = [];
					const parentIds = [];

					students?.forEach((student) => {
						console.log(student);
						const { parent, ...studentInfo } = student;
						if (!parentIds.includes(parent.id)) {
							parentsList.push(parent);
							parentIds.push(parent.id);
						}
						console.log(students);
						studentsList.push(studentInfo);
					});
					dispatch(setParents(parentsList));
					dispatch(setchildren(studentsList));
					dispatch(setSchools(response.data.schools));
					dispatch(setReports(response.data.reports));
					toast.success("load successful");
				}
			})
			.catch((error) => {
				toast.error("something went wrong...");
			});
	};

	const loadClients = () => {
		navigate("/main/psychologist/clients");
		sendRequest(requestMethods.GET, "/api/psychologist/get-clients")
			.then((response) => {
				if (response.status === 200) {
					console.log(response.data);
					const clients = response.data.clients;
					const parentsList = [];
					const childrenList = [];

					clients?.forEach((client) => {
						console.log(client);
						const { children, ...parent } = client;
						parentsList.push(parent);
						console.log(children);
						childrenList.push(...children);
					});
					dispatch(setParents(parentsList));
					dispatch(setchildren(childrenList));
					dispatch(setSchools(response.data.schools));
					dispatch(setInstructions(response.data.instructions));
					toast.success("load successful");
				}
			})
			.catch((error) => {
				toast.error("something went wrong...");
			});
	};

	return (
		<div className="flex ">
			<Outlet />
		</div>
	);
};

export default Main;
