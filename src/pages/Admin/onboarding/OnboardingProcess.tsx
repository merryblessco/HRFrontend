import React, { useState, useEffect } from "react";
import { OnboardingStep } from "../../../types/onboarding";
import PageTitle from "../../../components/ui/PageTitle";
import { Button } from "../../../components/ui/Button";
import OnboardingModal from "../../../components/modals/OnboardingProcessModal";
import OnboardingStepTable from "../../../components/tables/OnboardingProcessTable";

const OnboardingProcess: React.FC = () => {
  const [steps, setSteps] = useState<OnboardingStep[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState<OnboardingStep | null>(null);

  useEffect(() => {
    const savedSteps = localStorage.getItem("onboardingSteps");
    if (savedSteps) {
      setSteps(JSON.parse(savedSteps));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("onboardingSteps", JSON.stringify(steps));
  }, [steps]);

  const handleShowModal = (step: OnboardingStep | null) => {
    setCurrentStep(step);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentStep(null);
  };

  const handleSaveStep = (step: OnboardingStep) => {
    if (currentStep) {
      setSteps(steps.map((s) => (s.id === currentStep.id ? step : s)));
    } else {
      setSteps([...steps, step]);
    }
    handleCloseModal();
  };

  const handleDeleteStep = (id: number) => {
    setSteps(steps.filter((step) => step.id !== id));
  };

  return (
    <div className="flex flex-col">
      <PageTitle title="Onboarding Process" />
      <div className="pt-10 p-6 border-[.8px] rounded-xl">
        <div className="flex flex-col w-full ">
          <div className="flex  w-[200px] h-[38px] mb-4">
            <Button
              onClick={() => handleShowModal(null)}
              mode={"solid"}
              buttonText=" Add New Application"
              loading={false}
              defaultColor="primary-1"
              hoverColor="primary-2"
            />
          </div>
          <OnboardingStepTable />
          {showModal && (
            <OnboardingModal
              show={showModal}
              handleClose={handleCloseModal}
              currentStep={currentStep}
              onSave={handleSaveStep}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingProcess;
