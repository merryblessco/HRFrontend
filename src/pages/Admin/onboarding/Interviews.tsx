import React, { useEffect, useState } from "react";
import { ApplicantInterview, JobApplication, JobApplications, JobPostingDetails } from "../../../types/onboarding";
import PageTitle from "../../../components/ui/PageTitle";
import { JobPostingDetails as FullJobPosting } from "../../../types/onboarding";
import { useAllPostedJobsMutation, useGetApplicationsByJobIdMutation, useGetApplicationsMutation, useGetInterviewsMutation } from "../../../store/services/recruitmentApi";
import JobInterviewCard from "../../../components/JobInterviewCard";
import InterviewTable from "../../../components/tables/InterviewTable";
import InterviewModal from "../../../components/modals/InterviewModal";


const Applications: React.FC = () => {
  const [jobPostings] = useState<JobPostingDetails[]>();
  const [selectedJobPosting, setSelectedJobPosting] = useState<JobPostingDetails | null>(null);
  const [interviews, setInterviews] = useState<ApplicantInterview[]>();
  const [showModal, setShowModal] = useState(false);
  const [currentInterview, setCurrentInterview] = useState<ApplicantInterview | null>(null);
  const [allPostedJobs, { isLoading: isAllPostedJobsLoading, data: allPostedJobsData }] = useAllPostedJobsMutation();
  const [jobInterviews, { isLoading: isJobInterviewsLoading, data: allJobInterviewsData }] = useGetInterviewsMutation();
  const [jobListings, setJobListings] = useState<any>();
  const [currentJobId, setCurrentJobId] = useState<number>();

  useEffect(() => {
    allPostedJobs("");
  }, [allPostedJobs]);

  useEffect(() => {
    if (allPostedJobsData) {
      // Assuming allPostedJobsData is an array of job objects
      const jobsObject = allPostedJobsData.map((singlePostedJob: JobPostingDetails) => {
        return {
          ...singlePostedJob, // Spread the existing job properties
          minSalaryRange: singlePostedJob.minSalaryRange || 0, // Update minSalary if needed
          maxSalaryRange: singlePostedJob.maxSalaryRange || 0, // Update maxSalary if needed
        };
      });
      setJobListings(jobsObject);
    }

  }, [allPostedJobsData]);

  useEffect(() => {
    console.log(selectedJobPosting);

    if (selectedJobPosting?.id) {
      jobInterviews(selectedJobPosting?.id);
    }
  }, [selectedJobPosting?.id]);

  useEffect(() => {

    if (allJobInterviewsData) {
      setInterviews(allJobInterviewsData)
    }

  }, [allJobInterviewsData]);

  const handleShowModal = (interview: ApplicantInterview | null) => {
    setCurrentInterview(interview);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentInterview(null);
  };

  const handleDeleteInterview = (id: number) => {
    setInterviews(interviews!.filter((x) => x.jobID !== id));
  };

  const handleSelectJobPosting = (jobPosting: JobPostingDetails) => {
    console.log(jobPosting);

    setSelectedJobPosting(jobPosting);
  };

  return (
    <div className="flex flex-col">
      <PageTitle title="Interview Schedules" />

      <div className="pt-10 p-6 border-[.8px] rounded-xl">
        <div className="flex flex-wrap justify-start">
          {allPostedJobsData != null && (allPostedJobsData!.map((jobPosting) => (
            <JobInterviewCard
              key={jobPosting.id}
              jobPosting={jobPosting as FullJobPosting}
              onClick={() => handleSelectJobPosting(jobPosting)}
            />
          )))}
        </div>

        {selectedJobPosting && (
          <div className="mt-8">
            <h2 className="text-2xl font-medium mb-4">
              {/* Candidates selected for {selectedJobPosting.jobTitle} */}
              Candidates selected for Interview
            </h2>

            <InterviewTable
              interviews={interviews!}
              onEdit={handleShowModal}
              onDelete={handleDeleteInterview}
            />
          </div>
        )}

        {showModal && (<InterviewModal
          show={showModal}
          handleClose={handleCloseModal}
          currentInterview={currentInterview}
        />)}
      </div>
    </div>
  );
};

export default Applications;
