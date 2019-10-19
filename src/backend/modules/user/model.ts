import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.methods.comparePassword = async function(password: string) {
  return await bcrypt.compare(password, this.password);
};