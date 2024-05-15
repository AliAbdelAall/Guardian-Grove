import io from "socket.io-client";

const socket = io("http://192.168.0.201:3000");

socket.on("connect", () => {
	console.log("Connected to server");
});

socket.on("disconnect", () => {
	console.log("Disconnected from server");
});

export default socket;
