function ChatListHeader() {
	const [{userlnfo}, dispatch] = useStateProvider();

	return;
	<div cLassName="h-16 px-4 py-3 flex justify-between items-center">
		<div className="cursor-pointer">
			<Avatar type="sm" image={userInfo?.profileImage} />
		</div>
		<div cLassName="flex gap-6">
			<BsFillChatLeftTextFill
				cLassName="text-panel-header-icon cursor-pointer text-xl"
				title="New Chat"
			/>
			<BsThreeDotsVertical
				cLassName="text-panel-header-icon cursor-pointer text-xl"
				title="Menu"
			/>
		</div>
	</div>;
}
export default ChatListHeader;
