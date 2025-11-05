import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    isActive: { type: Boolean, default: "true" },
    loginDetails: [{ type: Date }],
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
