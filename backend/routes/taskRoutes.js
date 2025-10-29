import express from "express";
import Task from "../models/taskModel.js";

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


router.post("/", async (req, res) => {
  try {
    const { title, dueDate } = req.body;
    const task = new Task({ title, dueDate });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to create task" });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const { title, completed, dueDate } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, completed, dueDate },
      { new: true }
    );
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Failed to update task" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task" });
  }
});

export default router;
