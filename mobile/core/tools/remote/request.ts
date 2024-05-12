import axios, { AxiosResponse } from "axios";
import { getLocalUser, removeLocalUser } from "../local/user";
import { useRouter } from "expo-router";

axios.defaults.baseURL = process.env.EXPO_PUBLIC_LOCAL_IPV4;

interface ErrorResponse {
	response: {
		status: number;
	};
}

export const useSendRequest = () => {
	const router = useRouter();

	const sendRequest = async (method: string, route: string, body?: any) => {
		try {
			const token = (await getLocalUser()) ?? "";
			const headers = {
				Authorization: `bearer ${token}`,
			};
			if (body instanceof FormData) {
				headers["Content-Type"] = "multipart/form-data";
			} else {
				headers["Content-Type"] = "application/json";
			}
			const response: AxiosResponse = await axios.request({
				method,
				url: route,
				data: body,
				headers,
			});
			console.log(response);
			return response;
		} catch (error) {
			const { status } = (error as ErrorResponse).response;
			if (status === 401) {
				await removeLocalUser();
				router.dismissAll;
			}
			console.error(error);
			throw error;
		}
	};
	return sendRequest;
};
