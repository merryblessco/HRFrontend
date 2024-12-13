import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import TaskForm from "../../../components/forms/TaskForm";
import PageTitle from "../../../components/ui/PageTitle";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

interface OnboardingTask {
  id: number;
  taskName: string;
  assignee: string;
  dueDate: string;
  status: "Not Started" | "In Progress" | "Completed";
  description: string;
}

// TaskCard Component
const TaskCard: React.FC<{
  task: OnboardingTask;
  handleEdit: (task: OnboardingTask) => void;
  handleDelete: (id: number) => void;
}> = ({ task, handleEdit, handleDelete }) => {
  return (
    <li className="p-6 mb-4 bg-white border-[.8px] rounded-lg hover:shadow-sm transition-shadow duration-300 ease-in-out">
      <div className="flex flex-col sm:flex-row sm:justify-between">
        {/* Main Info Section */}
        <div className="flex-1">
          <h5 className="text-xl font-semibold text-gray-800 mb-2">
            {task.taskName}
          </h5>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Assignee:</span> {task.assignee}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Due Date:</span> {task.dueDate}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Status:</span> {task.status}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Description:</span> {task.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 sm:mt-0 sm:ml-4 flex items-center space-x-4">
          <div className="flex space-x-2">
            <button
              className="text-primary-1 py-1 px-2 rounded"
              onClick={() => handleEdit(task)}
            >
              <PencilSquareIcon className="w-4 h-4" />
            </button>
            <button
              className="text-red-500 py-1 px-2 rounded"
              onClick={() => handleDelete(task.id)}
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

// Main OnboardingWorkflows Component
const OnboardingWorkflows: React.FC = () => {
  const [tasks, setTasks] = useState<OnboardingTask[]>([]);
  const [newTask, setNewTask] = useState<Omit<OnboardingTask, "id">>({
    taskName: "",
    assignee: "",
    dueDate: "",
    status: "Not Started",
    description: "",
  });
  const [editingTask, setEditingTask] = useState<OnboardingTask | null>(null);

  useEffect(() => {
    // In a real application, fetch tasks from an API
    const mockTasks: OnboardingTask[] = [
      {
        id: 1,
        taskName: "Complete paperwork",
        assignee: "HR Department",
        dueDate: "2023-07-20",
        status: "In Progress",
        description: "Fill out all necessary forms",
      },
      {
        id: 2,
        taskName: "Set up workstation",
        assignee: "IT Department",
        dueDate: "2023-07-22",
        status: "Not Started",
        description: "Prepare computer and necessary software",
      },
    ];
    setTasks(mockTasks);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (editingTask) {
      setEditingTask({ ...editingTask, [name]: value });
    } else {
      setNewTask({ ...newTask, [name]: value });
    }
  };

  const handleSubmit = (values: Omit<OnboardingTask, "id">) => {
    if (editingTask) {
      setTasks(
        tasks.map((task) =>
          task.id === editingTask.id ? { ...editingTask, ...values } : task
        )
      );
      setEditingTask(null);
    } else {
      const id = Math.max(0, ...tasks.map((t) => t.id)) + 1;
      setTasks([...tasks, { id, ...values }]);
    }
  };

  const handleEdit = (task: OnboardingTask) => {
    setEditingTask(task);
  };

  const handleDelete = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="flex flex-col">
      <PageTitle title="Onboarding Workflows" />
      <div className="pt-10 p-6 border-[.8px] rounded-xl">
        <div className="flex flex-col w-full">
          <TaskForm task={editingTask || newTask} handleSubmit={handleSubmit} />

          <ul className="mt-6 space-y-4">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWorkflows;
