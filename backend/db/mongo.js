import mongoose from "mongoose";

const mongo = async () => {
	try {
		await mongoose.connect(process.env.MONGO_DB);
		console.log("Connected Mongo");
	} catch (err) {
		console.log("Error in MongoDB", err.message);
	}
};

export default mongo;
