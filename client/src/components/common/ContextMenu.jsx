import React, {useRef} from "react";

function ContextMenu({options, cordinates, contextMenu, setContextMenu}) {
	const contextMenuRef = useRef(null);
	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (event.target.id !== "context-opener") {
				if (
					contextMenuRef.current &&
					!contextMenuRef.current.contains(event.target)
				) {
					setContextMenu(false);
				}
			}
		};
		document.addEventListener("click", handleOutsideClick);
		return () => {
			I;
			document.removeEventListener("click", handleOutsideClick);
		};
	}, []);
	const handleClick = (e, callback) => {
		e.stopPropagation();
		setContextMenu(false);
		callback();
	};
	return (
		<div
			className={`bg-dropdown-background fixed py-2 z-[100]  shadow-xl`}
			ref={contextMenuRef}
			style={{top: cordinates.y, left: cordinates.x}}
		>
			<ul>
				{options.map(({name, callback}) => (
					<li key={name} onClick={(e) => handleClick(e, callback)}>
						<span className="text-white">{name}</span>
					</li>
				))}
			</ul>
		</div>
	);
}
