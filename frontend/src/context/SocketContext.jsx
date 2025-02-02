import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { authUser } = useAuthContext();

	// const apiUrl = process.env.REACT_APP_API_URL
	// console.log("apiUrl", apiUrl)


	useEffect(() => {
		// console.log("API URL:", apiUrl);
		console.log(process.env);

		if (authUser) {
			const socket = io("https://chat-app-8j7q.onrender.com", {
				query: {
					userId: authUser._id,
				},
				transports: ["websocket", "polling"],
			});

			setSocket(socket);

			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			return () => socket.close();
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, []);

	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};
