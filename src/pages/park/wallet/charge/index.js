import React from "react";
import { useState, useEffect } from "react";
import WalletLayout from "@components/layouts/WalletLayout";
import WalletChart from "@components/WalletChart";
import WalletCard from "../../../../components/WalletCard";
import WalletBankInfo2 from "@components/WalletBankInfo2";
import WalletBankInfo from "@components/WalletBankInfo";
import { Tabs, Image, Typography, Button } from "antd";
import { center } from "@antv/g2plot/lib/plots/sankey/sankey";
import { callGet, callPost } from "@api/api";
const Charge = () => {
  const { TabPane } = Tabs;
  const { Paragraph } = Typography;
  const pos = {
    display: "flex",
    justifyContent: "space-between",
  };

  const [type2, settype2] = useState("MONGOLCHAT");
  const [phoneNumber, setphoneNumber] = useState(null);
  const [amount, setamount] = useState(null);

  const [type, settype] = useState("KHANBANK");
  const [data, setdata] = useState(null);

  const fetchData2 = async () => {
    if (amount != 0) {
      let formData2 = {
        amount: amount,
        bookingId: null,
        topUp: true,
      };
      formData.amount = amount;
      formData.phoneNumber =
        type != "MONGOLCHAT" ? phoneNumber : user_phoneNumber;
      {
        type == "MONGOLCHAT"
          ? await callPost(`/mongolchat/wallet`).then((res) => {
              console.log(res);
              if (res.code == 1000) {
                settitle("Амжилтай");
                setmessage("Амжилттай. Нэхэмжлэх үүсгэлээ.");
                setstatus("success");
                setmessageShow(true);
                Linking.openURL(res.dynamic_link)
                  .then((res) => {})
                  .catch(() => {
                    settitle("Анхааруулга");
                    setmessage("Нэхэмжлэх үүсгэхэд алдаа гарлаа");
                    setstatus("failed");
                    setmessageShow(true);
                  });
              } else {
                settitle("Анхааруулга");
                setmessage("Нэхэмжлэх үүсгэхэд алдаа гарлаа");
                setstatus("failed");
                setmessageShow(true);
              }
            })
          : type == "LENDMN"
          ? await callPost(`/lend/qr/wallettopup`).then((res) => {
              console.log(res);
              if (res.qr_string) {
                settitle("Амжилтай");
                setmessage("Амжилттай. Нэхэмжлэх үүсгэлээ.");
                setstatus("success");
                setmessageShow(true);
              } else {
                settitle("Анхааруулга");
                setmessage("Нэхэмжлэх үүсгэхэд алдаа гарлаа");
                setstatus("failed");
                setmessageShow(true);
              }
            })
          : type == "SOCIALPAY"
          ? await callPost(`/invoice`).then((res) => {
              console.log(res);
              if (res && res.invoice) {
                settitle("Амжилтай");
                setmessage("Амжилттай. Нэхэмжлэх үүсгэлээ.");
                setstatus("success");
                setmessageShow(true);
                Linking.openURL(
                  "https://ecommerce.golomtbank.com/socialpay/mn/" + res.invoice
                )
                  .then((res) => {})
                  .catch(() => {
                    settitle("Анхааруулга");
                    setmessage("Нэхэмжлэх үүсгэхэд алдаа гарлаа");
                    setstatus("failed");
                    setmessageShow(true);
                  });
              } else {
                settitle("Анхааруулга");
                setmessage("Нэхэмжлэх үүсгэхэд алдаа гарлаа");
                setstatus("failed");
                setmessageShow(true);
              }
            })
          : null;
      }
    } else {
      settitle("Анхааруулга");
      setmessage("Үнийн дүн хоосон байна");
      setstatus("failed");
      setmessageShow(true);
    }
  };

  const fetchData = async () => {
    await callGet(`/payment/bankinfo?bankName=${type}`).then((res) => {
      setdata(res);
    });
  };
  useEffect(() => {
    fetchData();
  }, [type]);

  const handleClickBankLogo = (activekey) => {
    settype(activekey);
  };

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

  return (
    <WalletLayout>
      <div style={pos}>
        <div>
          <WalletCard />
        </div>

        <div>
          <WalletChart />
        </div>
      </div>
      <div style={{ height: "480px", width: "327px" }}>
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Дансаар" key="1">
            <div>
              <Tabs
                centered
                defaultActiveKey="1"
                onChange={handleClickBankLogo}
              >
                {tabItems.map((tabitem) => (
                  <TabPane
                    key={tabitem.type}
                    tab={
                      <span>
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
                      <WalletBankInfo
                        value={
                          data && data.accountNumber ? data.accountNumber : 0
                        }
                      >
                        Дансны дугаар
                      </WalletBankInfo>
                      <WalletBankInfo
                        value={data && data.accountName ? data.accountName : 0}
                      >
                        Хүлээн авагч
                      </WalletBankInfo>
                      <WalletBankInfo
                        value={data && data.description ? data.description : 0}
                      >
                        Гүйлгээний утга
                      </WalletBankInfo>
                    </div>
                  </TabPane>
                ))}
              </Tabs>
            </div>
          </TabPane>
          <TabPane tab="Нэхэмжлэх" key="2">
            <div>
              <Tabs centered defaultActiveKey="2">
                <TabPane
                  tab={
                    <span
                      onClick={() => {
                        settype2("MONGOLCHAT");
                      }}
                    >
                      <Image
                        height={30}
                        width={30}
                        preview={false}
                        src="../../images/icon/mongolChat.png"
                      />
                    </span>
                  }
                  key="1"
                >
                  <div>
                    <WalletBankInfo
                      value={amount}
                      onChange={(amount) => setamount(amount)}
                    >
                      Цэнэглэх дүн
                    </WalletBankInfo>
                    <Button type="primary" block>
                      Нэхэмжлэл илгээх
                    </Button>
                  </div>
                </TabPane>
                <TabPane
                  tab={
                    <span
                      onClick={() => {
                        settype2("LENDMN");
                      }}
                    >
                      <Image
                        height={30}
                        width={30}
                        preview={false}
                        src="../../images/icon/lendMn.png"
                      />
                    </span>
                  }
                  key="2"
                >
                  <WalletBankInfo
                    value={phoneNumber}
                    onChange={(phoneNumber) => setphoneNumber(phoneNumber)}
                  >
                    Утасны дугаар
                  </WalletBankInfo>
                  <WalletBankInfo
                    value={amount}
                    onChange={(amount) => setamount(amount)}
                  >
                    Цэнэглэх дүн
                  </WalletBankInfo>
                  <Button type="primary" block>
                    Нэхэмжлэл илгээх
                  </Button>
                </TabPane>
                <TabPane
                  tab={
                    <span
                      onClick={() => {
                        settype2("SOCIALPAY");
                      }}
                    >
                      <Image
                        height={30}
                        width={30}
                        preview={false}
                        src="../../images/icon/socialPay.png"
                      />
                    </span>
                  }
                  key="3"
                >
                  <WalletBankInfo
                    value={amount}
                    onChange={(amount) => setamount(amount)}
                  >
                    Цэнэглэх дүн
                  </WalletBankInfo>
                  <Button onClick={() => fetchData2()} type="primary" block>
                    Нэхэмжлэл илгээх
                  </Button>
                </TabPane>
              </Tabs>
            </div>
          </TabPane>
          <TabPane tab="Промо код" key="3">
            Промо код
          </TabPane>
        </Tabs>
      </div>
    </WalletLayout>
  );
};

export default Charge;
