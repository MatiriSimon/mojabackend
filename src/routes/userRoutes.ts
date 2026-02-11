
import { Router } from "express";
import { 
  getUsers, 
  getUserById, 
  createUser, 
  updateUser, 
  deleteUser 
} from "../controllers/userController.js";

const router = Router();

// GET endpoints
router.get("/", getUsers);                    // GET /api/users - Get all users

router.get("/:id", getUserById);              // GET /api/users/:id - Get user by ID

// POST endpoints
router.post("/", createUser);                 // POST /api/users - Create new user

// PUT/DELETE endpoints
router.put("/:id", updateUser);               // PUT /api/users/:id - Update user
router.delete("/:id", deleteUser);            // DELETE /api/users/:id - Delete user

export default router;
