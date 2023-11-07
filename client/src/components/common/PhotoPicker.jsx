import React from "react";
import {createPortal} from "react-dom";

function PhotoPicker({onChange}) {
	const component = (
		<input type="file" hidden id="photo-picker" onchange={onchange} />
	);
	return createPortal(
		component,
		document.getElementById("photo-picker-element")
	);
}

export default PhotoPicker;
