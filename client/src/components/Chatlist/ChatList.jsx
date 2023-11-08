import React, {useEffect, useState} from "react";
import ChatListHeader from "./ChatListHeader";
import {useStateProvider} from "@/context/StateContext";
import SearchBar from "./SearchBar";
import List from "./List";
import ContactsList from "./ContactsList";

function ChatList() {
	const [{contactsPage}] = useStateProvider();
	const [pageType, setPageType] = useState("default");
	useEffect(() => {
		if (contactsPage) setPageType("all-contacts");
		else setPageType("default");
	}, [contactsPage]);
	return (
		<div className="bg-panel-header-background flex flex-col max-h-screen relative z-50">
			{pageType === "default" && (
				<>
					<ChatListHeader />
					<SearchBar />
					<List />
				</>
			)}
			{pageType === "all-contacts" && <ContactsList />}
		</div>
	);
}

export default ChatList;
