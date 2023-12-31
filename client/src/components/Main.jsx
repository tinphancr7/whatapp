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
import SearchMessages from "./Chat/SearchMessages";
import VideoCall from "./Call/VideoCall";
import VoiceCall from "./Call/VoiceCall";
import IncomingVideoCall from "./common/IncomingVideoCall";

function Main() {
	const router = useRouter();
	const [
		{
			userInfo,
			currentChatUser,
			messageSearch,
			voiceCall,
			videoCall,
			incomingVoiceCall,
			incomingVideoCall,
		},
		dispatch,
	] = useStateProvider();

	const [socketEvent, setSocketEvent] = useState(false);

	const socket = useRef();

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("userInfo"));
		if (user) {
			dispatch({
				type: reducerCases.SET_USER_INFO,
				userInfo: user,
			});
		} else {
			router.push("/login");
		}
	}, [userInfo?.id]);

	// onAuthStateChanged(firebaseAuth, async (currentUser) => {
	// 	if (!currentUser) setRedirectLogin(true);
	// 	if (!userInfo && currentUser?.email) {
	// 		const {data} = await axios.post(CHECK_USER_ROUTE, {
	// 			email: currentUser.email,
	// 		});

	// 		if (!data.status) {
	// 			// router.push("/login");
	// 		}
	// 		if (data?.data) {
	// 			const {
	// 				id,
	// 				name,
	// 				status,
	// 				profilePicture: profileImage,
	// 				email,
	// 			} = data.data;
	// 			dispatch({
	// 				type: reducerCases.SET_USER_INFO,
	// 				userInfo: {
	// 					id,
	// 					name,
	// 					email,
	// 					profileImage,
	// 					status,
	// 				},
	// 			});
	// 		}
	// 	}
	// });
	useEffect(() => {
		if (userInfo) {
			socket.current = io(HOST);
			socket.current.emit("add-user", userInfo?.id);
			dispatch({
				type: reducerCases.SET_SOCKET,
				socket: socket,
			});
		}
	}, [userInfo?.id]);
	useEffect(() => {
		console.log("socket", socket.current);
		console.log("socketEvent", socketEvent);
		if (socket.current) {
			socket.current.on("msg-receive", (data) => {
				dispatch({
					type: reducerCases.ADD_MESSAGE,
					newMessage: {
						...data.message,
					},
				});
			});

			socket.current.on("incoming-video-call", ({from, roomId, callType}) => {
				dispatch({
					type: reducerCases.SET_INCOMING_VIDEO_CALL,
					incomingVideoCall: {
						...from,
						roomId,
						callType,
					},
				});
			});
			socket.current.on("incoming-voice-call", ({from, roomId, callType}) => {
				dispatch({
					type: reducerCases.SET_INCOMING_VOICE_CALL,
					incomingVoiceCall: {
						...from,
						roomId,
						callType,
					},
				});
			});

			socket.current.on("voice-call-rejected", () => {
				dispatch({
					type: reducerCases.END_CALL,
				});
			});
			socket.current.on("video-call-rejected", () => {
				dispatch({
					type: reducerCases.END_CALL,
				});
			});
			socket.current.on("accept-incoming-call", () => {
				dispatch({
					type: reducerCases.END_CALL,
				});
			});
			setSocketEvent(true);
		}
	}, [socket.current]);
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
		};
		if (currentChatUser?.id) {
			getMessages();
		}
	}, [currentChatUser?.id, userInfo?.id]);
	return (
		<>
			{incomingVoiceCall && <IncomingVideoCall />}
			{incomingVideoCall && <IncomingVideoCall />}
			{videoCall && (
				<div className="h-screen w-screen max-h-full overflow-hidden">
					<VideoCall />
				</div>
			)}
			{voiceCall && (
				<div className="h-screen w-screen max-h-full overflow-hidden">
					<VoiceCall />
				</div>
			)}
			{!videoCall && !voiceCall && (
				<div className="grid grid-cols-main h-screen w-screen max-h-screen overflow-hidden">
					<ChatList />
					{currentChatUser ? (
						<div className={messageSearch ? "grid grid-cols-2" : "grid-cols-2"}>
							<Chat />
							{messageSearch && <SearchMessages />}
						</div>
					) : (
						<Empty />
					)}
				</div>
			)}
		</>
	);
}
export default Main;
