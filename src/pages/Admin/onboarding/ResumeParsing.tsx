import React, { useState, useEffect } from "react";
import {
  CloudArrowDownIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import PageTitle from "../../../components/ui/PageTitle";
import ResumeParseForm from "../../../components/forms/ResumeParseForm";
import { ParsedResume } from "../../../types/onboarding";

const ResumeItem: React.FC<{
  resume: ParsedResume;
  handleEdit: (resume: ParsedResume) => void;
  handleDelete: (id: number) => void;
}> = ({ resume, handleEdit, handleDelete }) => (
  <li className="p-6 mb-4 bg-white border-[.8px] rounded-lg hover:shadow-sm transition-shadow duration-300 ease-in-out">
    <div className="flex flex-col sm:flex-row sm:justify-between">
      <div className="flex-1">
        <h5 className="text-xl font-semibold text-gray-800 mb-2">
          {resume.candidateName}
        </h5>
        <p className="text-sm text-gray-600 mb-1">
          <span className="font-medium">Email:</span> {resume.email}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <span className="font-medium">Phone:</span> {resume.phone}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <span className="font-medium">Skills:</span>{" "}
          {resume.skills.join(", ")}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <span className="font-medium">Experience:</span> {resume.experience}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <span className="font-medium">Education:</span> {resume.education}
        </p>
      </div>
      <div className="mt-4 sm:mt-0 sm:ml-4 flex items-center space-x-4">
        <div className="flex space-x-2">
          <button
            className="text-primary-1 py-1 px-2 rounded"
            onClick={() => handleEdit(resume)}
          >
            <PencilSquareIcon className="w-4 h-4" />
          </button>
          <button
            className="text-red-500 py-1 px-2 rounded"
            onClick={() => handleDelete(resume.id)}
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </li>
);

const ResumeParsing: React.FC = () => {
  const [parsedResumes, setParsedResumes] = useState<ParsedResume[]>([]);
  const [newResume, setNewResume] = useState<Omit<ParsedResume, "id">>({
    candidateName: "",
    email: "",
    phone: "",
    skills: [],
    experience: "",
    education: "",
    resumeText: "",
  });
  const [editingResume, setEditingResume] = useState<ParsedResume | null>(null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    // Mock data for demo purposes
    const mockParsedResumes: ParsedResume[] = [
      {
        id: 1,
        candidateName: "John Doe",
        email: "john@example.com",
        phone: "123-456-7890",
        skills: ["JavaScript", "React"],
        experience: "5 years",
        education: "BS in Computer Science",
        resumeText: "Full resume text here...",
      },
      {
        id: 2,
        candidateName: "Jane Smith",
        email: "jane@example.com",
        phone: "987-654-3210",
        skills: ["Python", "Data Analysis"],
        experience: "3 years",
        education: "MS in Data Science",
        resumeText: "Full resume text here...",
      },
    ];
    setParsedResumes(mockParsedResumes);
  }, []);

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skills = e.target.value.split(",").map((skill) => skill.trim());
    if (editingResume) {
      setEditingResume({ ...editingResume, skills });
    } else {
      setNewResume({ ...newResume, skills });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingResume) {
      setParsedResumes(
        parsedResumes.map((resume) =>
          resume.id === editingResume.id ? editingResume : resume
        )
      );
      setEditingResume(null);
    } else {
      const id = Math.max(0, ...parsedResumes.map((r) => r.id)) + 1;
      setParsedResumes([...parsedResumes, { id, ...newResume }]);
      setNewResume({
        candidateName: "",
        email: "",
        phone: "",
        skills: [],
        experience: "",
        education: "",
        resumeText: "",
      });
    }
  };

  const handleEdit = (resume: ParsedResume) => {
    setEditingResume(resume);
  };

  const handleDelete = (id: number) => {
    setParsedResumes(parsedResumes.filter((resume) => resume.id !== id));
  };

  const handleUpload = async () => {
    if (file) {
      // Simulating parsed result
      const parsedResult: Omit<ParsedResume, "id"> = {
        candidateName: "Parsed Name",
        email: "parsed@example.com",
        phone: "555-555-5555",
        skills: ["Parsed Skill 1", "Parsed Skill 2"],
        experience: "Parsed experience",
        education: "Parsed education",
        resumeText: "Parsed resume text...",
      };
      setNewResume(parsedResult);
    }
  };

  return (
    <div className="flex flex-col">
      <PageTitle title="Resume Parsing" />
      <div className="pt-10 p-6 border-[.8px] rounded-xl">
        <div className="flex flex-col w-full">
          <div className="flex gap-4 mb-8">
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              className="border p-2 rounded-md"
            />
            <button
              className="ml-2 px-2 bg-primary-1 text-white rounded-md flex items-center disabled:bg-gray-400"
              onClick={handleUpload}
              disabled={!file}
            >
              <CloudArrowDownIcon className="mr-2 w-5 h-5" /> Upload & Parse
            </button>
          </div>

          <ResumeParseForm
            editingResume={editingResume}
            newResume={newResume}
            onSubmit={handleSubmit}
            handleSkillsChange={handleSkillsChange}
          />

          <ul className="space-y-4">
            {parsedResumes.map((resume) => (
              <ResumeItem
                key={resume.id}
                resume={resume}
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

export default ResumeParsing;
