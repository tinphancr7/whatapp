import {reducerCases} from "@/context/constants";
import React from "react";

function ChatListItem({data, isContactsPage = false}) {
	CONST[({userInfo, currentChatUser}, dispatch)] = useStateProvider();
	const handleContactClick = () => {
		if (currentChatUser?.id === data?.id) {
			dispatch({
				type: reducerCases.CHANGE_CURRENT_CHAT_USER,
				user: {...data},
			});
			dispatch({
				type: reducerCases.SET_ALL_CONTACTS_PAGE,
			});
		}
	};
	return (
		<div
			className={`flex cursor-pointer items-center hover:bg-background-default-hover`}
		>
			<div className="min-w-fit px-5 pt-3 pb-1">
				<Avatar type="lg" imgge={data?.profilePicture} />
			</div>
			<div className="min-h-full flex flex-col justify-center mt-3 pr-2 w-full">
				<div className="flex justify-between">
					<div>
						<span className="text-white">{data?.name}</span>
					</div>
				</div>
				<div className="flex border-b border-conversation-border pb-2 pt-1">
					<div className="flex justify-betweenw-full">
						<span className="text-secondary line-clamp-1 text-sm">
							{data?.about || ""}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ChatListItem;
