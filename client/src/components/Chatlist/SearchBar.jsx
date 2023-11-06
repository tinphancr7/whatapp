import React from "react";
import {BiSearchAlt2} from "react-icons/bi";
import {BsFilter} from "react-icons/bs";

function SearchBar() {
	return (
		<div className="bg-sprch-input-container-background flex py-3 pl-5">
			<div className="bg-panel-header-background flex items-center gap-2">
				<div>
					<BiSearchAlt2 className=" atext-panel-header-icon cursor-pointer text-left" />
				</div>
				<div>
					<input
						type="text"
						placeholder=" Search or start a new chat"
						text-wt
						cLassName="bg-transparent text-sm focus:outline-none"
					/>
				</div>
			</div>
			<div className="pr-5 pl-3">
				<BsFilter className=" atext-panel-header-icon cursor-pointer text-left" />
			</div>
		</div>
	);
}

export default SearchBar;
