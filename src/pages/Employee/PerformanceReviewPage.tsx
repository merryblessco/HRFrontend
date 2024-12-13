import React, { useState } from "react";
import { Card, List, Button, Modal, Tag, Progress } from "antd";
import PageTitle from "../../components/ui/PageTitle";
import { performanceReviewsData } from "../../data/mockData";

const PerformanceReviewPage: React.FC = () => {
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to handle when a performance review is clicked
  const handleReviewClick = (review: any) => {
    setSelectedReview(review);
    setIsModalVisible(true);
  };

  // Function to close the modal
  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedReview(null);
  };

  return (
    <div className="flex flex-col">
      <PageTitle title="Performance Reviews" />
      <div className="pt-10 p-6 border-[.8px] rounded-xl">
        {/* Performance Review List */}
        <Card title="Your Performance Reviews" bordered={true} className="mb-4">
          <List
            itemLayout="horizontal"
            dataSource={performanceReviewsData}
            renderItem={(review) => (
              <List.Item
                actions={[
                  <Button type="primary" onClick={() => handleReviewClick(review)}>
                    View Details
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={`${review.reviewPeriod} - Rating: ${review.rating}`}
                  description={`Review Date: ${review.reviewDate}`}
                />
                <Tag color={review.rating >= 80 ? "green" : "red"}>
                  {review.rating >= 80 ? "Excellent" : "Needs Improvement"}
                </Tag>
              </List.Item>
            )}
          />
        </Card>

        {/* Modal for Performance Review Details */}
        <Modal
          title={`Performance Review Details - ${selectedReview?.reviewPeriod}`}
          visible={isModalVisible}
          onCancel={handleModalClose}
          footer={[
            <Button key="close" onClick={handleModalClose}>
              Close
            </Button>,
          ]}
        >
          {selectedReview && (
            <div>
              <p><strong>Review Period:</strong> {selectedReview.reviewPeriod}</p>
              <p><strong>Review Date:</strong> {selectedReview.reviewDate}</p>
              <p><strong>Rating:</strong> {selectedReview.rating}</p>
              <Progress percent={selectedReview.rating} />

              {/* Manager Feedback */}
              <div className="mt-4">
                <p><strong>Manager Feedback:</strong></p>
                <p>{selectedReview.managerFeedback}</p>
              </div>

              {/* Peer Feedback (if available) */}
              {selectedReview.peerFeedback && (
                <div className="mt-4">
                  <p><strong>Peer Feedback:</strong></p>
                  <p>{selectedReview.peerFeedback}</p>
                </div>
              )}

              {/* Goals Achieved */}
              <div className="mt-4">
                <p><strong>Goals Achieved:</strong></p>
                <ul>
                  {selectedReview.goalsAchieved.map((goal: string, index: number) => (
                    <li key={index}>{goal}</li>
                  ))}
                </ul>
              </div>

              {/* Areas for Improvement */}
              <div className="mt-4">
                <p><strong>Areas for Improvement:</strong></p>
                <p>{selectedReview.areasForImprovement}</p>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default PerformanceReviewPage;
