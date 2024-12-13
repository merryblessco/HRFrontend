import React, { useState, useEffect } from "react";
import { Table, Modal, Form, Input, Select, DatePicker } from "antd";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import * as Yup from "yup";
import type { TableColumnsType } from "antd";
import { Button } from "../../../components/ui/Button";
import PageTitle from "../../../components/ui/PageTitle";

interface SalaryRecord {
  id: number;
  employeeId: string;
  employeeName: string;
  baseSalary: number;
  effectiveDate: string;
  adjustmentType: string;
  adjustmentAmount: number;
  reason: string;
}

const SalaryCalculations: React.FC = () => {
  const [salaryRecords, setSalaryRecords] = useState<SalaryRecord[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<SalaryRecord | null>(null);

  useEffect(() => {
    const savedRecords = localStorage.getItem("salaryRecords");
    if (savedRecords) {
      setSalaryRecords(JSON.parse(savedRecords));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("salaryRecords", JSON.stringify(salaryRecords));
  }, [salaryRecords]);

  const handleShowModal = (record: SalaryRecord | null) => {
    setCurrentRecord(record);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentRecord(null);
  };

  const formik = useFormik({
    initialValues: {
      employeeId: currentRecord?.employeeId || "",
      employeeName: currentRecord?.employeeName || "",
      baseSalary: currentRecord?.baseSalary || 0,
      effectiveDate: currentRecord?.effectiveDate || "",
      adjustmentType: currentRecord?.adjustmentType || "Initial",
      adjustmentAmount: currentRecord?.adjustmentAmount || 0,
      reason: currentRecord?.reason || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      employeeId: Yup.string().required("Employee ID is required"),
      employeeName: Yup.string().required("Employee Name is required"),
      baseSalary: Yup.number()
        .required("Base Salary is required")
        .min(0, "Must be positive"),
      effectiveDate: Yup.string(),
      adjustmentType: Yup.string().required("Adjustment Type is required"),
      adjustmentAmount: Yup.number()
        .required("Adjustment Amount is required")
        .min(0, "Must be positive"),
      reason: Yup.string().required("Reason is required"),
    }),
    onSubmit: (values) => {
      const newRecord: SalaryRecord = {
        id: currentRecord?.id || Date.now(),
        ...values,
      };

      if (currentRecord) {
        setSalaryRecords((prevRecords) =>
          prevRecords.map((record) =>
            record.id === currentRecord.id ? newRecord : record
          )
        );
      } else {
        setSalaryRecords((prevRecords) => [...prevRecords, newRecord]);
      }
      handleCloseModal();
    },
  });

  const handleDeleteRecord = (id: number) => {
    setSalaryRecords((prevRecords) =>
      prevRecords.filter((record) => record.id !== id)
    );
  };

  const columns: TableColumnsType<SalaryRecord> = [
    {
      title: "Employee ID",
      dataIndex: "employeeId",
      width: "20%",
    },
    {
      title: "Employee Name",
      dataIndex: "employeeName",
      width: "20%",
    },
    {
      title: "Current Salary",
      dataIndex: "baseSalary",
      width: "15%",
      render: (text) => `$${text.toFixed(2)}`,
    },
    {
      title: "Last Adjustment Date",
      dataIndex: "effectiveDate",
      width: "15%",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      width: "15%",
      render: (_, record) => (
        <div className="flex space-x-2">
          <button
            className="text-primary-1 py-1 px-2 rounded"
            onClick={() => handleShowModal(record)}
          >
            <PencilSquareIcon className="w-4 h-4" />
          </button>
          <button
            className="text-red-500 py-1 px-2 rounded"
            onClick={() => handleDeleteRecord(record.id)}
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col">
      <PageTitle title="Salary Calculations" />

      <div className="pt-10 p-6 border-[.8px] rounded-xl">
        <div className="flex flex-col w-full">
          <div className="w-[150px] h-[38px] mb-4">
            <Button
              onClick={() => handleShowModal(null)}
              mode={"solid"}
              buttonText="Add Salary Record"
              defaultColor="primary-1"
              hoverColor="primary-2"
            />
          </div>

          <Table
            columns={columns}
            dataSource={salaryRecords}
            rowKey="id"
            scroll={{ x: 500 }}
            className="bg-white shadow-md rounded-lg"
          />

          <Modal
            title={currentRecord ? "Adjust Salary" : "Add New Salary Record"}
            visible={showModal}
            onCancel={handleCloseModal}
            footer={null}
          >
            <Form layout="vertical" onFinish={formik.handleSubmit}>
              <Form.Item
                label="Employee ID"
                validateStatus={formik.errors.employeeId ? "error" : ""}
                help={formik.errors.employeeId}
              >
                <Input
                  name="employeeId"
                  value={formik.values.employeeId}
                  onChange={formik.handleChange}
                  readOnly={!!currentRecord}
                />
              </Form.Item>

              <Form.Item
                label="Employee Name"
                validateStatus={formik.errors.employeeName ? "error" : ""}
                help={formik.errors.employeeName}
              >
                <Input
                  name="employeeName"
                  value={formik.values.employeeName}
                  onChange={formik.handleChange}
                />
              </Form.Item>

              <Form.Item
                label="Base Salary"
                validateStatus={formik.errors.baseSalary ? "error" : ""}
                help={formik.errors.baseSalary}
              >
                <Input
                  name="baseSalary"
                  type="number"
                  value={formik.values.baseSalary}
                  onChange={formik.handleChange}
                />
              </Form.Item>

              <Form.Item
                label="Effective Date"
                validateStatus={formik.errors.effectiveDate ? "error" : ""}
                help={formik.errors.effectiveDate}
              >
                <DatePicker
                  name="effectiveDate"
                  onChange={(date, dateString) =>
                    formik.setFieldValue("effectiveDate", dateString)
                  }
                  value={
                    formik.values.effectiveDate
                      ? formik.values.effectiveDate
                      : null
                  }
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item
                label="Adjustment Type"
                validateStatus={formik.errors.adjustmentType ? "error" : ""}
                help={formik.errors.adjustmentType}
              >
                <Select
                  value={formik.values.adjustmentType}
                  onChange={(value) =>
                    formik.setFieldValue("adjustmentType", value)
                  }
                  options={[
                    { value: "Initial", label: "Initial" },
                    { value: "Increment", label: "Increment" },
                    { value: "Decrement", label: "Decrement" },
                    { value: "Bonus", label: "Bonus" },
                  ]}
                />
              </Form.Item>

              <Form.Item
                label="Adjustment Amount"
                validateStatus={formik.errors.adjustmentAmount ? "error" : ""}
                help={formik.errors.adjustmentAmount}
              >
                <Input
                  name="adjustmentAmount"
                  type="number"
                  value={formik.values.adjustmentAmount}
                  onChange={formik.handleChange}
                />
              </Form.Item>

              <Form.Item
                label="Reason"
                validateStatus={formik.errors.reason ? "error" : ""}
                help={formik.errors.reason}
              >
                <Input.TextArea
                  name="reason"
                  rows={3}
                  value={formik.values.reason}
                  onChange={formik.handleChange}
                />
              </Form.Item>

              <div className="w-[150px] h-[38px]">
                <Button
                  onClick={() => handleShowModal(null)}
                  mode={"solid"}
                  buttonText="Save"
                  defaultColor="primary-1"
                  hoverColor="primary-2"
                />
              </div>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default SalaryCalculations;
