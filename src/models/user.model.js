import mongoose, { Schema } from "mongoose";
import { JsonWebTokenError } from "jsonwebtoken";
import bcrypt from "bcrypt"

const UserSchema = new Schema(
    {
        username : {
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true,
            index : true
        },
        email : {
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true,
        },
        Fullname : {
            type : String,
            required : true,
            trim : true,
            index : true
        },
        avatar : {
            type : String,
            required : true,
        },
        coverImage : {
            type : String,
            required : true,
        },
        Watchistory :[
            {
                type : Schema.Types.ObjectId,
                ref : "Video"
            }
        ],
        password : {
             type : String,
             required :[true,'password is required']
        },
        RefreshToken : {
            type : String
        }
    },
    {
        timestamps : true
    }
)
UserSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();     //pre hook 

    this.password = bcrypt.hash(this.password, 10)
    next()
})

UserSchema.methods.isPasswordCorrect = async function (password) {
 return await  bcrypt.compare(password,this.password) //comparing password by user and encrypted passowrd
}

UserSchema.methods.generateAcessToken = function () {
   return jwt.sign(
        {
            _id : this._id,
            email : this.email,
            username : this.username,   //payload coming from database
            Fullname : this. Fullname
        },
        process.env.ACESS_TOKEN_SECREAT,
        {
            expiresIn : process.env.ACESS_TOKEN_EXPIRY
        }
    )
}

UserSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id : this._id,
           
        },
        process.env.REFRESH_TOKEN_SECREAT,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const user = mongoose.model("user", UserSchema)