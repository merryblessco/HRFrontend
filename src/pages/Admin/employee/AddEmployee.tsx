import React, { useState } from "react";
import PageTitle from "../../../components/ui/PageTitle";
import EmployeeForm from "../../../components/forms/EmployeeForm";
import BulkUploadModal from "../../../components/modals/BulkUploadModal";
import { Button } from "../../../components/ui/Button";
import { CloudArrowDownIcon, CloudArrowUpIcon } from "@heroicons/react/24/outline";

const AddEmployee: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col">
      <div className=" w-full flex justify-between items-center">
        <PageTitle title="Add New Employee" />
        {/* Bulk upload button */}
        <div className="flex gap-2 w-[280px] h-[38px] mb-6">
          <Button
            mode="solid"
            buttonText={"Bulk Upload Employees"}
            onClick={handleOpenModal}
            defaultColor="primary-1"
            hoverColor="primary-2"
            imageIcon={<CloudArrowUpIcon className="w-5 h-5" />}
          />
        </div>
      </div>

      <div className="pt-10 p-6 border-[.8px] rounded-xl">
        <div className="flex w-full">
          <EmployeeForm />
        </div>


      </div>

      {isModalOpen && (
        <BulkUploadModal isOpen={isModalOpen} handleClose={handleCloseModal} />
      )}
    </div>
  );
};

export default AddEmployee;
