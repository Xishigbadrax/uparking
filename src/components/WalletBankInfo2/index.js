import React from "react";
import { Input, Divider } from "antd";

const WalletBankInfo2 = (props) => {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{}}>
          <Input bordered={false} placeholder={props.place} />
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default WalletBankInfo2;
