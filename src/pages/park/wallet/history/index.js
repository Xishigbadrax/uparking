import WalletLayout from "@components/layouts/WalletLayout";
import React, { useState } from "react";
import { Table, Image } from "antd";

const Header = {
  color: "#35446D",
  fontWeight: "bold",
};

const columns = [
  {
    title: "",
    dataIndex: "Sign",
  },
  {
    title: <p style={Header}>Өдөр</p>,
    dataIndex: "Day",
  },
  {
    title: <p style={Header}>Утга</p>,
    dataIndex: "Value",
  },
  {
    title: <p style={Header}>Мөнгөн дүн</p>,
    dataIndex: "Balance",
  },
  {
    title: <p style={Header}>Харилцах данс</p>,
    dataIndex: "BankAccount",
  },
];

const Out = {
  color: "#C6231A",
};
const In = {
  color: "#76E8AA",
};

const data = [
  {
    key: "1",
    Sign: <Image src="../../images/icon/out.png" />,
    Day: "2020/10/01 19:38",
    Value: "G200012002150001",
    Balance: <p style={In}>+ 44,000₮</p>,
    BankAccount: "RE93081531",
  },
  {
    key: "1",
    Sign: <Image src="../../images/icon/in.png" />,
    Day: "2020/10/01 19:38",
    Value: "Dans tseneglev",
    Balance: <p style={Out}>- 44,000₮</p>,
    BankAccount: "Хаан банк - 5890741935",
  },
  {
    key: "1",
    Sign: <Image src="../../images/icon/out.png" />,
    Day: "2020/10/01 19:38",
    Value: "G200012002150001",
    Balance: <p style={Out}>- 44,000₮</p>,
    BankAccount: "RE93081531",
  },
  {
    key: "1",
    Sign: <Image src="../../images/icon/in.png" />,
    Day: "2020/10/01 19:38",
    Value: "Dans tseneglev",
    Balance: <p style={In}>+ 44,000₮</p>,
    BankAccount: "RE93081531",
  },

  ///////////////////////

  {
    key: "1",
    Sign: <Image src="../../images/icon/out.png" />,
    Day: "2020/10/01 19:38",
    Value: "G200012002150001",
    Balance: <p style={Out}>- 44,000₮</p>,
    BankAccount: "RE93081531",
  },
  {
    key: "1",
    Sign: <Image src="../../images/icon/in.png" />,
    Day: "2020/10/01 19:38",
    Value: "Dans tseneglev",
    Balance: <p style={In}>+ 44,000₮</p>,
    BankAccount: "RE93081531",
  },
  {
    key: "1",
    Sign: <Image src="../../images/icon/out.png" />,
    Day: "2020/10/01 19:38",
    Value: "G200012002150001",
    Balance: <p style={Out}>- 44,000₮</p>,
    BankAccount: "RE93081531",
  },
  {
    key: "1",
    Sign: <Image src="../../images/icon/in.png" />,
    Day: "2020/10/01 19:38",
    Value: "Dans tseneglev",
    Balance: <p style={In}>+ 44,000₮</p>,
    BankAccount: "RE93081531",
  },
  {
    key: "1",
    Sign: <Image src="../../images/icon/out.png" />,
    Day: "2020/10/01 19:38",
    Value: "G200012002150001",
    Balance: <p style={Out}>- 44,000₮</p>,
    BankAccount: "RE93081531",
  },
  {
    key: "1",
    Sign: <Image src="../../images/icon/in.png" />,
    Day: "2020/10/01 19:38",
    Value: "Dans tseneglev",
    Balance: <p style={In}>+ 44,000₮</p>,
    BankAccount: "RE93081531",
  },
  {
    key: "1",
    Sign: <Image src="../../images/icon/out.png" />,
    Day: "2020/10/01 19:38",
    Value: "G200012002150001",
    Balance: <p style={Out}>- 44,000₮</p>,
    BankAccount: "RE93081531",
  },
  {
    key: "1",
    Sign: <Image src="../../images/icon/in.png" />,
    Day: "2020/10/01 19:38",
    Value: "Dans tseneglev",
    Balance: <p style={In}>+ 44,000₮</p>,
    BankAccount: "RE93081531",
  },
  {
    key: "1",
    Sign: <Image src="../../images/icon/out.png" />,
    Day: "2020/10/01 19:38",
    Value: "G200012002150001",
    Balance: <p style={Out}>- 44,000₮</p>,
    BankAccount: "RE93081531",
  },
  {
    key: "1",
    Sign: <Image src="../../images/icon/in.png" />,
    Day: "2020/10/01 19:38",
    Value: "Dans tseneglev",
    Balance: <p style={In}>+ 44,000₮</p>,
    BankAccount: "RE93081531",
  },
];

const Summary = () => {
  return (
    <WalletLayout>
      {" "}
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </WalletLayout>
  );
};

export default Summary;
