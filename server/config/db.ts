import dns from "dns";
import mongoose from "mongoose";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("MongoDB connected");
        });
        await mongoose.connect(process.env.MONGODB_URI!);
    } catch (error: any) {
        console.error(error);
        process.exit(1);
    }
};

export default connectDB;