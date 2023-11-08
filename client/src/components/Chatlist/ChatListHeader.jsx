import {useStateProvider} from "@/context/StateContext";
import Avatar from "../common/Avatar";
import {BsFillChatLeftTextFill, BsThreeDotsVertical} from "react-icons/bs";
import {reducerCases} from "@/context/constants";

function ChatListHeader() {
	const [{userInfo}, dispatch] = useStateProvider();
	const handleAllContactsPage = () => {
		dispatch({type: reducerCases.SET_ALL_CONTACTS_PAGE});
	};
	return (
		<div className="h-16 text-white px-4 py-3 flex justify-between items-center">
			<div className="cursor-pointer">
				<Avatar
					type="sm"
					image={
						userInfo?.profileImage ||
						"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fprofile_3135715&psig=AOvVaw2THGlwa2jakc7Lct4gV2GU&ust=1699450840923000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCKD_iu-BsoIDFQAAAAAdAAAAABAE"
					}
				/>
			</div>
			<div className="flex gap-6">
				<BsFillChatLeftTextFill
					className="text-panel-header-icon cursor-pointer text-xl"
					title="New Chat"
					onClick={() => handleAllContactsPage()}
				/>
				<BsThreeDotsVertical
					className="text-panel-header-icon cursor-pointer text-xl"
					title="Menu"
				/>
			</div>
		</div>
	);
}
export default ChatListHeader;
