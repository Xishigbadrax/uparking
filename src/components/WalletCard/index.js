import React from "react";
import { useState } from "react";
import { Image } from "antd";
import Helper from "@utils/helper";

const WalletCard = () => {
  const [orderData, setOrderData] = useState({});
  return (
    <div
      style={{
        backgroundImage: "url(/images/wallet-background.png",
        width: "327px",
        height: "200px",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div style={{ padding: "25px" }}>
        <Image src={"/images/logo-white.png"} width="94px" />
        <div style={{ marginTop: "50px" }}>
          <div
            style={{
              fontSize: "16px",
              lineHeight: "16px",
              textAlign: "right",
              letterSpacing: "0.4px",
              color: "#FFFFFF",
            }}
          >
            Нийт дүн:
          </div>
          <div
            style={{
              fontSize: "26px",
              lineHeight: "28px",
              textAlign: "right",
              letterSpacing: "0.4px",
              color: "#FFFFFF",
            }}
          >
            {orderData.totalPrice
              ? Helper.formatValueReverse(orderData.totalPrice)
              : 0}
          </div>
          <div
            style={{
              fontSize: "16px",
              lineHeight: "16px",
              textAlign: "right",
              letterSpacing: "0.4px",
              color: "#FFFFFF",
            }}
          >
            Бонус:
          </div>
          <div
            style={{
              fontSize: "26px",
              lineHeight: "28px",
              textAlign: "right",
              letterSpacing: "0.4px",
              color: "#FFFFFF",
            }}
          >
            {orderData.totalPrice
              ? Helper.formatValueReverse(orderData.totalPrice)
              : 0}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletCard;
