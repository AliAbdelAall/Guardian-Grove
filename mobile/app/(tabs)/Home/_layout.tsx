import { Stack, Tabs } from "expo-router";
import React, { useEffect } from "react";
import { useSendRequest } from "../../../core/tools/remote/request";
import { requestMethods } from "../../../core/enum/requestMetods";
import { setTeachers } from "../../../core/redux/teachers";
import { setpsychologists } from "../../../core/redux/Psychologists";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { setUser } from "../../../core/redux/user/index.";
import { setChildren } from "../../../core/redux/children";
import { setSchools } from "../../../core/redux/schools";

const HomeLayout = () => {
	const dispatch = useDispatch();
	const sendRequest = useSendRequest();

	useEffect(() => {
		loadPsychologistAndTeachers();
	}, []);

	const loadPsychologistAndTeachers = () => {
		sendRequest(
			requestMethods.GET,
			"/api/parent/get-psychologists-teachers"
		)
			.then((response) => {
				if (response.status === 200) {
					console.log(response.data);
					const { teachers, psychologists, user, children, schools } =
						response.data;
					dispatch(setTeachers(teachers));
					dispatch(setpsychologists(psychologists));
					dispatch(setUser(user));
					dispatch(setChildren(children));
					dispatch(setSchools(schools));
				}
			})
			.catch((error) => {
				console.log(error);
				Toast.show({
					type: "error",
					text1: "Something went Wrong!",
				});
			});
	};

	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					headerShown: false,
				}}
			></Stack.Screen>
		</Stack>
	);
};

export default HomeLayout;
