import mongoose from "mongoose";
const Schema = mongoose.Schema;

const NewsSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "News name required"],
    },
    authorIds: [{
      type: Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    }],
    description: {
        type: String,
        required: false,
    },
    author: {
        type: String,
        required: false,
    },
    coverImage: {
        publicId: {
          type: String,
          required: false,
        },
        imgUrl: {
          type: String,
          required: false,
        }
      },
    league: {
        type: String,
        required: false,
    },
    categories:[{
        type: String,
        required: false,
      }],
    content: {
        type: String,
        required: false,
    },
  },
  {
    timestamps: true,
  }
);



export const News = mongoose.models.News || mongoose.model("News", NewsSchema);