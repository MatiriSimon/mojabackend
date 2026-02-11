// src/controllers/userController.ts
import { Request, Response } from "express";
import * as userService from "../services/userService.js";

// GET all users
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await userService.getAllUsers();
    res.json({ 
      success: true, 
      data: users,
      count: users.length 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: (error as Error).message 
    });
  }
};

// GET user by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params as { id: string };
    const user = await userService.getUserById(id);
    
    if (!user) {
      res.status(404).json({ 
        success: false, 
        error: "User not found" 
      });
      return;
    }
    
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: (error as Error).message 
    });
  }
};

// POST create new user
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, name } = req.body;
    
    // Validation
    if (!email) {
      res.status(400).json({ 
        success: false, 
        error: "Email is required" 
      });
      return;
    }
    
    const newUser = await userService.createUser(email, name);
    res.status(201).json({ 
      success: true, 
      data: newUser,
      message: "User created successfully" 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: (error as Error).message 
    });
  }
};

// PUT update user
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params as { id: string };
    const { email, name } = req.body;
    
    const updatedUser = await userService.updateUser(id, { email, name });
    res.json({ 
      success: true, 
      data: updatedUser,
      message: "User updated successfully" 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: (error as Error).message 
    });
  }
};

// DELETE user
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params as { id: string };
    await userService.deleteUser(id);
    
    res.json({ 
      success: true,
      message: "User deleted successfully" 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: (error as Error).message 
    });
  }
};
