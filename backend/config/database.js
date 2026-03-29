import mongoose from 'mongoose';
export const connectdb=async()=>{
   try {
      const mongodbinstance=await mongoose.connect(process.env.DB_KEY);
      console.log("connection established successfully");
    
   } catch (error) {
    console.log(error);
     console.log("unable to connect to db");
   }
}
