import Avatar from "@/components/common/Avatar";
import Input from "@/components/common/Input";
import {useStateProvider} from "@/context/StateContext";
import Image from "next/image";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

function onboarding() {
	const [{userInfo, newUser}] = useStateProvider();
	const [name, setName] = useState(userInfo?.name || "");
	const [about, setAbout] = useState("");
	const [image, setImage] = useState("/default_avatar.png");
	const router = useRouter();
	useEffect(() => {
		if (!newUser && !userInfo?.email) router.push("/onboarding");
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
	const validateDetails = () => {
		if (name.length < 3) {
			return false;
		}
		return true;
	};
	return (
		<div className="bg-panel-header-background h-screen w-screen text-white flex flex-col items-center justify-center">
			<div className="flex items-center justify-center gap-2">
				<Image src="/whatsapp.gif" alt="whatsapp" height={300} width={300} />
				<span className="text-7xl">Whatsapp</span>
			</div>
			<h2 className="text-2xl">Create your profile</h2>
			<div className="flex gap-6 mt-6">
				<div className="flex flex-col items-center justify-center mt-5 gap-6">
					<Input name="Display Name" state={name} setState={setName} Label />
					<Input name="About" state={about} setState={setAbout} Label />
					<div className="flex items-center justify-center">
						<button
							className="flex items-center justify-center gap-7 bg-search-input-container-background p-5 rounded-lg"
							onClick={onboardUserHandler}
						>
							create profile
						</button>
					</div>
				</div>
				<div>
					<Avatar type="xl" image={image} setImage={setImage} />
				</div>
			</div>
		</div>
	);
}

export default onboarding;