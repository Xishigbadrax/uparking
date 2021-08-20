import React from "react";
import { useState } from "react";
import WalletLayout from "@components/layouts/WalletLayout";
import WalletCard from "../../../../components/WalletCard";
import WalletChart from "@components/WalletChart";
import WalletBankInfo2 from "@components/WalletBankInfo2";
import { Tabs, Image, Button, Modal, Divider, Input } from "antd";

const Transfer = () => {
  const pos = {
    display: "flex",
    justifyContent: "space-between",
  };
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isTransactionDesc, setIsTransactionDesc] = useState(false);
  const { TabPane } = Tabs;
  const [modal] = Modal.useModal();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleClickAddTransactionDesc = () => {
    setIsTransactionDesc(true);
  };

  function success() {
    Modal.success({
      title: <p style={{ color: "green", fontWeight: "bold" }}>Амжилттай</p>,
      content:
        "Таны хэтэвчнээс 40,000₮ хасагдаж, Хаан банкны 5890741980 тоот дансанд амжилттай шилжүүлэг хийгдлээ.",
      okText: "OK",
    });
    setIsModalVisible(false);
  }

  return (
    <WalletLayout>
      <Modal
        title="Шилжүүлэг"
        visible={isModalVisible}
        width={"327px"}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button onClick={success} block type="primary">
            Шилжүүлэг
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
              <Image width={32} src="../../images/icon/khanbank.png" />
            </div>
            <div>
              <p style={{ fontWeight: "bold", fontSize: "14px" }}>5890741935</p>
              <p style={{ color: "#A2A4AA", fontSize: "12px" }}>Adiyadorj</p>
            </div>
          </div>
          <Divider />
          <div>
            <Input
              style={{ textAlign: "center", fontSize: "48px" }}
              bordered={false}
              placeholder="0₮"
            />

            {!isTransactionDesc ? (
              <div
                style={{ textAlign: "center", cursor: "pointer" }}
                onClick={handleClickAddTransactionDesc}
              >
                +{" "}
                <text
                  style={{
                    color: "blue",
                    fontWeight: "bold",
                  }}
                >
                  Утга нэмэх
                </text>
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
                    <Input
                      allowClear
                      bordered={false}
                      placeholder="Гүйлгээний утга"
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
            Бусад банкны данс руу
          </p>
          <div>
            <Tabs centered defaultActiveKey="1">
              <TabPane
                tab={
                  <span>
                    <Image
                      height={30}
                      width={30}
                      preview={false}
                      src="../../images/icon/khanbank.png"
                    />
                  </span>
                }
                key="1"
              >
                <div>
                  <WalletBankInfo2 place="Дансны дугаар" />
                  <WalletBankInfo2 place="Эзэмшигчийн нэр" />
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: 12,
                      color: "#A2A4AA",
                      width: 300,
                    }}
                  >
                    Таны нийт гүйлгээний нийт дүн 20’000₮ -с дээш бол гүйлгээний
                    шимтгэл <text style={{ color: "blue" }}>0₮</text>, доош бол
                    гүйлгээний шимтгэл{" "}
                    <text style={{ color: "blue" }}>100₮</text>
                  </p>
                  <Button
                    onClick={showModal}
                    style={{ marginTop: "20px" }}
                    type="primary"
                    block
                  >
                    Үргэлжлүүлэх
                  </Button>
                </div>
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <Image
                      height={30}
                      width={30}
                      preview={false}
                      src="../../images/icon/tdb.png"
                    />
                  </span>
                }
                key="2"
              >
                <WalletBankInfo2 place="Дансны дугаар" />
                <WalletBankInfo2 place="Эзэмшигчийн нэр" />
                <p
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    color: "#A2A4AA",
                    width: 300,
                  }}
                >
                  Таны нийт гүйлгээний нийт дүн 20’000₮ -с дээш бол гүйлгээний
                  шимтгэл <text style={{ color: "blue" }}>0₮</text>, доош бол
                  гүйлгээний шимтгэл <text style={{ color: "blue" }}>100₮</text>
                </p>
                <Button
                  onClick={showModal}
                  style={{ marginTop: "20px" }}
                  type="primary"
                  block
                >
                  Үргэлжлүүлэх
                </Button>
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <Image
                      height={30}
                      width={30}
                      preview={false}
                      src="../../images/icon/golomt.png"
                    />
                  </span>
                }
                key="3"
              >
                <WalletBankInfo2 place="Дансны дугаар" />
                <WalletBankInfo2 place="Эзэмшигчийн нэр" />
                <p
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    color: "#A2A4AA",
                    width: 300,
                  }}
                >
                  Таны нийт гүйлгээний нийт дүн 20’000₮ -с дээш бол гүйлгээний
                  шимтгэл <text style={{ color: "blue" }}>0₮</text>, доош бол
                  гүйлгээний шимтгэл <text style={{ color: "blue" }}>100₮</text>
                </p>
                <Button
                  onClick={showModal}
                  style={{ marginTop: "20px" }}
                  type="primary"
                  block
                >
                  Үргэлжлүүлэх
                </Button>
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <Image
                      height={30}
                      width={30}
                      preview={false}
                      src="../../images/icon/xac.png"
                    />
                  </span>
                }
                key="4"
              >
                <WalletBankInfo2 place="Дансны дугаар" />
                <WalletBankInfo2 place="Эзэмшигчийн нэр" />
                <p
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    color: "#A2A4AA",
                    width: 300,
                  }}
                >
                  Таны нийт гүйлгээний нийт дүн 20’000₮ -с дээш бол гүйлгээний
                  шимтгэл <text style={{ color: "blue" }}>0₮</text>, доош бол
                  гүйлгээний шимтгэл <text style={{ color: "blue" }}>100₮</text>
                </p>
                <Button
                  onClick={showModal}
                  style={{ marginTop: "20px" }}
                  type="primary"
                  block
                >
                  Үргэлжлүүлэх
                </Button>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </WalletLayout>
  );
};

export default Transfer;
