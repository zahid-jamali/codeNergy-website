import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
      trim: true,
    },
    imagePublicId: {
      type: String,
    },

    /** CATEGORY LEVEL */
    category: {
      type: String, // Example: development, marketing, outsourcing
      required: true,
      trim: true,
    },

    /** SUBCATEGORY LEVEL */
    subcategory: {
      type: String,
    },

    /** SERVICE LEVEL */
    title: {
      type: String, // Example: Portfolio Websites
      required: true,
      trim: true,
      unique: true,
      maxlength: 100,
    },

    href: {
      type: String,
      required: false,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    sideDescription: {
      type: String,
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
