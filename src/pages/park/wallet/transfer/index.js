import React from "react";
import { useState } from "react";
import WalletLayout from "@components/layouts/WalletLayout";
import WalletCard from "../../../../components/WalletCard";
import WalletChart from "@components/WalletChart";
import WalletBankInfo2 from "@components/WalletBankInfo2";

import { Tabs, Image, Button, Modal, Divider, Input, Alert } from "antd";
import { callGet, callPost } from "@api/api";
import { showMessage } from "@utils/message";
import Item from "antd/lib/list/Item";
import { contextType } from "google-map-react";
import Password from "antd/lib/input/Password";

const tabItems = [
  {
    id: 1,
    name: "Хаан банк",
    type: "KHANBANK",
    src: "../../images/icon/khanbank.png",
  },
  {
    id: 2,
    name: "Хас банк",
    type: "KHASBANK",
    src: "../../images/icon/xac.png",
  },
  {
    id: 3,
    name: "Голомт банк",
    type: "GOLOMTBANK",
    src: "../../images/icon/golomt.png",
  },
  {
    id: 4,
    name: "Худалдаа хөгжлийн банк",
    type: "TDB",
    src: "../../images/icon/tdb.png",
  },
];

function Transfer() {
  const pos = {
    display: "flex",
    justifyContent: "space-between",
  };
  const [type, settype] = useState("KHANBANK");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTransactionDesc, setIsTransactionDesc] = useState(false);
  const [messageShow, setmessageShow] = useState(false);
  const [message, setmessage] = useState("");
  const [status, setstatus] = useState("");
  const [title, settitle] = useState("");

  const { TabPane } = Tabs;
  const [modal] = Modal.useModal();
  var password = "";
  let formData = {
    amount: amount,
    currency: "mnt",
    description: description,
    toAccount: accountNumber,
    toAccountName: accountName,
    toBank: type,
    toCurrency: "mnt",
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setmessageShow(false);
  };
  const handleClickAddTransactionDesc = () => {
    setIsTransactionDesc(true);
  };
  const onChangeAccountNumber = (value) => {
    setAccountNumber(value);
  };
  const onChangeAccountName = (value) => {
    setAccountName(value);
  };
  const onChangeAmount = (value) => {
    setAmount(value);
  };

  const onChangeDescription = (value) => {
    setDescription(value);
  };

  const BankImage = (value) => {
    switch (type) {
      case "KHANBANK":
        return (
          <Image
            preview={false}
            width={32}
            src="../../images/icon/khanbank.png"
          />
        );

      case "KHASBANK":
        return (
          <Image preview={false} width={32} src="../../images/icon/xac.png" />
        );

      case "GOLOMTBANK":
        return (
          <Image
            preview={false}
            width={32}
            src="../../images/icon/golomt.png"
          />
        );

      case "TDB":
        return (
          <Image preview={false} width={32} src="../../images/icon/tdb.png" />
        );

      default:
        null;
    }
  };

  // const submit = () => {
  //   alert("daragdlaaa");
  // };
  const onchangeee = (e) => {
    password = e.target.value;
  };
  const submit = async () => {
    // setisLoading(true);

    await callGet(`/user/check/transactionpass?rawPass=${password}`, null).then(
      async (res) => {
        if (res.status == "success") {
          await callPost(`/khanbank/intertransfer`, formData).then((res2) => {
            alert("amjilttai");
            // setisLoading(false);
          });
        } else {
          setmessageShow(true);

          setmessage(res.error);
          settitle("Амжилтгүй");
          setstatus(res.status);
        }
        // setisLoading(false);
      }
    );
  };
  function Validate() {
    Modal.info({
      title: <p style={{ fontWeight: "bold" }}>Баталгаажуулах</p>,
      okText: "Баталгаажуулах",

      content: (
        <div>
          <p>Та өөрийн гүйлгээний нууц үгээ оруулна уу</p>
          <Input
            type="text"
            onChange={(e) => onchangeee(e)}
            placeholder="Гүйлгээний нууц үг"
          />
        </div>
      ),
      onOk() {
        submit();
      },
    });
    setIsModalVisible(false);
  }

  return (
    <WalletLayout>
      <Modal
        visible={messageShow}
        title="Мэдээлэл"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <Alert message={title} description={message} type={status} />
      </Modal>
      <Modal
        title="Шилжүүлэх"
        visible={isModalVisible}
        width={"327px"}
        onCancel={handleCancel}
        footer={[
          <Button onClick={Validate} block type="primary">
            Шилжүүлэх
          </Button>,
        ]}
      >
        <div
          style={{
            display: "flex",
            flexFlow: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ margin: "5px" }}>
              {BankImage()}
              {/* <Image width={32} src="../../images/icon/xac.png" /> */}
            </div>
            <div>
              <p style={{ fontWeight: "bold", fontSize: "14px" }}>
                {accountNumber}
              </p>
              <p style={{ color: "#A2A4AA", fontSize: "12px" }}>
                {accountName}
              </p>
            </div>
          </div>
          <Divider />
          <div>
            {/* <Input
              style={{ textAlign: "center", fontSize: "48px" }}
              bordered={false}
              placeholder="0₮"
            /> */}
            <div style={{ textAlign: "center", fontSize: "48px" }}>
              <WalletBankInfo2 onChangeInput={onChangeAmount} place="0₮" />
            </div>

            {!isTransactionDesc ? (
              <div
                style={{ textAlign: "center", cursor: "pointer" }}
                onClick={handleClickAddTransactionDesc}
              >
                +{" "}
                <span
                  style={{
                    color: "blue",
                    fontWeight: "bold",
                  }}
                >
                  Утга нэмэх
                </span>
              </div>
            ) : (
              <div>
                <p style={{ height: 16, fontSize: 12, color: "#A2A4AA" }}>
                  Гүйлгээний утга
                </p>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <WalletBankInfo2
                      onChangeInput={onChangeDescription}
                      place="Гүйлгээний утга"
                    />
                  </div>
                </div>
                <Divider />
              </div>
            )}
          </div>
        </div>
      </Modal>
      <div>
        <div style={pos}>
          <div>
            <WalletCard />
          </div>

          <div>
            <WalletChart />
          </div>
        </div>
        <div style={{ height: "480px", width: "327px", marginTop: 20 }}>
          <p style={{ height: 24, width: 304, fontSize: 14, color: "#A2A4AA" }}>
            Банкны данс руу
          </p>

          <div>
            <Tabs centered defaultActiveKey="1">
              {tabItems.map((tabitem) => (
                <TabPane
                  key={tabitem.type}
                  tab={
                    <span
                      onClick={() => {
                        settype(tabitem.type);
                      }}
                    >
                      <Image
                        height={30}
                        width={30}
                        preview={false}
                        src={tabitem.src}
                      />
                    </span>
                  }
                >
                  <div>
                    <WalletBankInfo2
                      onChangeInput={onChangeAccountNumber}
                      place="Дансны дугаар"
                    />
                    <WalletBankInfo2
                      onChangeInput={onChangeAccountName}
                      place="Эзэмшигчийн нэр"
                    />
                  </div>
                </TabPane>
              ))}
            </Tabs>
            <p
              style={{
                textAlign: "center",
                fontSize: 12,
                color: "#A2A4AA",
                width: 300,
              }}
            >
              Таны нийт гүйлгээний нийт дүн 20’000₮ -с дээш бол гүйлгээний
              шимтгэл <span style={{ color: "blue" }}>0₮</span>, доош бол
              гүйлгээний шимтгэл <span style={{ color: "blue" }}>100₮</span>
            </p>
            <Button
              // onClick={showModal}

              onClick={async () => {
                if (accountName && accountNumber) {
                  // navigation.navigate("TransferSent", {
                  //   accountName: accountName,
                  //   accountNumber: accountNumber,
                  //   type: type,
                  // });

                  showModal();
                } else {
                  setmessageShow(true);
                }
              }}
              style={{ marginTop: "20px" }}
              type="primary"
              block
            >
              Үргэлжлүүлэх
            </Button>
          </div>
        </div>
      </div>
    </WalletLayout>
  );
}

export default Transfer;
