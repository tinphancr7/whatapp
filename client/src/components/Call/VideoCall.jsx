import React from "react";

function VideoCall() {
	const [{userInfo, videoCall, socket}, dispatch] = useStateProvider();
	useEffect(() => {
		if (videoCall.callType === "out-going") {
			socket.current.emit("outgoing-video-call", {
				to: videoCall.id,
				from: {
					id: userInfo.id,
					name: userInfo.name,
					profilePicture: userInfo.profileImage,
				},
				callType: videoCall.callType,
				roomId: videoCall.roomId,
			});
		}
	}, []);
	return <div>VideoCall</div>;
}

export default VideoCall;
