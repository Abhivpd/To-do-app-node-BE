import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addNewTask, deleteTask, getMyTask, updateTask } from "../controllers/taskController.js";

const router = Router();

router.post('/new', isAuthenticated, addNewTask);

router.get('/myTask', isAuthenticated, getMyTask);

router.route('/:taskId').put(isAuthenticated, updateTask).delete(isAuthenticated, deleteTask);

export default router;