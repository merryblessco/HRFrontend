import React, { useState, useEffect } from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { FaClock, FaPlay, FaStop } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "../../../components/ui/InputField";
import TextAreaField from "../../../components/ui/TextAreaField";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import PageTitle from "../../../components/ui/PageTitle";

interface TimeEntry {
  id: number;
  employeeId: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  project: string;
  description: string;
  isAutomated: boolean;
}

const columns: TableColumnsType<TimeEntry> = [
  {
    title: "Date",
    dataIndex: "date",
    width: "15%",
  },
  {
    title: "Employee ID",
    dataIndex: "employeeId",
    width: "15%",
  },
  {
    title: "Start Time",
    dataIndex: "startTime",
    width: "10%",
  },
  {
    title: "End Time",
    dataIndex: "endTime",
    width: "10%",
  },
  {
    title: "Duration",
    dataIndex: "duration",
    render: (duration) => `${Math.floor(duration / 60)}h ${duration % 60}m`,
    width: "10%",
  },
  {
    title: "Project",
    dataIndex: "project",
    width: "15%",
  },
  {
    title: "Description",
    dataIndex: "description",
    width: "20%",
  },
  {
    title: "Type",
    dataIndex: "isAutomated",
    render: (isAutomated) => (isAutomated ? "Automated" : "Manual"),
    width: "10%",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    width: "10%",
    render: (_, record) => (
      <div className="flex space-x-2">
        <button
          className="text-primary-1 py-1 px-2 rounded"
          onClick={() => console.log("Edit", record)}
        >
          <PencilSquareIcon className="w-4 h-4" />
        </button>
        <button
          className="text-red-500 py-1 px-2 rounded"
          onClick={() => console.log("Delete", record.id)}
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
    ),
  },
];

const TimeTracking: React.FC = () => {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<TimeEntry | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [trackingStartTime, setTrackingStartTime] = useState<Date | null>(null);

  useEffect(() => {
    const savedEntries = localStorage.getItem("timeEntries");
    if (savedEntries) {
      setTimeEntries(JSON.parse(savedEntries));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("timeEntries", JSON.stringify(timeEntries));
  }, [timeEntries]);

  const handleDeleteEntry = (id: number) => {
    const updatedEntries = timeEntries.filter((entry) => entry.id !== id);
    setTimeEntries(updatedEntries);
    localStorage.setItem("timeEntries", JSON.stringify(updatedEntries));
  };

  const handleShowModal = (entry: TimeEntry | null) => {
    setCurrentEntry(entry);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentEntry(null);
  };

  const handleStartTracking = () => {
    setIsTracking(true);
    setTrackingStartTime(new Date());
  };

  const handleStopTracking = () => {
    if (trackingStartTime) {
      const endTime = new Date();
      const duration =
        (endTime.getTime() - trackingStartTime.getTime()) / 60000;
      const newEntry: TimeEntry = {
        id: Date.now(),
        employeeId: "Current User",
        date: endTime.toISOString().split("T")[0],
        startTime: trackingStartTime.toTimeString().split(" ")[0].substr(0, 5),
        endTime: endTime.toTimeString().split(" ")[0].substr(0, 5),
        duration: Math.round(duration),
        project: "Automated Entry",
        description: "Automatically tracked time",
        isAutomated: true,
      };
      setTimeEntries([...timeEntries, newEntry]);
      setIsTracking(false);
      setTrackingStartTime(null);
    }
  };

  // Form validation schema
  const validationSchema = Yup.object({
    employeeId: Yup.string().required("Employee ID is required"),
    date: Yup.date().required("Date is required").nullable(),
    startTime: Yup.string().required("Start Time is required"),
    endTime: Yup.string()
      .required("End Time is required")
      .test(
        "is-greater",
        "End Time must be later than Start Time",
        function (value) {
          const { startTime } = this.parent;
          return startTime && value
            ? new Date(`1970-01-01T${value}:00`) >
                new Date(`1970-01-01T${startTime}:00`)
            : true;
        }
      ),
    project: Yup.string().required("Project is required"),
    description: Yup.string().max(
      500,
      "Description must be less than 500 characters"
    ),
  });

  // Formik form initialization
  const formik = useFormik({
    initialValues: {
      employeeId: currentEntry?.employeeId || "",
      date: currentEntry?.date || "",
      startTime: currentEntry?.startTime || "",
      endTime: currentEntry?.endTime || "",
      project: currentEntry?.project || "",
      description: currentEntry?.description || "",
    },
    validationSchema,
    onSubmit: (values) => {
      const newEntry: TimeEntry = {
        id: currentEntry?.id || Date.now(),
        employeeId: values.employeeId,
        date: values.date,
        startTime: values.startTime,
        endTime: values.endTime,
        duration: calculateDuration(values.startTime, values.endTime),
        project: values.project,
        description: values.description,
        isAutomated: false,
      };

      if (currentEntry) {
        setTimeEntries(
          timeEntries.map((entry) =>
            entry.id === currentEntry.id ? newEntry : entry
          )
        );
      } else {
        setTimeEntries([...timeEntries, newEntry]);
      }
      handleCloseModal();
    },
  });

  const calculateDuration = (startTime: string, endTime: string): number => {
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
    return (end.getTime() - start.getTime()) / 60000;
  };

  return (
    <div className="flex flex-col">
      <PageTitle title="Time Tracking" />

      <div className="pt-10 p-6 border-[.8px] rounded-xl">
        <div className="flex flex-col w-full">
          <div className="flex flex-wrap space-x-2 mb-4">
            <button
              className="btn btn-primary"
              onClick={() => handleShowModal(null)}
            >
              Add Manual Entry
            </button>
            {!isTracking ? (
              <button
                className="btn btn-success flex items-center"
                onClick={handleStartTracking}
              >
                <FaPlay className="ml-3 mr-2 text-primary-1" /> Start Tracking
              </button>
            ) : (
              <button
                className="btn btn-danger flex items-center"
                onClick={handleStopTracking}
              >
                <FaStop className="ml-3 mr-2 text-red-400" /> Stop Tracking
              </button>
            )}
          </div>
          {isTracking && (
            <div className="bg-primary-3 text-primary-1 p-2 rounded-md mb-4">
              <FaClock className="inline-block mr-2" /> Time tracking started at
              {trackingStartTime?.toLocaleTimeString()}
            </div>
          )}
          <div className="w-full">
            <Table
              scroll={{ x: 500 }}
              columns={columns}
              dataSource={timeEntries}
              rowKey="id"
              className="bg-white shadow-md rounded-lg"
            />
          </div>

          {showModal && (
            <Modal
              formik={formik}
              handleCloseModal={handleCloseModal}
              currentEntry={currentEntry}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// Modal Component
const Modal: React.FC<{
  formik: any;
  handleCloseModal: () => void;
  currentEntry: TimeEntry | null;
}> = ({ formik, handleCloseModal, currentEntry }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h3 className="text-xl mb-4">
          {currentEntry ? "Edit Time Entry" : "Add Time Entry"}
        </h3>
        <form onSubmit={formik.handleSubmit}>
          <InputField
            label="Employee ID"
            id="employeeId"
            name="employeeId"
            type="text"
            value={formik.values.employeeId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.employeeId && formik.errors.employeeId}
          />
          <InputField
            label="Date"
            id="date"
            name="date"
            type="date"
            value={formik.values.date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.date && formik.errors.date}
          />
          <InputField
            label="Start Time"
            id="startTime"
            name="startTime"
            type="time"
            value={formik.values.startTime}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.startTime && formik.errors.startTime}
          />
          <InputField
            label="End Time"
            id="endTime"
            name="endTime"
            type="time"
            value={formik.values.endTime}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.endTime && formik.errors.endTime}
          />
          <InputField
            label="Project"
            id="project"
            name="project"
            type="text"
            value={formik.values.project}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.project && formik.errors.project}
          />
          <TextAreaField
            label="Description"
            id="description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description && formik.errors.description}
          />
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {currentEntry ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TimeTracking;
