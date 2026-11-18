import { MongoUnexpectedServerResponseError } from "typeorm/driver/mongodb/typings.js";
import { UserEntity } from "../entities/User.entity.js";
import * as userRepository  from "../repositories/user.repository.js";
import * as UserError from "../errors/user.error.js"
import bcrypt from "bcrypt";

export const getAllUsers = () => {

  const existingUsers = userRepository.getAll()

  if (!existingUsers) {
    throw new UserError.UserNotFound();
  }

  return existingUsers
}

export const getUserById = (id: number) => {

  const existingUser = userRepository.findById(id)

  if (!existingUser) {
    throw new UserError.UserNotFound();
  }

  return existingUser
}

export const deleteUserById = async (id: number) => {

  const result = await userRepository.deleteUser(id);

  if (result.affected === 0) {
    throw new UserError.UserDontExists();
  }

  return "Ok";
};

export const CreateUser = async (userToCreate: any): Promise<UserEntity> => {

  const existingUser = await userRepository.findByEmail(userToCreate.email)

  if (existingUser) {
    throw new UserError.UserAlreadyExists();
  }

  const hachedPassword = await bcrypt.hash(userToCreate.password, 10)
  userToCreate.password = hachedPassword

  const createUser = userRepository.CreateUser(userToCreate)

  return createUser
}

export const UpdateUser = async (
    id: number,
    userToUpdate: {
        username?: string;
        email?: string;
        password?: string;
    }
): Promise<UserEntity> => {

  const existingUser = await userRepository.findById(id);

  if (!existingUser) {
      throw new UserError.UserNotFound();
  }

  if (userToUpdate.email && userToUpdate.email !== existingUser.email) {
    const emailUser = await userRepository.findByEmail(userToUpdate.email);

    if (emailUser && emailUser.id !== id) {
        throw new UserError.UserAlreadyExists();
    }
  }

  if (userToUpdate.password) {
      userToUpdate.password = await bcrypt.hash(userToUpdate.password, 10);
  }

  const updatedUser = await userRepository.updateUser(id, userToUpdate);

  if (!updatedUser) {
      throw new UserError.UserNotFound();
  }

  return updatedUser;
};