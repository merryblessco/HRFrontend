import React from "react";
import PageTitle from "../../../components/ui/PageTitle";
import AddDocumentForm from "../../../components/forms/AddDocumentForm";

const AddDocument: React.FC = () => {
  return (
    <div className="flex flex-col">
      <PageTitle title="Add Employee Document" />

      <div className="pt-10 p-6 border-[.8px] rounded-xl">
        <div className="flex w-full">
          <AddDocumentForm />
        </div>
      </div>
    </div>
  );
};

export default AddDocument;
