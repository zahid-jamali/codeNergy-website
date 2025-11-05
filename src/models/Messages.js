import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
    seen: {
      type: Boolean,
      default: "false",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Message || mongoose.model("Message", schema);
