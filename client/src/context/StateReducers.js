import {reducerCases} from "./constants";
export const initialState = {
	userInfo: undefined,
	newUser: false,
	contactsPage: false,
	currentChatUser: undefined,
	messages: [],
	socket: undefined,
	messageSearch: false,
	userContacts: [],
	onlineUsers: [],
	videoCall: undefined,
	voiceCall: undefined,
	incommingVoiceCall: undefined,
	incommingVideoCall: undefined,
};
const reducer = (state, action) => {
	switch (action.type) {
		case reducerCases.SET_USER_INFO: {
			return {
				...state,
				userInfo: action.userInfo,
			};
		}
		case reducerCases.SET_NEW_USER:
			return {
				...state,
				newUser: action.newUser,
			};
		case reducerCases.SET_ALL_CONTACTS_PAGE: {
			return {
				...state,
				contactsPage: !state.contactsPage,
			};
		}
		case reducerCases.CHANGE_CURRENT_CHAT_USER: {
			return {
				...state,
				currentChatUser: action.user,
			};
		}
		case reducerCases.SET_MESSAGES: {
			return {
				...state,
				messages: action.messages,
			};
		}
		case reducerCases.SET_SOCKET: {
			return {
				...state,
				socket: action.socket,
			};
		}
		case reducerCases.ADD_MESSAGE: {
			return {
				...state,
				messages: [...state.messages, action.newMessage],
			};
		}
		case reducerCases.SET_MESSAGE_SEARCH: {
			return {
				...state,
				messageSearch: !state.messageSearch,
			};
		}
		case reducerCases.SET_USER_CONTACTS: {
			return {
				...state,
				userContacts: action.userContacts,
			};
		}
		case reducerCases.SET_ONLINE_USERS: {
			return {
				...state,
				onlineUsers: action.onlineUsers,
			};
		}
		case reducerCases.SET_CONTACT_SEARCH: {
			return {
				...state,
				contactSearch: !state.contactSearch,
			};
		}
		case reducerCases.SET_VIDEO_CALL: {
			return {
				...state,
				videoCall: action.videoCall,
			};
		}
		case reducerCases.SET_VOICE_CALL: {
			return {
				...state,
				voiceCall: action.voiceCall,
			};
		}
		case reducerCases.END_CALL: {
			return {
				...state,
				voiceCall: undefined,
				videoCall: undefined,
				incommingVoiceCall: undefined,
				incommingVideoCall: undefined,
			};
		}
		case reducerCases.SET_INCOMING_VOICE_CALL: {
			return {
				...state,
				incommingVoiceCall: action.incommingVoiceCall,
			};
		}
		case reducerCases.SET_INCOMING_VIDEO_CALL: {
			return {
				...state,
				incommingVideoCall: action.incommingVideoCall,
			};
		}

		default:
			return state;
	}
};
export default reducer;
