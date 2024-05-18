import axios, { AxiosError } from "axios";
import { getLocalUser, removeLocalUser } from "../local/user";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:3000";

export const useSendRequest = () => {
	const token = getLocalUser() ?? "";
	const navigate = useNavigate();

	const sendRequest = async (method: string, route: string, body?: any) => {
		const headers = {
			Authorization: `bearer ${token}`,
			"Content-Type":
				body instanceof FormData
					? "multipart/form-data"
					: "application/json",
		};
		try {
			const response = await axios.request({
				method,
				url: route,
				data: body,
				headers,
			});
			return response;
		} catch (error) {
			const status = (error as AxiosError).response?.status;
			if (status === 401) {
				removeLocalUser();
				navigate("/");
			}
			console.error(error);
			throw error;
		}
	};
	return sendRequest;
};
