import mongosse from "mongoose";

export const connection = ()=>{
    mongosse.connect(process.env.MONGO_URI, {
        dbName:"Job_Portal"
    }).then(()=>{
        console.log("Connected to MongoDB");
    }).catch(err=>{
        console.log(`Error connecting to MongoDB: ${err}`);
    });
}