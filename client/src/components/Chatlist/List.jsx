import {useStateProvider} from "@/context/StateContext";
import {reducerCases} from "@/context/constants";
import {GET_INITIAL_CONTACTS_ROUTE} from "@/utils/ApiRoutes";
import axios from "axios";
import React, {useEffect} from "react";

function List() {
	const [{userInfo, userContacts}, dispatch] = useStateProvider();
	useEffect(() => {
		const getContacts = async () => {
			try {
				const {
					data: {users, onlineUsers},
				} = await axios(`${GET_INITIAL_CONTACTS_ROUTE}/${userInfo.id}`);
				dispatch({
					type: reducerCases.SET_ONLINE_USERS,
					onlineUsers,
				});
				dispatch({
					type: reducerCases.SET_USER_CONTACTS,
					userContacts: users,
				});
			} catch (error) {}
		};
		if (userInfo?.id) {
			getContacts();
		}
	}, []);
	return (
		<div className="bg-search-input-container-background flex-auto overflow-auto max-h-full custom-scrollbar">
			{userContacts.map((contact) => (
				<ChatListItem data={contact} key={contact.id} />
			))}
		</div>
	);
}

export default List;
