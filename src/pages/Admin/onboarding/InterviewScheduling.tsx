import React, { useState, useEffect } from "react";
import InterviewScheduleForm from "../../../components/forms/InterviewScheduleForm";
import PageTitle from "../../../components/ui/PageTitle";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

interface Interview {
  id: number;
  candidateName: string;
  interviewerName: string;
  interviewDate: string;
  interviewTime: string;
  position: string;
  notes: string;
}

const InterviewScheduling: React.FC = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [newInterview, setNewInterview] = useState<Omit<Interview, "id">>({
    candidateName: "",
    interviewerName: "",
    interviewDate: "",
    interviewTime: "",
    position: "",
    notes: "",
  });
  const [editingInterview, setEditingInterview] = useState<Interview | null>(
    null
  );
  const [errors, setErrors] = useState<{ [key: string]: string | false }>({});

  useEffect(() => {
    // In a real application, you would fetch interviews from an API here
    const mockInterviews: Interview[] = [
      {
        id: 1,
        candidateName: "John Doe",
        interviewerName: "Jane Smith",
        interviewDate: "2023-07-15",
        interviewTime: "10:00",
        position: "Software Developer",
        notes: "Experienced candidate",
      },
      {
        id: 2,
        candidateName: "Alice Johnson",
        interviewerName: "Bob Brown",
        interviewDate: "2023-07-20",
        interviewTime: "14:30",
        position: "Project Manager",
        notes: "Strong leadership skills",
      },
    ];
    setInterviews(mockInterviews);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: false })); // Clear errors on change
    if (editingInterview) {
      setEditingInterview({ ...editingInterview, [name]: value });
    } else {
      setNewInterview({ ...newInterview, [name]: value });
    }
  };

  const handleFormSubmit = (data: Omit<Interview, "id">) => {
    if (editingInterview) {
      setInterviews(
        interviews.map((interview) =>
          interview.id === editingInterview.id
            ? { ...editingInterview, ...data }
            : interview
        )
      );
      setEditingInterview(null);
    } else {
      const id = Math.max(0, ...interviews.map((i) => i.id)) + 1;
      setInterviews([...interviews, { id, ...data }]);
      setNewInterview({
        candidateName: "",
        interviewerName: "",
        interviewDate: "",
        interviewTime: "",
        position: "",
        notes: "",
      });
    }
  };

  const handleEdit = (interview: Interview) => {
    setEditingInterview(interview);
    setNewInterview({ ...interview });
  };

  const handleDelete = (id: number) => {
    setInterviews(interviews.filter((interview) => interview.id !== id));
  };

  return (
    <div className="flex flex-col">
      <PageTitle title="Interview Scheduling" />
      <div className="pt-10 p-6 border-[.8px] rounded-xl">
        <div className="flex flex-col w-full">
          <InterviewScheduleForm
            interview={editingInterview!}
            onSubmit={handleFormSubmit}
            onChange={handleInputChange}
            onBlur={() => {}}
            errors={errors}
            formValues={editingInterview || newInterview}
          />
          <ul className="space-y-4 mt-6">
            {interviews.map((interview) => (
              <li
                key={interview.id}
                className="p-6 mb-4 bg-white border-[.8px] rounded-lg hover:shadow-sm transition-shadow duration-300 ease-in-out"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  {/* Main Info Section */}
                  <div className="flex-1">
                    <h5 className="text-xl font-semibold text-gray-800 mb-2">
                      {interview.candidateName}'s Interview
                    </h5>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Interviewer:</span>{" "}
                      {interview.interviewerName}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Date:</span>{" "}
                      {interview.interviewDate}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Time:</span>{" "}
                      {interview.interviewTime}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Position:</span>{" "}
                      {interview.position}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Notes:</span>{" "}
                      {interview.notes}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 sm:mt-0 sm:ml-4 flex items-center space-x-4">
                    <div className="flex space-x-2">
                      <button
                        className="text-primary-1 py-1 px-2 rounded"
                        onClick={() => handleEdit(interview)}
                      >
                        <PencilSquareIcon className="w-4 h-4" />
                      </button>
                      <button
                        className="text-red-500 py-1 px-2 rounded"
                        onClick={() => handleDelete(interview.id)}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InterviewScheduling;
