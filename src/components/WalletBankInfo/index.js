import React from "react";
import { Input, Divider } from "antd";
import { CopyOutlined } from "@ant-design/icons";

const WalletBankInfo = (props) => {
  return (
    <div>
      <p style={{ height: 16, fontSize: 12, color: "#A2A4AA" }}>
        {props.children}
      </p>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{}}>
          <Input bordered={false} value={props.value} />
        </div>
        <div>
          <CopyOutlined width={"20px"} />
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default WalletBankInfo;
