import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

const protectRoute = async (req, res, next) => {
	try {
		const token = req.cookies.jwt;
		if (!token) {
			return res.status(401).json({ err: "Unauthorized - No Token Provided" });
		}
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		if (!decoded) {
			return res.status(401).json({ err: "Unauthorized - Invalid Token" });
		}
		const user = await User.findById(decoded.userId).select("-password");

		if (!user) {
			return res.status(404).json({ err: "User not found" });
		}
		req.user = user;
		next();
	} catch (err) {
		console.log("Error in protectRoute  ", err.message);
		res.status(500).json({ err: "Internal server error" });
	}
};

export default protectRoute;
