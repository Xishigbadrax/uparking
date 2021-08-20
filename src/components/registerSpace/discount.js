import { Row, Col, Divider } from "antd";
import { Form, Input } from "antd";
import { useEffect, useState } from "react";
import { callGet } from "@api/api";

const discount = (props) => {
  const [weekId, setweekId] = useState(null);
  const [monthId, setmonthId] = useState(null);
  const [weekSale1, setweekSale] = useState(null);
  const [monthSale1, setmonthSale] = useState(null);

  useEffect(async () => {
    const res = await callGet("/division/salesplit");
    console.log(res);
    if (res && res.saleSplit) {
      res.saleSplit.forEach((c) => {
        if (c.code == "WEEKLY_SALE") {
          setweekId(c.id);
          setweekSale(c.value);
        }
        if (c.code == "MONTHLY_SALE") {
          setmonthId(c.id);
          setmonthSale(c.value);
        }
      });
    }
  }, []);
  {
    {
      props.form.setFieldsValue({
        weekSale: weekSale1,
        monthSale: monthSale1,
      });
    }
  }
  return (
    <div className={`h-4/5`}>
      <Form form={props.form} className={`Sale`} onFinish={props.onFinish}>
        <Row offset={4}>
          <p
            style={{
              color: "blue",
              fontSize: "20px",
              marginTop: "50px",
              marginLeft: "100px",
            }}
          >
            <b> Хөнгөлөлтийн хувь</b>
          </p>
        </Row>
        <Row>
          <p
            style={{
              marginLeft: "100px",
              fontSize: "14px",
            }}
          >
            1 удаагийн захиалгаар урт хугацааны захиалга үүсгэхэд олгох
            хөнгөлөлт
          </p>
        </Row>
        <Row style={{ marginTop: "100px" }}>
          <Col offset={5}>
            <label style={{ fontSize: "14px" }}>
              7 хоногын захиалга - Хөнгөлөлтийн %
            </label>
            <Form.Item
              name="weekSale"
              rules={[
                {
                  required: true,
                  message: "7 хоногийн хөнгөлөлтийн хувиа оруулна уу?",
                },
              ]}
            >
              <Input
                placeholder="5%"
                onChange={(e) => {
                  setweekSale(e.target.value);
                  console.log(e.target.value);
                }}
                style={{ marginTop: "20px", width: "295px", height: "44px" }}
              />
            </Form.Item>
            <Divider style={{ color: "black" }} />
            <label style={{ fontSize: "14px", marginTop: "20px" }}>
              1 сарын захиалга - Хөнгөлөлтийн %
            </label>
            <Form.Item
              style={{ marginTop: "20px" }}
              name="monthSale"
              rules={[
                {
                  required: true,
                  message: "1 сарын хөнгөлөлтийн хувиа оруулна уу?",
                },
              ]}
            >
              <Input
                placeholder="10%"
                style={{ marginTop: "20px", width: "295px", height: "44px" }}
                onChange={(e) => {
                  setmonthSale(e.target.value);
                  console.log(e.target.value);
                }}
              />
            </Form.Item>
            <Divider />
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default discount;
