import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import InputField from "../../components/ui/InputField";
import TextAreaField from "../../components/ui/TextAreaField";
import PasswordChangeModal from "../../components/modals/PasswordChangeModal";
import FileInput from "../../components/ui/FileInput";
import axiosInstance from "../../lib/axiosInterceptor";
import { message } from "antd";
import { clearSession, getSession } from "../../utils/sessionManager";
import { useNavigate } from "react-router-dom";
import { ErrorResponse } from "../../types/auth";
import Stepper from "../../components/ui/Stepper";

// Mock API Endpoints
const ONBOARD_API = "/onboarding/onboard";
const PASSWORD_CHANGE_API = "/auth/change-password";

const OnboardingPage = () => {
    const navigate = useNavigate();
    const user = getSession();

    const [currentStep, setCurrentStep] = useState(1);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isFormSubmitting, setIsFormSubmitting] = useState(false);

    // Check session for PasswordChangedStatus
    useEffect(() => {
        if (!user.passwordChangedStatus) {
            setIsPasswordModalOpen(true);
        }
    }, []);

    // Formik setup for onboarding form
    const formik = useFormik({
        initialValues: {
            bio: "",
            stateOfOrigin: "",
            lga: "",
            nationality: "",
            nextOfKin: {
                fullName: "",
                relationship: "",
                phoneNumber: ""
            },
            guarantors: [
                { fullName: "", relationship: "", phoneNumber: "", passportFile: null },
                { fullName: "", relationship: "", phoneNumber: "", passportFile: null },
            ],
        },
        validationSchema: Yup.object({
            bio: Yup.string().max(300, "Bio can't be longer than 300 characters"),
            stateOfOrigin: Yup.string().required("State of origin is required"),
            lga: Yup.string().required("LGA is required"),
            nationality: Yup.string().required("Nationality is required"),
            nextOfKin: Yup.object({
                fullName: Yup.string().required("Next of Kin full name is required"),
                relationship: Yup.string().required("Relationship is required"),
                phoneNumber: Yup.string().required("Phone number is required"),
            }),
            guarantors: Yup.array().of(
                Yup.object({
                    fullName: Yup.string().required("Guarantor name is required"),
                    relationship: Yup.string().required("Relationship is required"),
                    phoneNumber: Yup.string().required("Phone number is required"),
                    passportFile: Yup.mixed().nullable(),
                })
            ),
        }),
        onSubmit: (values) => {
            axiosInstance.post(ONBOARD_API, values).then(() => {
                alert("Onboarding Complete!");
            });
        },
    });

    const handlePasswordChange = (oldPassword: string, newPassword: string) => {
        setIsFormSubmitting(true);
        axiosInstance.post(PASSWORD_CHANGE_API, { oldPassword, newPassword }).then(async () => {
            message.success("Password changed successfully. Logging out...");

            clearSession();

            await new Promise((resolve) => setTimeout(resolve, 2000))

            setIsFormSubmitting(false);

            setIsPasswordModalOpen(false);

            navigate("/auth/login", { replace: true });
        }).catch((error: any) => {
            setIsFormSubmitting(false);
            error.response.data.map((err: ErrorResponse) => message.warning(err.description))
        })
    };

    return (
        <div className="flex items-center justify-center sm:pt-24 sm:pb-32 px- border-[.8px] rounded-xl">
            <div className="w-full max-w-4xl p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl mb-4 text-dark-1 text-center font-semibold">Employee Onboarding</h2>

                {/* Interactive Stepper */}
                <Stepper
                    steps={[
                        { label: "Personal Information" },
                        { label: "Bio & Details" },
                        { label: "Guarantors & Documents" }
                    ]}
                    currentStep={currentStep}
                />

                <form onSubmit={formik.handleSubmit}>
                    {currentStep === 1 && (
                        <div>
                            <InputField
                                label="State of Origin"
                                name="stateOfOrigin"
                                id="stateOfOrigin"
                                value={formik.values.stateOfOrigin}
                                onChange={formik.handleChange}
                                error={formik.errors.stateOfOrigin}
                            />
                            <InputField
                                label="LGA"
                                name="lga"
                                id="lga"
                                value={formik.values.lga}
                                onChange={formik.handleChange}
                                error={formik.errors.lga}
                            />
                            <InputField
                                label="Nationality"
                                name="nationality"
                                id="nationality"
                                value={formik.values.nationality}
                                onChange={formik.handleChange}
                                error={formik.errors.nationality}
                            />
                        </div>
                    )}
                    {currentStep === 2 && (
                        <div>
                            <TextAreaField
                                label="Short Bio"
                                name="bio"
                                id="bio"
                                value={formik.values.bio}
                                onChange={formik.handleChange}
                                error={formik.errors.bio}
                            />
                            <InputField
                                label="Next of Kin Full Name"
                                name="nextOfKin.fullName"
                                id="nextOfKinFullName"
                                value={formik.values.nextOfKin.fullName}
                                onChange={formik.handleChange}
                                error={formik.errors.nextOfKin?.fullName}
                            />
                            <InputField
                                label="Relationship"
                                name="nextOfKin.relationship"
                                id="nextOfKinRelationship"
                                value={formik.values.nextOfKin.relationship}
                                onChange={formik.handleChange}
                                error={formik.errors.nextOfKin?.relationship}
                            />
                            <InputField
                                label="Phone Number"
                                name="nextOfKin.phoneNumber"
                                id="nextOfKinPhoneNumber"
                                value={formik.values.nextOfKin.phoneNumber}
                                onChange={formik.handleChange}
                                error={formik.errors.nextOfKin?.phoneNumber}
                            />
                        </div>
                    )}
                    {currentStep === 3 && (
                        <div>
                            {formik.values.guarantors.map((guarantor, index) => (
                                <div key={index}>
                                    <InputField
                                        label={`Guarantor ${index + 1} Full Name`}
                                        name={`guarantors[${index}].fullName`}
                                        id={`guarantorFullName${index}`}
                                        value={guarantor.fullName}
                                        onChange={formik.handleChange}
                                        error={
                                            Array.isArray(formik.errors.guarantors) &&
                                            formik.errors.guarantors[index]?.fullName
                                        }
                                    />
                                    <InputField
                                        label={`Guarantor ${index + 1} Relationship`}
                                        name={`guarantors[${index}].relationship`}
                                        id={`guarantorRelationship${index}`}
                                        value={guarantor.relationship}
                                        onChange={formik.handleChange}
                                        error={
                                            Array.isArray(formik.errors.guarantors) &&
                                            formik.errors.guarantors[index]?.relationship
                                        }
                                    />
                                    <InputField
                                        label={`Guarantor ${index + 1} Phone Number`}
                                        name={`guarantors[${index}].phoneNumber`}
                                        id={`guarantorPhoneNumber${index}`}
                                        value={guarantor.phoneNumber}
                                        onChange={formik.handleChange}
                                        error={
                                            Array.isArray(formik.errors.guarantors) &&
                                            formik.errors.guarantors[index]?.phoneNumber
                                        }
                                    />
                                    <FileInput
                                        id={`guarantorPhoneNumber${index}`}
                                        label={`Upload Passport for Guarantor ${index + 1}`}
                                        onChange={(event: any) => {
                                            formik.setFieldValue(`guarantors[${index}].passportFile`, event.currentTarget.files[0]);
                                        }}
                                        accept=".pdf,.doc,.docx,.jpg,.png"
                                        error={
                                            Array.isArray(formik.errors.guarantors) &&
                                            formik.errors.guarantors[index]?.passportFile
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex justify-between mt-6">
                        <button
                            type="button"
                            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
                            disabled={currentStep === 1}
                            className="text-[#36A2EB] font-medium"
                        >
                            Previous
                        </button>
                        <button
                            type="button"
                            onClick={() => setCurrentStep((prev) => Math.min(prev + 1, 3))}
                            disabled={currentStep === 3}
                            className="text-[#36A2EB] font-medium"
                        >
                            Next
                        </button>
                    </div>

                    {currentStep === 3 && (
                        <button
                            type="submit"
                            className="mt-6 bg-[#36A2EB] text-white py-2 px-4 rounded-lg w-full"
                        >
                            Complete Onboarding
                        </button>
                    )}
                </form>

                {/* Password Change Modal */}
                {isPasswordModalOpen && (
                    <PasswordChangeModal
                        isOpen={isPasswordModalOpen}
                        onSubmit={handlePasswordChange}
                        isFormSubmitting={isFormSubmitting} />
                )}
            </div>
        </div>
    );
};

export default OnboardingPage;
