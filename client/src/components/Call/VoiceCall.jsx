import {useStateProvider} from "@/context/StateContext";
import React, {useEffect} from "react";
import Container from "./Container";

function VoiceCall() {
	const [{userInfo, videoCall, voiceCall, socket}, dispatch] =
		useStateProvider();
	useEffect(() => {
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
	return <Container data={voiceCall} />;
}

export default VoiceCall;
