import React from "react";
import { Input, Divider } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

const WalletBankInfo = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [propData, setPropData] = useState("");

  useEffect(() => {
    setPropData(props.value);
  }, [props.value]);

  const onChange = (e) => {
    const { value } = e.target;
    if (props.onChangeInput) {
      props.onChangeInput(value);
    }
  };

  return (
    <div>
      <p style={{ height: 16, fontSize: 12, color: "#A2A4AA" }}>
        {props.children}
      </p>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{}}>
          {propData && propData !== "" ? (
            <Input bordered={false} value={propData} />
          ) : (
            <Input bordered={false} onChange={onChange} />
          )}
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
