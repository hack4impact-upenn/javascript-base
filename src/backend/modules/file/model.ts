import { prop, getModelForClass, DocumentType, Ref, arrayProp } from "@typegoose/typegoose";
import { IUser } from "../user/model"
import { User } from "../../models"

export class IFile {
  @prop({ required: true })
  public name!: String;

  @prop({ ref: "IUser", required: true })
  public owner!: Ref<IUser>;

  @prop({ required : true })
  public type!: String;

  @prop({ required : true})
  public uploadDate!: Date;
}

export const fileValidateUserAccess = (file : DocumentType<IFile>, user: DocumentType<IUser>) : Boolean => {
  return file.owner == user.id || file.owner == user;
}