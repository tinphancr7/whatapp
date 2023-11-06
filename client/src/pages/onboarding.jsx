import {useEffect, useState} from "react";

function onboarding() {
	const [{userInfo, newUser}] = useStateProvider();
	const [name, setName] = useState(userInfo?.name || "");
	const [about, setAbout] = useState("");
	const [image, setImage] = useState("/default_avatar.png");
	useEffect(() => {
		if (!newUser && !userInfo?.email) router.push("/login");
		else if (!newUser && userInfo?.email) router.push("/");
	}, [userInfo, newUser]);
	const onboardUserHandler = async () => {
		if (validateDetails) {
			const email = userInfo?.email;
			try {
				const {data} = await axios.post("/api/onboarding", {
					id: data.id,
					email,
					name,
					about,
					image,
				});
				if (data.status) {
					dispatch({type: reducerCases.SET_NEW_USER, newUser: false});
					dispatch({
						type: reducerCases.SET_USER_INFO,
						userInfo: {
							name,
							email,
							profileImage: image,
							status: about,
						},
					});
					router.push("/");
				}
			} catch (err) {
				console.log(err);
			}
		}
	};
	return (
		<div className="bg-panel-header-background h-screen w-screen text-white">
			<div className="flex items-center justify-center gap-2">
				<Image src="/whatsapp.gif" alt="whatsapp" height={300} width={300} />
				<span className="text-7x1">Whatsapp</span>
			</div>
			<h2 className="text-2x1">Create your profile</h2>
			<div className="flex gap-6 mt-6">
				<div className="flex flex-col items-center justify-center mt-5 gap-6">
					<Input name="Display Name" state={name} setState={setName} Label />
					<Input name="About" state={about} setState={setAbout} Label />
					<div className="flex items-center justify-center">
						<button
							className="flex items-center justify-center gap-7 bg-search-input-container-background rounded-lg"
							onClick={onboardUserHandler}
						>
							create profile
						</button>
					</div>
				</div>
				<div>
					<Avatar type="x1" image={image} setImage={setImage} />
				</div>
			</div>
		</div>
	);
}

export default onboarding;
