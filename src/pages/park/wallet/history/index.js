import WalletLayout from "@components/layouts/WalletLayout";
import React, { useState, useEffect, useContext } from "react";
import { Table, Image } from "antd";
import { callGet } from "@api/api";
import Context from "@context/Context";

const Header = {
  color: "#35446D",
  fontWeight: "bold",
};

const Out = {
  color: "#C6231A",
};
const In = {
  color: "#76E8AA",
};

// const data = [
//   {
//     key: "1",
//     Sign: <Image src="../../images/icon/out.png" />,
//     Day: "2020/10/01 19:38",
//     Value: "G200012002150001",
//     Balance: <p style={In}>+ 44,000₮</p>,
//     BankAccount: "RE93081531",
//   },
//   {
//     key: "1",
//     Sign: <Image src="../../images/icon/in.png" />,
//     Day: "2020/10/01 19:38",
//     Value: "Dans tseneglev",
//     Balance: <p style={Out}>- 44,000₮</p>,
//     BankAccount: "Хаан банк - 5890741935",
//   },
//   {
//     key: "1",
//     Sign: <Image src="../../images/icon/out.png" />,
//     Day: "2020/10/01 19:38",
//     Value: "G200012002150001",
//     Balance: <p style={Out}>- 44,000₮</p>,
//     BankAccount: "RE93081531",
//   },
//   {
//     key: "1",
//     Sign: <Image src="../../images/icon/in.png" />,
//     Day: "2020/10/01 19:38",
//     Value: "Dans tseneglev",
//     Balance: <p style={In}>+ 44,000₮</p>,
//     BankAccount: "RE93081531",
//   },

//   /////////////////////
// ];

const History = () => {
  const { userdata } = useContext(Context);
  const id = userdata.id;
  const [data, setdata] = useState([]);
  const [imgSrc, setImgSrc] = useState("");
  const [symbol, setSymbol] = useState("");

  const columns = [
    {
      title: "",
      dataIndex: { imgSrc },
      render: () => <img alt="icon" src={imgSrc} />,
    },
    {
      title: <p style={Header}>Өдөр</p>,
      dataIndex: "createdDate",
    },
    {
      title: <p style={Header}>Утга</p>,
      dataIndex: "description",
    },
    {
      title: <p style={Header}>Мөнгөн дүн</p>,
      dataIndex: "outcome",
      render: (dataIndex) => symbol + dataIndex,
    },
    {
      title: <p style={Header}>Харилцах данс</p>,
      dataIndex: "walletId",
    },
  ];

  const fetchData = async () => {
    await callGet(`/wallet/user/history?userId=${id}`, null).then((res) => {
      var arr = [];

      if (typeof res.history != "undefined") {
        res.history.forEach((element) => {
          if (element["list"].length > 0) {
            element["list"].forEach((el) => {
              arr.push(el);
              if (el.outcome) {
                setImgSrc("../../images/icon/out.png");
                setSymbol("- ");
              } else {
                setImgSrc("../../images/icon/in.png");
                setSymbol("+  ");
              }
            });
          }
        });
      }

      // res.history.map((item, index) => {
      //   if (item.list.length > 0) {
      //     arr.push(item.list);
      //   }
      // });

      setdata(arr);
    });
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <WalletLayout>
      {" "}
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </WalletLayout>
  );
};

export default History;
