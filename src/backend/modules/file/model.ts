import { prop, getModelForClass, DocumentType, Ref, arrayProp } from "@typegoose/typegoose";
import { IUser } from "../user/model"
import { User } from "../../models"

enum PermissionType {
  USER = 'user',
  ROLE = 'role',
  GROUP = 'group'
}

export class IFile {
  @prop({ required: true })
  public name!: String;

  @prop({ ref: "IUser", required: true })
  public owner!: Ref<IUser>;

  @prop({ required : true })
  public type!: String;

  @prop({ required : true})
  public uploadDate!: Date;

  // Store each permission as string "type|value"
  @arrayProp( {items: String, default: []} )
  public permissions!: String[]
}

const permissionValidate = (permission : String, user: DocumentType<IUser>) : Boolean => {
  console.log("Validate called")
  let [type, value] = permission.split(/_(.+)/);
  if(type === PermissionType.ROLE) {
    return user.role == value
  } else if (type == PermissionType.USER) {
    return user.email == value
  }
  return false;
} 

export const validateUserPermission = (file : DocumentType<IFile>, user: DocumentType<IUser>) : Boolean => {
  return file.owner == user.id || file.permissions.some((p) => permissionValidate(p, user));
}