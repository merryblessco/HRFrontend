import React, { useState } from "react";
import { Card, List, Button, Modal, Tag } from "antd";
import { CalendarOutlined, DollarOutlined } from "@ant-design/icons";
import PageTitle from "../../components/ui/PageTitle";
import { payslipsData } from "../../data/mockData";

const PayslipPage: React.FC = () => {
  const [selectedPayslip, setSelectedPayslip] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to handle when a payslip is clicked
  const handlePayslipClick = (payslip: any) => {
    setSelectedPayslip(payslip);
    setIsModalVisible(true);
  };

  // Function to close the modal
  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedPayslip(null);
  };

  return (
    <div className="flex flex-col">
      <PageTitle title="Payslip History" />
      <div className="pt-10 p-6 border-[.8px] rounded-xl">
        {/* Payslip List */}
        <Card title="Available Payslips" bordered={true} className="mb-4">
          <List
            itemLayout="horizontal"
            dataSource={payslipsData}
            renderItem={(payslip) => (
              <List.Item
                actions={[
                  <Button type="primary" onClick={() => handlePayslipClick(payslip)}>
                    View Details
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={<CalendarOutlined />}
                  title={`Payslip for ${payslip.month} ${payslip.year}`}
                  description={`Net Salary: $${payslip.netSalary}`}
                />
              </List.Item>
            )}
          />
        </Card>

        {/* Modal for Payslip Details */}
        <Modal
          title={`Payslip for ${selectedPayslip?.month} ${selectedPayslip?.year}`}
          visible={isModalVisible}
          onCancel={handleModalClose}
          footer={[
            <Button key="close" onClick={handleModalClose}>
              Close
            </Button>,
          ]}
        >
          {selectedPayslip && (
            <div>
              <p>
                <strong>Gross Salary:</strong> ${selectedPayslip.grossSalary}
              </p>
              <p>
                <strong>Deductions:</strong> ${selectedPayslip.deductions}
              </p>
              <p>
                <strong>Net Salary:</strong> ${selectedPayslip.netSalary}
              </p>
              <p>
                <strong>Paid On:</strong> {selectedPayslip.paidOn}
              </p>
              <p>
                <strong>Bank Account:</strong> {selectedPayslip.bankAccount}
              </p>
              <p>
                <strong>Payment Method:</strong> {selectedPayslip.paymentMethod}
              </p>

              {/* Additional Information */}
              {selectedPayslip.bonus && (
                <p>
                  <strong>Bonus:</strong> ${selectedPayslip.bonus}
                </p>
              )}

              {selectedPayslip.tax && (
                <p>
                  <strong>Tax:</strong> ${selectedPayslip.tax}
                </p>
              )}
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default PayslipPage;
