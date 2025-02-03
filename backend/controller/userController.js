import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import ErrorHandler from "../middlewares/error.js"
import { User } from "../models/userSchema.js";

export const register = catchAsyncErrors(async(req,res,next)=>{
    try{
        const{name,email,phone,address,password,role,firstDomain,secondDomain,thirdDomain,coverLetter}= req.body;
    } catch(error) {

    }
})