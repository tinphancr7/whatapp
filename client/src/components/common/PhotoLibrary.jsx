import Image from "next/image";
import React from "react";
import {IoClose} from "react-icons/i05";
function PhotoLibrary({setImagel, hidePhotoLibrary}) {
	const images = [
		"/avatars/1.png",
		"/avatars/2.png",
		"/avatars/3.png",
		"/avatars/4.png",
		"/avatars/5.png",
		"/avatars/6.png",
		"/avatars/7.png",
		"/avatars/8.png",
		"/avatars/9.png",
	];
	return (
		<div className="fixed top-0 left-0 max-h-[100vh] max-w[100vw] h-full w-full">
			<div className="h-max w-max bg-gray-900 gap-6 rounded-1g p-4 ">
				<div
					className="pt-2 pe-2 cursor-pointer flex items-end justify-end"
					onClick={() => hidePhotoLibrary(false)}
				>
					<IoClose className="h-10 w-10 cursor-pointer" />
				</div>
				<div className="grid grid-cols-3 justify-center items-center gap-1">
					{images.map((image, index) => (
						<div
							onClick={() => {
								setPhoto(images[index]);
								hidePhotoLibrary(false);
							}}
						>
							<div className="h-24 w-24 cursor-pointer">
								<Image src={image} alt="avatar" fill />
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
