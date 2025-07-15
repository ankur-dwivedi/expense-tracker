import mongoose, { Model, Document } from 'mongoose';
import UserSchema from './schema';
import { ROLE_ENUM } from './constants';


// UserSchema.index({ organization: 1, employeeId: 1 }, { unique: true });

export interface UserDocument extends Document {
  _id: string;
  email: string;        
  name: string;           
  role: typeof ROLE_ENUM[number];  
  password?: string;   
}


const User: Model<UserDocument> =
  mongoose.models.user as Model<UserDocument> ||
  mongoose.model<UserDocument>('user', UserSchema);

export default User;
