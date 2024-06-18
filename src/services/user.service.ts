import UserModel, { User } from "../models/user.model";

export function createUser(input: Partial<User>) {
  return UserModel.create(input);
}

export function getAllUsers() {
  return UserModel.find();
}
export function findUserById(id: string) {
  return UserModel.findById(id);
}

export function findUserByEmailOrUsername(identifier: string) {
  return UserModel.findOne({
    $or: [{ username: identifier }, { email: identifier }],
  });
}
