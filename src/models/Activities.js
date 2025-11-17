import mongoose from "mongoose";

const ActivitiesSchema = new mongoose.Schema(
  {
    content: { type: String },
    link: { type: String },
  },
  { timestamps: true }
);

const Activities =
  mongoose.models.Activities || mongoose.model("Activities", ActivitiesSchema);
export default Activities;
