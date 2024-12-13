import React from "react";
import PageTitle from "../../../components/ui/PageTitle";
import JobHistoryForm from "../../../components/forms/JobHistoryForm";

const AddJobHistory: React.FC = () => {
  return (
    <div className="flex flex-col">
      <PageTitle title="Add Job History" />

      <div className="pt-10 p-6 border-[.8px] rounded-xl">
        <div className="flex w-full">
          <JobHistoryForm />
        </div>
      </div>
    </div>
  );
};

export default AddJobHistory;
