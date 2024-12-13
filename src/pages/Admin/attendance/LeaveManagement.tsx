import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Badge, Table } from "antd";
import { FaCalendarPlus, FaCheck, FaTimes } from "react-icons/fa";
import { LeaveBalance, LeaveRequest } from "../../../types/attendance";
import InputField from "../../../components/ui/InputField";
import SelectField from "../../../components/ui/SelectField";
import TextAreaField from "../../../components/ui/TextAreaField";
import { Button } from "../../../components/ui/Button";
import {
  CalendarDateRangeIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import PageTitle from "../../../components/ui/PageTitle";

const validationSchema = Yup.object({
  employeeId: Yup.string().required("Employee ID is required"),
  employeeName: Yup.string().required("Employee Name is required"),
  leaveType: Yup.string().required("Leave Type is required"),
  startDate: Yup.date().required("Start date is required"),
  endDate: Yup.date().required("End date is required"),
  reason: Yup.string().required("Reason is required"),
});

const LeaveManagement: React.FC = () => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<LeaveRequest | null>(
    null
  );
  const [leaveBalance, setLeaveBalance] = useState<LeaveBalance>({
    vacation: 20,
    sickLeave: 10,
    personal: 5,
  });

  useEffect(() => {
    const savedRequests = localStorage.getItem("leaveRequests");
    if (savedRequests) {
      setLeaveRequests(JSON.parse(savedRequests));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("leaveRequests", JSON.stringify(leaveRequests));
  }, [leaveRequests]);

  const formik = useFormik({
    initialValues: {
      employeeId: currentRequest?.employeeId || "",
      employeeName: currentRequest?.employeeName || "",
      leaveType: currentRequest?.leaveType!,
      startDate: currentRequest?.startDate || "",
      endDate: currentRequest?.endDate || "",
      reason: currentRequest?.reason || "",
    },
    validationSchema,
    onSubmit: (values) => {
      const newRequest: LeaveRequest = {
        id: currentRequest?.id || Date.now(),
        ...values,
        status: currentRequest?.status || "Pending",
      };

      if (currentRequest) {
        setLeaveRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.id === currentRequest.id ? newRequest : request
          )
        );
      } else {
        setLeaveRequests([...leaveRequests, newRequest]);
      }

      setShowModal(false);
      setCurrentRequest(null);
    },
  });

  const columns = [
    {
      title: "Employee",
      dataIndex: "employeeName",
      key: "employeeName",
    },
    {
      title: "Leave Type",
      dataIndex: "leaveType",
      key: "leaveType",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Duration",
      key: "duration",
      render: (_: any, record: LeaveRequest) =>
        `${calculateLeaveDuration(record.startDate, record.endDate)} days`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Badge
          className={`${
            status === "Approved"
              ? "bg-green-500"
              : status === "Rejected"
              ? "bg-red-500"
              : "bg-yellow-500"
          } text-white px-2 py-1 rounded`}
        >
          {status}
        </Badge>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: LeaveRequest) => (
        <div className="flex space-x-2">
          <button
            className="text-primary-500 hover:underline"
            onClick={() => handleShowModal(record)}
          >
            View
          </button>
          {record.status === "Pending" && (
            <>
              <button
                className="text-green-500 hover:underline"
                onClick={() => handleApproveReject(record.id, "Approved")}
              >
                <FaCheck /> Approve
              </button>
              <button
                className="text-red-500 hover:underline"
                onClick={() => handleApproveReject(record.id, "Rejected")}
              >
                <FaTimes /> Reject
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  const handleShowModal = (request: LeaveRequest | null) => {
    setCurrentRequest(request);
    setShowModal(true);
  };

  const handleApproveReject = (id: number, status: "Approved" | "Rejected") => {
    setLeaveRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status } : request
      )
    );
  };

  const calculateLeaveDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="flex flex-col">
      <PageTitle title="Leave Management" />

      <div className="pt-10 p-6 border-[.8px] rounded-xl">
        <div className="flex flex-col w-full">
          <div className="flex gap-2 items-center bg-primary-3 text-primary-1 p-2 rounded-md mb-4">
            <InformationCircleIcon className="inline-block mr-2 w-6 h-6" />
            <p>
              <strong>Leave Balance:</strong> Vacation: {leaveBalance.vacation}{" "}
              days, Sick Leave: {leaveBalance.sickLeave} days, Personal:{" "}
              {leaveBalance.personal} days
            </p>
          </div>
          <button
            className="flex items-center bg-primary-1 text-white py-2 px-4 rounded mb-4"
            onClick={() => handleShowModal(null)}
          >
            <CalendarDateRangeIcon className="w-5 h-5 inline mr-2" /> Request
            Leave
          </button>

          <Table columns={columns} dataSource={leaveRequests} rowKey="id" />

          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
              <div className="bg-white p-8 rounded-lg w-full max-w-lg">
                <h2 className="text-xl font-bold mb-4">
                  {currentRequest ? "View Leave Request" : "Request Leave"}
                </h2>
                <form onSubmit={formik.handleSubmit}>
                  <InputField
                    label="Employee ID"
                    id="employeeId"
                    name="employeeId"
                    value={formik.values.employeeId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    error={formik.errors.employeeId}
                  />
                  <InputField
                    label="Employee Name"
                    id="employeeName"
                    name="employeeName"
                    value={formik.values.employeeName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    error={formik.errors.employeeName}
                  />
                  <SelectField
                    label="Leave Type"
                    id="leaveType"
                    name="leaveType"
                    value={formik.values.leaveType}
                    options={["Vacation", "Sick Leave", "Personal", "Other"]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    error={formik.errors.leaveType}
                  />
                  <InputField
                    label="Start Date"
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formik.values.startDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    error={formik.errors.startDate}
                  />
                  <InputField
                    label="End Date"
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={formik.values.endDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    error={formik.errors.endDate}
                  />
                  <TextAreaField
                    label="Reason"
                    id="reason"
                    name="reason"
                    value={formik.values.reason}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    error={formik.errors.reason}
                  />
                  <div className="flex w-full justify-end">
                    <div className="w-[150px] h-[38px] mr-2">
                      <Button
                        onClick={() => setShowModal(false)}
                        mode={"outline"}
                        buttonText="Cancel"
                        defaultColor="primary-1"
                        hoverColor="primary-2"
                      />
                    </div>
                    {!currentRequest && (
                      <div className="w-[150px] h-[38px]">
                        <Button
                          mode={"solid"}
                          buttonText="Submit Request"
                          defaultColor="primary-1"
                          hoverColor="primary-2"
                        />
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveManagement;
