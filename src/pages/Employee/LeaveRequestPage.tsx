import React, { useState } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  List,
  Modal,
  notification,
} from "antd";
import PageTitle from "../../components/ui/PageTitle";
import { employeesprofileData, leaveHistoryData } from "../../data/mockData"; // Assuming leave history data is in mockData
import moment from "moment";

const { TextArea } = Input;
const { Option } = Select;

const LeaveRequestPage: React.FC = () => {
  const [form] = Form.useForm();
  const [selectedLeave, setSelectedLeave] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to handle leave submission
  const handleSubmit = (values: any) => {
    console.log("Leave Request Submitted: ", values);

    // Notification or Alert on successful form submission
    notification.success({
      message: "Leave Request Submitted",
      description: `Your leave request for ${values.leaveType} has been submitted.`,
    });

    // Reset the form after submission
    form.resetFields();
  };

  // Function to handle viewing leave details
  const handleLeaveClick = (leave: any) => {
    setSelectedLeave(leave);
    setIsModalVisible(true);
  };

  // Close modal
  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedLeave(null);
  };

  return (
    <div className="flex flex-col">
      <PageTitle title="Leave Request & History" />
      <div className="pt-10 p-6 border-[.8px] rounded-xl">
        {/* Display Current Leave Balance */}
        <Card title="Leave Balance" bordered={true} className="mb-4">
          <p>
            <strong>Total Leave Balance:</strong>{" "}
            {employeesprofileData.leaveBalance} days
          </p>
        </Card>

        {/* Leave History Section */}
        <Card title="Leave History" bordered={true} className="mb-4">
          <List
            itemLayout="horizontal"
            dataSource={leaveHistoryData}
            renderItem={(leave) => (
              <List.Item
                actions={[
                  <Button
                    type="primary"
                    onClick={() => handleLeaveClick(leave)}
                  >
                    View Details
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={`${leave.leaveType} (${leave.status})`}
                  description={`From ${leave.startDate} to ${leave.endDate} - ${leave.reason}`}
                />
              </List.Item>
            )}
          />
        </Card>

        {/* Leave Request Form */}
        <Card title="Request Leave" bordered={true} className="mb-4">
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            {/* Leave Type */}
            <Form.Item
              label="Leave Type"
              name="leaveType"
              rules={[
                { required: true, message: "Please select your leave type" },
              ]}
            >
              <Select placeholder="Select leave type">
                <Option value="Sick Leave">Sick Leave</Option>
                <Option value="Casual Leave">Casual Leave</Option>
                <Option value="Annual Leave">Annual Leave</Option>
                <Option value="Maternity Leave">Maternity Leave</Option>
                <Option value="Paternity Leave">Paternity Leave</Option>
              </Select>
            </Form.Item>

            {/* Start Date */}
            <Form.Item
              label="Start Date"
              name="startDate"
              rules={[
                { required: true, message: "Please select the start date" },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                disabledDate={(current) =>
                  current && current < moment().endOf("day")
                }
                placeholder="Select start date"
              />
            </Form.Item>

            {/* End Date */}
            <Form.Item
              label="End Date"
              name="endDate"
              rules={[
                { required: true, message: "Please select the end date" },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                disabledDate={(current) =>
                  current && current < moment().endOf("day")
                }
                placeholder="Select end date"
              />
            </Form.Item>

            {/* Reason for Leave */}
            <Form.Item
              label="Reason for Leave"
              name="reason"
              rules={[
                {
                  required: true,
                  message: "Please provide a reason for leave",
                },
              ]}
            >
              <TextArea rows={4} placeholder="Enter the reason for leave" />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit Request
              </Button>
            </Form.Item>
          </Form>
        </Card>

        {/* Leave Details Modal */}
        <Modal
          title={`Leave Details - ${selectedLeave?.leaveType}`}
          visible={isModalVisible}
          onCancel={handleModalClose}
          footer={[
            <Button key="close" onClick={handleModalClose}>
              Close
            </Button>,
          ]}
        >
          {selectedLeave && (
            <div>
              <p>
                <strong>Leave Type:</strong> {selectedLeave.leaveType}
              </p>
              <p>
                <strong>Status:</strong> {selectedLeave.status}
              </p>
              <p>
                <strong>Start Date:</strong> {selectedLeave.startDate}
              </p>
              <p>
                <strong>End Date:</strong> {selectedLeave.endDate}
              </p>
              <p>
                <strong>Reason:</strong> {selectedLeave.reason}
              </p>
              <p>
                <strong>Applied On:</strong> {selectedLeave.appliedOn}
              </p>
              {selectedLeave.approvalDate && (
                <p>
                  <strong>Approval Date:</strong> {selectedLeave.approvalDate}
                </p>
              )}
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default LeaveRequestPage;
