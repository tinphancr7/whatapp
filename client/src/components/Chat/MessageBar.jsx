import {useStateProvider} from "@/context/StateContext";
import {reducerCases} from "@/context/constants";
import {ADD_MESSAGE_ROUTE} from "@/utils/ApiRoutes";
import axios from "axios";
import React, {useState} from "react";
import {BsEmojiSmile} from "react-icons/bs";
import {FaMicrophone} from "react-icons/fa";
import {ImAttachment} from "react-icons/im";
import {MdSend} from "react-icons/md";

function MessageBar() {
	const [{userInfo, currentChatUser, socket}, dispatch] = useStateProvider();
	console.log("userInfo", userInfo);
	const [message, setMessage] = useState("");
	const sendMessage = async (e) => {
		e.preventDefault();
		if (message) {
			const {data} = await axios.post(ADD_MESSAGE_ROUTE, {
				to: currentChatUser.id,
				from: userInfo?.id,
				message,
			});
			socket.current.emit("send-msg", {
				to: currentChatUser?.id,
				from: userInfo?.id,
				message: data.message,
			});
			dispatch({
				type: reducerCases.ADD_MESSAGE,
				newMessage: {
					...data.message,
				},
				fromSelf: true,
			});
			setMessage("");
		}
	};
	return (
		<div className="bg-panel-header-background h-20 px-4 flex items-center gap-6 relative">
			<>
				<div className="flex gap-6">
					<BsEmojiSmile className="text-panel-header-icon cursor-pointer text-xl" />
					<ImAttachment className="text-panel-header-icon cursor-pointer text-xl" />
				</div>
				<div className="w-full rounded-lg h-10 flex items-center">
					<input
						type="text"
						placeholder="Type a message"
						className="bg-input-background text-sm focus:outline-none text-white h-10 rounded-lg px-5 py-4 w-full"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>
				</div>
				<div className="flex w-10 items-center justify-center">
					<button>
						<MdSend
							className="text-panel-header-icon cursor-pointer text-xl"
							title="Send message"
							onClick={sendMessage}
						/>
						<FaMicrophone
							className="text-panel-header-icon cursor-pointer"
							title="Record"
						/>
					</button>
				</div>
			</>
		</div>
	);
}

export default MessageBar;
