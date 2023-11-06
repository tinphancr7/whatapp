import React, {useEffect} from "react";
import Image from "next/image";
import {FcGoogle} from "react-icons/fc";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {CHECK_USER_ROUTE} from "@/utils/ApiRoutes";
import {useStateProvider} from "@/context/StateContext";
import {useRouter} from "next/router";
import {reducerCases} from "@/context/constants";
import {auth, firebaseAuth} from "@/utils/FirebaseConfig";

function login() {
	const router = useRouter();
	const [{userInfo, newUser}, dispatch] = useStateProvider();

	useEffect(() => {
		if (userInfo?.id && !newUser) router.push("/");
	}, [userInfo, newUser]);
	const handleLogin = async () => {
		const provider = new GoogleAuthProvider();
		const {
			user: {displayName, email, photoURL, uid},
		} = await signInWithPopup(auth, provider);
		try {
			if (email) {
				const {data} = await axios.post(CHECK_USER_ROUTE, {
					email,
				});
				if (data.status) {
					dispatch({
						type: reducerCases.SET_USER_INFO,
						userInfo: {
							name: data.name,
							email: data.email,
							profileImage: data.image,
							status: data.status,
						},
					});
					dispatch({
						type: reducerCases.SET_NEW_USER,
						newUser: false,
					});
					router.push("/onboarding");
				}
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="flex justify-center items-center bg-panel-header-background">
			<div className="flex items-center justify-center gap-2 text-white">
				<Image src="/whatsapp.gif" alt="whatsapp" height={300} width={300} />
				<span className="text-7xl">Whatsapp</span>
			</div>
			<button
				className="flex items-center justify-center gap-7 bg-search-input-container-background p-5 rounded-lg"
				onClick={handleLogin}
			>
				<FcGoogle className="text-4xl" />
				<span className="text-white text-2xl">Sign in with Google</span>
			</button>
		</div>
	);
}

export default login;
