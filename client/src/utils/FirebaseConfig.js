import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
	apiKey: "AIzaSyDvhqnnR_EPAietk6BMLOjUcrJyqUEhNP4",
	authDomain: "chat-app-ff86d.firebaseapp.com",
	projectId: "chat-app-ff86d",
	storageBucket: "chat-app-ff86d.appspot.com",
	messagingSenderId: "344070690762",
	appId: "1:344070690762:web:3774d71f19e675df74a133",
	measurementId: "G-XHLE4C0BQM",
};
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
