import React, {useEffect} from "react";
import ChatListHeader from "./ChatListHeader";

function ChatList() {
	const [{contactsPage}] = useStateProvider();
	const [pageType, setPageType] = useState("default");
	useEffect(() => {
		if (contactsPage) setPageType("all-contacts");
		else setPageType("default");
	}, [contactsPage]);
	return (
		<div className="bg-panel-header-background flex flex-col max-h-screen">
			{pageType === "default" && (
				<>
					<ChatListHeader />
					<SearchBar />
					<List />
				</>
			)}
			{pageType === "all-contacts" && (
				<>
					<ChatListHeader />
					<SearchBar />
					<List />
				</>
			)}
		</div>
	);
}

export default ChatList;
