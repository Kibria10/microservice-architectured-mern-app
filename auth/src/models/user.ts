import mongoose from "mongoose";
import { Password } from "../services/password";
// An interface that describes the properties
// that are requried to create a new User
interface UserAttrs {
  email: string;
  password: string;
  name: string;
  role: string,
  department: string,
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  name: string;
  role: string,
  department: string,
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  }
},
  //making changes to the json responce format
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id; // creating a id property
        delete ret._id; // delete the _id property
        delete ret.password; //deleting the pw property
        delete ret.__v; //deleting the __v property that comes up with mongodb
      }
    }
  });
userSchema.pre("save", async function (done) {
  //isModified middlware is to prevent from hashing a pw which is already been hashed
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
