import React from "react";

function CapturePhoto() {
	return (
		<div className="absolute h-4/6 w-2/6 top-1/4 left-1/3 bg-gray-900 gap-3">
			<div className="flex flex-col gap-4 w-full items-center justify-center">
				<div
					className="pt-2 pr-2 cursor-pointer flex items-end justify-end"
					onClick={() => hide(false)}
				>
					<IoClose className="h-10 w-10 cursor-pointer" />
				</div>
				<div className="flex justify-center">
					<video id="video" width="400" autoPlay ref={videoRef}></video>
				</div>
				<button
					className="h-16 w-16bg-white rounded-full cursor-pointer border-8 border-gray-900"
					onClick={capturePhoto}
				></button>
			</div>
		</div>
	);
}

export default CapturePhoto;
