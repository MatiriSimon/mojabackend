// src/services/userService.ts
import { prisma } from "../config/prisma.js";

// Get all users
export const getAllUsers = async () => {
  return prisma.user.findMany({
    include: { posts: true },
  });
};

// Get user by ID
export const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    include: { posts: true },
  });
};

// Create new user
export const createUser = async (email: string, name?: string) => {
  return prisma.user.create({
    data: { email, name },
  });
};

// Update user
export const updateUser = async (id: string, data: { email?: string; name?: string }) => {
  return prisma.user.update({
    where: { id },
    data,
  });
};

// Delete user
export const deleteUser = async (id: string) => {
  try {
    return await prisma.user.delete({
      where: { id },
    });
  } catch (error: unknown) {
    if (error instanceof Error && 'code' in error && error.code === 'P2025') {
      throw new Error("User record to delete not found.");
    }
    throw error;
  }
};