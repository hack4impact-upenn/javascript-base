import mongoose from "mongoose";
import { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
});

(async () => {
    const u = new UserModel({ name: 'JohnDoe' });
    await u.save();
    const user = await UserModel.findOne();

    // prints { _id: 59218f686409d670a97e53e0, name: 'JohnDoe', __v: 0 }
    console.log(user);
})();

// Export the model and return your IUser interface
export default mongoose.model<IUser>('User', UserSchema);
