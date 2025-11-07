import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    image: {
      type: String, // store image URL (local or cloud)
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    longDescription: {
      type: String,
    },
  },
  { timestamps: true }
);

const Service =
  mongoose.models.Service || mongoose.model("Service", serviceSchema);

export default Service;
