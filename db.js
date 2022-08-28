const mongoose = require('mongoose');
const { config } = require('dotenv');

config();
const db = process.env.MONGO_URI;

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(db);
        console.log(`MongoDB connected: ${conn.connection.host}`)
	} catch (error) {
		console.error(error.message);
		process.exit(1);
	}
};

module.exports = connectDB;
