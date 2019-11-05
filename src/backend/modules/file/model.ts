import { prop, getModelForClass, DocumentType, Ref } from "@typegoose/typegoose";
import { IUser } from "../user/model"

export class IFile {
  @prop({ required: true })
  public name!: string;

  @prop({ ref: "IUser", required: true })
  public owner!: Ref<IUser>;
}