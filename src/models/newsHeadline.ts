import mongoose from "mongoose";
const Schema = mongoose.Schema;

const NewsHeadlineSchema = new Schema(
  {
    headlines: {
        type: Array,
        required: false,
        validate: {
          validator: function(arr:any) {
            return arr.length >= 0 && arr.length <= 5;
          },
          message: (props:any) => `${props.value} is not an array with a length between 0 and 5!`,
        },
    },
  },
  {
    timestamps: true,
  }
);

export const NewsHeadline = mongoose.models.NewsHeadline || mongoose.model("NewsHeadline", NewsHeadlineSchema);
