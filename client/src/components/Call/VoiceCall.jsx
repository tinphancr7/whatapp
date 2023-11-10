import {useStateProvider} from "@/context/StateContext";
import React, {useEffect} from "react";

function VoiceCall() {
	useEffect(() => {
		const [{userInfo, videoCall, voiceCall, socket}, dispatch] =
			useStateProvider();
		if (voiceCall.callType === "out-going") {
			socket.current.emit("outgoing-voice-call", {
				to: voiceCall.id,
				from: {
					id: userInfo.id,
					name: userInfo.name,
					profilePicture: userInfo.profilePicture,
				},
				callType: voiceCall.callType,
				roomId: voiceCall.roomId,
			});
		}
	}, []);
	return <div>VoiceCall</div>;
}

export default VoiceCall;
