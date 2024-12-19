import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  avatar: String,
  avatarPublicId: String,
  lastName: {
    type: String,
    default: "lastName",
  },
  location: {
    type: String,
    default: "Mars",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

// sending json without password function
UserSchema.methods.toJSONFunction = function () {
  // toJSONFunction we made it
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("User", UserSchema);
