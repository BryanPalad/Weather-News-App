import React from "react";
import { Spin } from "antd";
const Loading = () => {
  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        margin: "auto",
      }}
    >
      <Spin />
    </div>
  );
};

export default Loading;
