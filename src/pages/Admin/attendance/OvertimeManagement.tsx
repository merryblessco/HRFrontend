import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Badge, Table } from "antd";
import { FaClock, FaCheck, FaTimes } from "react-icons/fa";
import InputField from "../../../components/ui/InputField";
import TextAreaField from "../../../components/ui/TextAreaField";
import { Button } from "../../../components/ui/Button";
import PageTitle from "../../../components/ui/PageTitle";
import { ClockIcon } from "@heroicons/react/24/outline";

interface OvertimeRequest {
  id: number;
  employeeId: string;
  employeeName: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
}

const validationSchema = Yup.object({
  employeeId: Yup.string().required("Employee ID is required"),
  employeeName: Yup.string().required("Employee Name is required"),
  date: Yup.date().required("Date is required"),
  startTime: Yup.string().required("Start time is required"),
  endTime: Yup.string().required("End time is required"),
  reason: Yup.string().required("Reason is required"),
});

const OvertimeManagement: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [overtimeRequests, setOvertimeRequests] = useState<OvertimeRequest[]>(
    []
  );
  const [showModal, setShowModal] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<OvertimeRequest | null>(
    null
  );

  useEffect(() => {
    const savedRequests = localStorage.getItem("overtimeRequests");
    if (savedRequests) {
      setOvertimeRequests(JSON.parse(savedRequests));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("overtimeRequests", JSON.stringify(overtimeRequests));
  }, [overtimeRequests]);

  const formik = useFormik({
    initialValues: {
      employeeId: currentRequest?.employeeId || "",
      employeeName: currentRequest?.employeeName || "",
      date: currentRequest?.date || "",
      startTime: currentRequest?.startTime || "",
      endTime: currentRequest?.endTime || "",
      reason: currentRequest?.reason || "",
    },
    validationSchema,
    onSubmit: (values) => {
      const newRequest: OvertimeRequest = {
        id: currentRequest?.id || Date.now(),
        ...values,
        duration: calculateDuration(values.startTime, values.endTime),
        status: currentRequest?.status || "Pending",
      };

      if (currentRequest) {
        setOvertimeRequests(
          overtimeRequests.map((request) =>
            request.id === currentRequest.id ? newRequest : request
          )
        );
      } else {
        setOvertimeRequests([...overtimeRequests, newRequest]);
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
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: "Duration",
      key: "duration",
      render: (_: any, record: OvertimeRequest) =>
        `${formatDuration(record.duration)}`,
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
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
      render: (_: any, record: OvertimeRequest) => (
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

  const handleShowModal = (request: OvertimeRequest | null) => {
    setCurrentRequest(request);
    setShowModal(true);
  };

  const handleApproveReject = (id: number, status: "Approved" | "Rejected") => {
    setOvertimeRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status } : request
      )
    );
  };

  const calculateDuration = (startTime: string, endTime: string): number => {
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
    return (end.getTime() - start.getTime()) / 60000; // Duration in minutes
  };

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="flex flex-col">
      <PageTitle title="Overtime Management" />

      <div className="pt-10 p-6 border-[.8px] rounded-xl">
        <div className="flex flex-col w-full">
          <div className="w-[150px] h-[38px] mb-2">
            <Button
              onClick={() => handleShowModal(null)}
              mode={"solid"}
              buttonText={"Log Overtime"}
              loading={isLoading}
              imageIcon={<ClockIcon className="w-5 h-5" />}
              defaultColor="primary-1"
              hoverColor="primary-2"
            />
          </div>

          <Table columns={columns} dataSource={overtimeRequests} rowKey="id" />

          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
              <div className="bg-white p-8 rounded-lg w-full max-w-lg">
                <h2 className="text-xl font-bold mb-4">
                  {currentRequest ? "View Overtime Request" : "Log Overtime"}
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
                  <InputField
                    label="Date"
                    id="date"
                    name="date"
                    type="date"
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    error={formik.errors.date}
                  />
                  <InputField
                    label="Start Time"
                    id="startTime"
                    name="startTime"
                    type="time"
                    value={formik.values.startTime}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    error={formik.errors.startTime}
                  />
                  <InputField
                    label="End Time"
                    id="endTime"
                    name="endTime"
                    type="time"
                    value={formik.values.endTime}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    error={formik.errors.endTime}
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

export default OvertimeManagement;
