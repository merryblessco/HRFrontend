import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Switch } from "antd";

interface Props {
  color?: string;
  size?: number;
}

const AppSpinner: React.FC<Props> = ({ color, size }) => {
  const rSize = size ? size : 24;
  const rColor = color ? color : `white`;

  return (
    <Spin
      indicator={
        <LoadingOutlined style={{ fontSize: rSize, color: rColor }} spin />
      }
    />
  );
};

export default AppSpinner;
