import mongoose from "mongoose";

const schema = mongoose.Schema({
  title: String,
  image: String,
  description: String,
  service: { type: mongoose.Schema.ObjectId, ref: "Service" },
});

export default mongoose.models.Project || mongoose.model("Project", schema);
