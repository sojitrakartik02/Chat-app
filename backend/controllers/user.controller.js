import User from "../model/user.model.js";

export const getUsersForSidebar = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;

		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

		res.status(200).json(filteredUsers);
	} catch (err) {
		console.error("Error in getUsersForSidebar: ", err.message);
		res.status(500).json({ err: "Internal server error" });
	}
};
