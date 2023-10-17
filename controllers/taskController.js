import { Task } from "../model/taskModel.js";
import { ErrorHandler } from "../utils/errorHandler.js";

export const addNewTask = async (req, res, next) => {

    try {
        const { title, description } = req.body;

        // const task = new Task({ title, description, user: req.user });
        // await task.save();

        await Task.create({
            title,
            description,
            user: req.user
        });

        res.status(201).json({
            success: true,
            message: 'Task added successfully'
        });
    } catch (error) {
        next(error)
    }
};

export const getMyTask = async (req, res, next) => {

    try {
        const userId = req.user._id;

        const tasks = await Task.find({ user: userId });

        res.status(200).json({
            success: true,
            tasks
        });
    } catch (error) {
        next(error)
    }
};

export const updateTask = async (req, res, next) => {

    try {

        const task = await Task.findById(req.params.taskId);

        if (!task) {
            // return res.status(404).json({
            //     success: false,
            //     message: 'task not found'                            // error handler
            // });     

            // return next(new Error('No task found'));
            return next(new ErrorHandler('No task found', 404));
        };

        task.isCompleted = !task.isCompleted;

        await task.save();

        res.status(200).json({
            success: true,
            message: 'Updated task'
        });
    } catch (error) {
        next(error)
    }
}

export const deleteTask = async (req, res, next) => {

    try {
        const task = await Task.findById(req.params.taskId);

        if (!task) {
            return next(new ErrorHandler('No task found', 404));
        };

        await task.deleteOne();

        res.status(200).json({
            success: true,
            message: 'task has been deleted'
        });
    } catch (error) {
        next(error)
    }
}