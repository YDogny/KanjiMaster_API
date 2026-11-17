import * as userRepository  from "../repositories/user.repository";
import { DeleteResult } from "typeorm";

export const getAllUsers = () => {
  try {
      const existingUsers = userRepository.getAll()
      if (!existingUsers) {
          throw new Error("No users found");
      }
      return existingUsers
  } catch (error: any) {
      throw new Error("Error fetching users: " + error.message);
  }
}

export const getUserById = (id: number) => {
  try {
      const existingUser = userRepository.findById(id)
      if (!existingUser) {
          throw new Error("User not found");
      }
      return existingUser
  } catch (error: any) {
      throw new Error("Error fetching user: " + error.message);
  }
}

export const deleteUserById = async (id: number) => {

    try {
        const result = await userRepository.deleteUser(id);

        if (result.affected === 0) {
            throw new Error("User not found");
        }

        return "Ok";

    } catch (error: any) {
        throw new Error("Error deleting user: " + error.message);
    }
};

/*
export const CreateUser = (userToCreate: any) =>{
  try {
    const existingUser = userRepository.getUserByEmail(userToCreate.email)
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const hachedPassword = jwtService.hashPassword(userToCreate.password)
    userToCreate.password = hachedPassword

    const createUser = userRepository.CreateUser(userToCreate)

    return createUser
  } catch (error) {
    throw new Error("Error creating user: " + error.message);
  }
}*/