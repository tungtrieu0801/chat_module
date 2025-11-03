import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

export type UserDocument = User & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class User {
  @Prop({ default: uuidv4 })
  id: string;

  @Prop({ type: String, unique: true })
  username: string;

  @Prop({ type: String, unique: false })
  fullname: string;

  @Prop({ type: String, unique: true })
  email: string;

  @Prop({ type: String })
  password: string;

  @Prop({ type: String, unique: true, sparse: true })
  phoneNumber: string;

  @Prop({ name: 'is_active', default: true })
  isActive: boolean;

  @Prop({ name: 'last_login', type: Date, nullable: true })
  lastLogin: Date;

  @Prop({ name: 'is_email_verified', default: false })
  isEmailVerified: boolean;

  @Prop({ name: 'is_phone_number_verified', default: false })
  isPhoneNumberVerified: boolean;

  @Prop({ type: String, nullable: true })
  avatar: string;

  @Prop({ type: String, nullable: true })
  role: string;

  @Prop({ type: [String], default: [] })
  friends: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
