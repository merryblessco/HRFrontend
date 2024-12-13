import React, { useState, useEffect } from "react";
import { JobPostingDetails as JobPostingModel } from "../../../types/onboarding";
import JobPostingTable from "../../../components/tables/JobPostingTable";
import JobPostingModal from "../../../components/modals/JobPostingModal";
import { Button } from "../../../components/ui/Button";
import PageTitle from "../../../components/ui/PageTitle";
import { AnalyzeResumeRequest } from "../../../models/api-client/ai/Ai.Interface";

const JobPosting: React.FC = () => {
  const [jobPostings, setJobPostings] = useState<JobPostingModel[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPosting, setCurrentPosting] = useState<JobPostingModel | null>(
    null
  );

  useEffect(() => {
    // Save job postings to local storage whenever it changes
    localStorage.setItem("jobPostings", JSON.stringify(jobPostings));
  }, [jobPostings]);

  const handleShowModal = (posting: JobPostingModel | null) => {
    setCurrentPosting(posting);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentPosting(null);
  };

  const handleSavePosting = (newPosting: JobPostingModel) => {

    if (currentPosting) {
      setJobPostings(
        jobPostings.map((posting) =>
          posting.id === currentPosting.id ? newPosting : posting
        )
      );
    } else {
      setJobPostings([...jobPostings, newPosting]);
    }
    handleCloseModal();
  };


  return (
    <div className="flex flex-col">
      <PageTitle title="Job Postings" />

      <div className="pt-10 p-6 border-[.8px] rounded-xl">
        <div className="flex flex-col w-full ">
          <div className="flex  w-[200px] h-[38px] mb-4">
            <Button
              onClick={() => {
                handleShowModal(null)
              }}
              mode={"solid"}
              buttonText=" Add New Job Posting"
              loading={false}
              defaultColor="primary-1"
              hoverColor="primary-2"
            />
          </div>
          <JobPostingTable />
          <JobPostingModal
            show={showModal}
            handleClose={handleCloseModal}
            currentPosting={currentPosting}
            onSave={handleSavePosting}
          />
        </div>
      </div>
    </div>
  );
};

export default JobPosting;
