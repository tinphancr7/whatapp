import React, {useEffect} from "react";
import {BiArrowBack, BiSearchAlt2} from "react-icons/bi";
import ChatLIstItem from "./ChatLIstItem";
import ChatListItem from "./ChatLIstItem";

function ContactsList() {
	const [allContacts, setAllContacts] = useState([]);
	useEffect(() => {
		const getContacts = async () => {
			const {
				data: {users},
			} = await axios.get(GET_ALL_CONTACTS_ROUTE);
			setAllContacts(users);
		};
		getContacts();
	}, []);
	return (
		<>
			<div className="h-full flex flex-col">
				<div className="flex items-center gap-12 text-white">
					<BiArrowBack className="cursor-pointer text-xl" onClick={() => {}} />
					<span>New chat</span>
				</div>
			</div>
			<div className="bg-search-input-container-background h-full flex-auto">
				<div className="flex py-3 items-center gap-3 h-14">
					<div className="bg-panel-header-background flex items-center gap-5 px-3 py-1 rounded-lg flex-grow mx-4">
						<div>
							<BiSearchAlt2 className=" atext-panel-header-icon cursor-pointer text-left" />
						</div>
						<div>
							<input
								type="text"
								placeholder=" Search Contacts"
								text-wt
								cLassName="bg-transparent text-sm focus:outline-none"
							/>
						</div>
					</div>
					{Object.entries(allContacts).map(([initialLetter, userList]) => {
						return (
							<div key={Date.now() + initialLetter}>
								<div className="text-teal-light pl-10 py-5 ">
									{initialLetter}
								</div>
								{userList.map((contact) => {
									return <ChatListItem data={contact} isContactPage={true} />;
								})}
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}

export default ContactsList;
