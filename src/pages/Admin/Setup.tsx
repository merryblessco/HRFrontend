import { TrashIcon } from '@heroicons/react/24/outline';
import { Input, Card, Steps, Space, message, Modal } from 'antd';
import { Button as AppButton } from '../../components/ui/Button';
import { useEffect, useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSetupMutation } from '../../store/services/setupApi';
import { SetupModel } from '../../types/setup';
import { clearSession } from '../../utils/sessionManager';

const { Step } = Steps;

const SetupPage = () => {
  const [setup, { isLoading: setupLoading }] = useSetupMutation();
  const [currentStep, setCurrentStep] = useState(0);

  const formik = useFormik({
    initialValues: {
      departments: [{ name: "" }],
      taxes: [{ taxName: "", taxPercentage: 0 }],
      defaultCurrency: "", // General preferences
      workweekDays: "",    // General preferences
    },
    validationSchema: Yup.object({
      departments: Yup.array()
        .of(Yup.object().shape({
          name: Yup.string().required("Department name is required")
        }))
        .min(1, "There must be at least one department"),
    }),
    onSubmit: async (values) => {
      const payload: SetupModel = {
        departments: values.departments,
        taxes: values.taxes,
        defaultCurrency: values.defaultCurrency,
        workweekDays: values.workweekDays
      }

      try {
        await setup(payload).unwrap();
        // Display a modal with a respectful message and logout action
        Modal.success({
          title: 'Setup Complete',
          content: 'Setup is complete. You will be logged out now for security reasons. Please log in again to continue.',
          onOk: () => {
            // Log out action (you can adjust the logic according to how you're handling auth)
            clearSession();
            window.location.href = '/auth/login';
          }
        });
      } catch (error) {
        message.warning("Setup could not be completed. Please try again...");
      }
    }
  });

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleAddDepartment = () => {
    formik.setFieldValue('departments', [...formik.values.departments, { name: '' }]);
  };

  const handleRemoveDepartment = (index: number) => {
    const updatedDepartments = formik.values.departments.filter((_, i) => i !== index);
    formik.setFieldValue('departments', updatedDepartments);
  };

  const handleAddTax = () => {
    formik.setFieldValue('taxes', [...formik.values.taxes, { taxName: '', taxPercentage: 0 }]);
  };

  const handleRemoveTax = (index: number) => {
    const updatedTaxes = formik.values.taxes.filter((_, i) => i !== index);
    formik.setFieldValue('taxes', updatedTaxes);
  };

  const steps = [
    {
      title: 'Departments Setup',
      content: (
        <form layout="vertical" className="w-full" onSubmit={formik.handleSubmit}>
          {formik.values.departments.map((department, index) => (
            <Space key={index} direction="horizontal" className="w-full mb-4">
              <div className="w-full">
                <Input
                  placeholder="Enter department name"
                  value={formik.values.departments[index].name}
                  onChange={(e) => formik.setFieldValue(`departments[${index}].name`, e.target.value)}
                />
                {formik.errors.departments && formik.touched.departments && formik.errors.departments[index]?.name && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.departments[index].name}</p>
                )}
              </div>
              {formik.values.departments.length > 1 && (
                <div className="flex items-center justify-center gap-x-6">
                  <TrashIcon className="w-4 h-4 cursor-pointer text-red-500" onClick={() => handleRemoveDepartment(index)} />
                </div>
              )}
            </Space>
          ))}

          <div className="w-[220px] h-[38px] mb-4">
            <AppButton
              onClick={handleAddDepartment}
              mode={"solid"}
              buttonText="Add Another Department"
              defaultColor="primary-1"
              hoverColor="primary-2"
            />
          </div>
        </form>
      ),
    },
    {
      title: 'Tax Setup',
      content: (
        <div>
          {formik.values.taxes.map((tax, index) => (
            <Space key={index} direction="horizontal" className="w-full mb-4">
              <Input
                placeholder="Enter tax name"
                value={formik.values.taxes[index].taxName}
                onChange={(e) => formik.setFieldValue(`taxes[${index}].taxName`, e.target.value)}
              />
              <Input
                placeholder="Enter tax percentage"
                type="number"
                value={formik.values.taxes[index].taxPercentage}
                onChange={(e) => formik.setFieldValue(`taxes[${index}].taxPercentage`, e.target.value)}
              />
              {formik.values.taxes.length > 1 && (
                <TrashIcon className="w-4 h-4 cursor-pointer text-red-500" onClick={() => handleRemoveTax(index)} />
              )}
            </Space>
          ))}

          <div className="w-[220px] h-[38px] mb-4">
            <AppButton
              onClick={handleAddTax}
              mode={"solid"}
              buttonText="Add Another Tax"
              defaultColor="primary-1"
              hoverColor="primary-2"
            />
          </div>
        </div>
      ),
    },
    {
      title: 'General Preferences',
      content: (
        <form layout="vertical" className="w-full">
          <div>
            <Input
              placeholder="Enter default currency"
              value={formik.values.defaultCurrency}
              onChange={(e) => formik.setFieldValue("defaultCurrency", e.target.value)}
            />
            {formik.errors.defaultCurrency && formik.touched.defaultCurrency && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.defaultCurrency}</p>
            )}
          </div>
          <div className="mt-4">
            <Input
              placeholder="Enter workweek days (e.g., Mon-Fri)"
              value={formik.values.workweekDays}
              onChange={(e) => formik.setFieldValue("workweekDays", e.target.value)}
            />
            {formik.errors.workweekDays && formik.touched.workweekDays && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.workweekDays}</p>
            )}
          </div>
        </form>
      ),
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="pt-10 p-6 rounded-xl">
        <Card className="max-w-4xl mx-auto">
          <h1 className="text-center text-2xl font-bold mb-6 text-primary" style={{ color: "#36A2EB" }}>
            Setup
          </h1>
          <Steps current={currentStep} className="mb-6">
            {steps.map((step, index) => (
              <Step key={index} title={step.title} />
            ))}
          </Steps>

          <div className="p-6 bg-white rounded-md shadow-md">{steps[currentStep].content}</div>

          <div className="flex justify-between mt-6">
            {currentStep > 0 && (
              <div className="w-[100px] h-[38px] mb-4">
                <AppButton
                  onClick={handlePrev}
                  mode={"outline"}
                  buttonText="Previous"
                  defaultColor="primary-1"
                  hoverColor="primary-2"
                />
              </div>
            )}
            {currentStep < steps.length - 1 ? (
              <div className="w-[80px] h-[38px] mb-4">
                <AppButton
                  onClick={handleNext}
                  mode={"solid"}
                  buttonText="Next"
                  defaultColor="primary-1"
                  hoverColor="primary-2"
                />
              </div>
            ) : (
              <div className="w-[120px] h-[38px] mb-4">
                <AppButton
                  onClick={() => formik.submitForm()}
                  loading={setupLoading}
                  mode={"solid"}
                  buttonText="Finish Setup"
                  defaultColor="green-500"
                  hoverColor="primary-2"
                />
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SetupPage;
