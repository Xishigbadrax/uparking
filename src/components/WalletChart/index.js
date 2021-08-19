import React from "react";
import { Line } from "@ant-design/charts";
import { Button, Tabs } from "antd";

const WalletChart = () => {
  const { TabPane } = Tabs;
  const data = [
    { year: "1 сар", value: 3 },
    { year: "2 сар", value: 4 },
    { year: "3 сар", value: 3.5 },
    { year: "4 сар", value: 5 },
    { year: "5 сар", value: 4 },
    { year: "6 сар", value: 6 },
    { year: "7 сар", value: 7 },
    { year: "8 сар", value: 3 },
    { year: "10 сар", value: 4 },
    { year: "11 сар", value: 5 },
    { year: "12 сар", value: 4 },
  ];

  const config = {
    data,
    height: 100,
    xField: "year",
    yField: "value",
    point: {
      size: 5,
      shape: "circle",
    },
    label: {
      style: {
        fill: "blue",
      },
    },
  };
  return (
    <div
      style={{
        height: "199px",
        width: "529px",
        overflowWrap: "break-word",
      }}
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="Орлого" key="1">
          <div style={{ textAlign: "right", lineHeight: "10px" }}>
            <Button type="text">Өдөр</Button>
            <Button type="text">Долоо хоног</Button>
            <Button type="text">Сар</Button>
          </div>
          <div>
            <Line {...config} />
          </div>
        </TabPane>
        <TabPane tab="Зарлага" key="2">
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button type="text">Өдөр</Button>
            <Button type="text">Долоо хоног</Button>
            <Button type="text">Сар</Button>
          </div>
          <div>
            <Line {...config} />;
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};
export default WalletChart;
