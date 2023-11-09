// import getPrisma Instance from "../utils/PrismaClient.js";
import getPrismaInstance from "../utils/PrismaClient.js";

export const checkUser = async (req, res, next) => {
	try {
		const {email} = req.body;

		if (!email) {
			return res.json({msg: "Email is required", status: false});
		}
		const prisma = getPrismaInstance();
		const user = await prisma.user.findUnique({where: {email}});
		if (!user) {
			return res.json({msg: "User not found", status: false});
		} else {
			return res.json({msg: "User Found", status: true, data: user});
		}
	} catch (err) {
		next(err);
	}
};
export const onBoardUser = async (req, res, next) => {
	try {
		console.log(req.body);
		const {email, name, about, image: profilePicture} = req.body;
		// if (!email || !name || profilePicture) {
		// 	return res.send("Email, Name and Image are required.");
		// }
		const prisma = getPrismaInstance();
		await prisma.user.create({
			data: {email, name, about, profilePicture},
		});
		return res.json({msg: "Success", status: true});
	} catch (err) {
		next(err);
	}
};
export const getAllUsers = async (req, res, next) => {
	try {
		const prisma = getPrismaInstance();
		const users = await prisma.user.findMany({
			orderBy: {name: "asc"},
			select: {
				id: true,
				name: true,
				email: true,
				about: true,
				profilePicture: true,
				// createdAt: true,
				// updatedAt: true,
			},
		});

		const usersGroupByInitialLetter = {};
		users.forEach((user) => {
			const initialLetter = user.name.charAt(0).toUpperCase();
			if (!usersGroupByInitialLetter[initialLetter]) {
				usersGroupByInitialLetter[initialLetter] = [];
			}
			usersGroupByInitialLetter[initialLetter].push(user);
		});
		return res.json({
			msg: "Success",
			status: true,
			users: usersGroupByInitialLetter,
		});
	} catch (err) {
		next(err);
	}
};
