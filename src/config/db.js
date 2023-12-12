const mongoose= require('mongoose');
const connectDB = async () => {
    try {
        //strict query flag ensures the values are inserted to schema
        mongoose.set("strictQuery", false);
        const conn = await mongoose.connect(`mongodb+srv://rkashif96:tczKMtVIOVB9VjiQ@cluster0.xtxe8yj.mongodb.net/`)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = {
    connectDB
}