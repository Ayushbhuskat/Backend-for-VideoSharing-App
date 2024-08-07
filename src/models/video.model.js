import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const Videoschema = new Schema(
    {
      Videofile : {
        type : String, //cloundnary url
        required : true
      },
      Thumbnail: {
        type : String, //cloundnary url
        required : true
      },
      title : {
        type : String, 
        required : true
      },
      description: {
        type : String, 
        required : true
      },
      Time : {
        type : Number, //cloundnary url
        required : true
      },
      duration : {
        type : Number,
        required : true
      },
      views : {
        type : Number,
        default : 0,
      },
      Ispublished : {
        type : Boolean,
        default : true
      },
      Owner : {
        type : Schema.Types.ObjectId,
        ref : "user"
      }
      
     
    },
    {
        timestamps : true
    }
)
Videoschema.plugin(mongooseAggregatePaginate)

export const video = mongoose.model("video",Videoschema)