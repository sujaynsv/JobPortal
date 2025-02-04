import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js"
import { User } from "../models/userSchema.js";
import {v2 as cloudinary} from "cloudinary";

export const register = catchAsyncErrors(async(req,res,next)=>{
    try{
        const{name,
              email,
              phone,
              address,
              password,
              role,
              firstDomain,
              secondDomain,
              thirdDomain,
              coverLetter}= req.body;
               
            if(!name || !email || !phone || !address|| !password|| !role){
                return next(new ErrorHandler("All Fields are required.", 400));
            }
            if(role==="Job Seeker" && (!firstDomain || !secondDomain || !thirdDomain)){
                return next(new ErrorHandler("Please Provide your preferred Domains.", 400));
            }

            const existingUser= await User.findOne({email});
            if(existingUser){
                return next(new ErrorHandler("User Already Exist.", 400));
            }
            const userData={
              name,
              email,
              phone,
              address,
              password,
              role,
              domain: {
                firstDomain,
                secondDomain,
                thirdDomain
              },
              coverLetter
            };
            if(req.files && req.files.resume){
                const {resume} = req.files;
                if(resume){
                    try{
                        const cloudinaryResonse= await cloudinary.uploader.upload(resume.tempFilePath,
                            {folder: "Job_Seekers_Resume"}
                        )
                        if(!cloudinaryResonse || cloudinaryResonse.error){
                            return next(new ErrorHandler("Failed to Upload Resume to Cloud.", 500));
                        }
                        userData.resume= {
                            public_id: cloudinaryResonse.public_id,
                            url: cloudinaryResonse.secure_url
                        };
                    }catch(error){
                        return next(new ErrorHandler("Failed to upload Resume", 500));
                    }
                }
            }
            const user = await user.create(userData);
            res.status(201).json({
                success: true,
                message: "User Registered",
            })
            } catch(error) {
                next(error);
            }
});