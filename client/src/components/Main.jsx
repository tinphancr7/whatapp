import {useRouter} from "next/router";
import React, {useEffect, useRef, useState} from "react";
import ChatList from "./Chatlist/ChatList";
import Chat from "./Chat/Chat";
import Empty from "./Empty";
import axios from "axios";
import {reducerCases} from "@/context/constants";
import {CHECK_USER_ROUTE, GET_MESSAGES_ROUTE, HOST} from "@/utils/ApiRoutes";
import {useStateProvider} from "@/context/StateContext";
import {onAuthStateChanged} from "firebase/auth";
import {firebaseAuth} from "@/utils/FirebaseConfig";
import {io} from "socket.io-client";

function Main() {
	const router = useRouter();
	const [{userInfo, currentChatUser}, dispatch] = useStateProvider();

	const [socketEvent, setSocketEvent] = useState(false);
	const [redirectLogin, setRedirectLogin] = useState(false);
	const socket = useRef();
	useEffect(() => {
		if (redirectLogin) router.push("/login");
	}, [redirectLogin]);

	onAuthStateChanged(firebaseAuth, async (currentUser) => {
		if (!currentUser) setRedirectLogin(true);
		if (!userInfo && currentUser?.email) {
			const {data} = await axios.post(CHECK_USER_ROUTE, {
				email: currentUser.email,
			});

			if (!data.status) {
				// router.push("/login");
			}
			if (data?.data) {
				const {id, name, status, image, email} = data.data;
			}
			dispatch({
				type: reducerCases.SET_USER_INFO,
				userInfo: {
					name: data.name,
					email: data.email,
					profileImage: data.image,
					status: data.status,
				},
			});
		}
	});
	useEffect(() => {
		if (userInfo) {
			socket.current = io(HOST);

			socket.current.emit("addUser", userInfo.id);
			dispatch({
				type: reducerCases.SET_SOCKET,
				socket: socket,
			});
		}
	}, [userInfo]);
	useEffect(() => {
		if (socket.current && !socketEvent) {
			socket.current.on("msg-recieve", (data) => {
				dispatch({
					type: reducerCases.ADD_MESSAGE,
					messages: data,
				});
			});
			setSocketEvent(true);
		}
	}, [socketEvent]);
	useEffect(() => {
		const getMessages = async () => {
			const {
				data: {messages},
			} = await axios.get(
				`${GET_MESSAGES_ROUTE}/${userInfo?.id}/${currentChatUser?.id}`
			);
			dispatch({
				type: reducerCases.SET_MESSAGES,
				messages: messages,
			});
			if (currentChatUser?.id) {
				getMessages();
			}
		};
	}, [currentChatUser, userInfo]);
	return (
		<div className="grid grid-cols-main h-screen w-screen max-h-screen overflow-hidden">
			<ChatList />
			{currentChatUser ? <Chat /> : <Empty />}
		</div>
	);
}
export default Main;
