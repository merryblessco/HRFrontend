import React, { useState } from "react";
import { Card, List, Button, Modal, Upload, Form, Input, notification } from "antd";
import { UploadOutlined, EyeOutlined, DownloadOutlined, EditOutlined } from "@ant-design/icons";
import PageTitle from "../../components/ui/PageTitle";
import { documentData } from "../../data/mockData";

const { Dragger } = Upload;

const DocumentManagementPage: React.FC = () => {
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Handle viewing document details
  const handleViewClick = (document: any) => {
    setSelectedDocument(document);
    setIsViewModalVisible(true);
  };

  // Handle closing the view modal
  const handleViewModalClose = () => {
    setIsViewModalVisible(false);
    setSelectedDocument(null);
  };

  // Handle opening the edit modal
  const handleEditClick = (document: any) => {
    setSelectedDocument(document);
    setIsEditModalVisible(true);
    form.setFieldsValue(document); // Populate form with current document details
  };

  // Handle closing the edit modal
  const handleEditModalClose = () => {
    setIsEditModalVisible(false);
    setSelectedDocument(null);
    form.resetFields();
  };

  // Handle document upload
  const handleUpload = (info: any) => {
    if (info.file.status === "done") {
      notification.success({
        message: "Upload Successful",
        description: `${info.file.name} has been uploaded successfully.`,
      });
    } else if (info.file.status === "error") {
      notification.error({
        message: "Upload Failed",
        description: `${info.file.name} could not be uploaded.`,
      });
    }
  };

  // Handle document update submission
  const handleEditSubmit = (values: any) => {
    console.log("Document updated with values: ", values);
    notification.success({
      message: "Document Updated",
      description: `${values.name} has been successfully updated.`,
    });
    handleEditModalClose();
  };

  return (
    <div className="flex flex-col">
      <PageTitle title="Document Management" />
      <div className="pt-10 p-6 border-[.8px] rounded-xl">

        {/* Document Upload Section */}
        <Card title="Upload New Document" bordered={true} className="mb-4">
          <Dragger
            name="file"
            multiple={false}
            action="/upload" // Replace with your backend API
            onChange={handleUpload}
          >
            <p className="ant-upload-drag-icon">
              <UploadOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Upload documents such as certificates, contracts, or HR forms.</p>
          </Dragger>
        </Card>

        {/* Document List Section */}
        <Card title="Your Documents" bordered={true} className="mb-4">
          <List
            itemLayout="horizontal"
            dataSource={documentData}
            renderItem={(document) => (
              <List.Item
                actions={[
                  <Button type="link" icon={<EyeOutlined />} onClick={() => handleViewClick(document)}>
                    View
                  </Button>,
                  <Button type="link" icon={<DownloadOutlined />}>
                    Download
                  </Button>,
                  <Button type="link" icon={<EditOutlined />} onClick={() => handleEditClick(document)}>
                    Edit
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={document.name}
                  description={`Uploaded on: ${document.uploadDate}`}
                />
              </List.Item>
            )}
          />
        </Card>

        {/* View Document Modal */}
        <Modal
          title={`Document Details - ${selectedDocument?.name}`}
          visible={isViewModalVisible}
          onCancel={handleViewModalClose}
          footer={[
            <Button key="close" onClick={handleViewModalClose}>
              Close
            </Button>,
          ]}
        >
          {selectedDocument && (
            <div>
              <p><strong>Document Name:</strong> {selectedDocument.name}</p>
              <p><strong>Type:</strong> {selectedDocument.type}</p>
              <p><strong>Uploaded On:</strong> {selectedDocument.uploadDate}</p>
              <p><strong>Description:</strong> {selectedDocument.description}</p>
            </div>
          )}
        </Modal>

        {/* Edit Document Modal */}
        <Modal
          title={`Edit Document - ${selectedDocument?.name}`}
          visible={isEditModalVisible}
          onCancel={handleEditModalClose}
          footer={[
            <Button key="cancel" onClick={handleEditModalClose}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={() => form.submit()}>
              Save Changes
            </Button>,
          ]}
        >
          <Form form={form} layout="vertical" onFinish={handleEditSubmit}>
            <Form.Item label="Document Name" name="name" rules={[{ required: true, message: 'Please input the document name!' }]}>
              <Input />
            </Form.Item>

            <Form.Item label="Description" name="description">
              <Input.TextArea rows={4} />
            </Form.Item>

            {/* Re-upload Document */}
            <Form.Item label="Upload New Version">
              <Dragger
                name="file"
                multiple={false}
                action="/upload" // Replace with your backend API for file uploads
                onChange={handleUpload}
              >
                <p className="ant-upload-drag-icon">
                  <UploadOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload a new version</p>
              </Dragger>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default DocumentManagementPage;
