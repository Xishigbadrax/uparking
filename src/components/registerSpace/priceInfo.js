import { Row, Col } from "antd";

import { Form, Input, Label } from "antd";

const priceInfo = () => {
  return (
    <div className={`h-4/5`}>
      <Row offset={4}>
        <p
          style={{
            color: "blue",
            fontSize: "20px",
            marginTop: "50px",
            marginLeft: "100px",
          }}
        >
          <b> Түрээслэх үнийн мэдээлэл</b>
        </p>
      </Row>
      <Row style={{ marginLeft: "200px", marginTop: "70px" }}>
        <Col>
          <Row>
            Өдрийн цагаар түрээслэх үнэ
            <text style={{ color: "blue" }}>
              <b>|09:00-18:30|</b>
            </text>
          </Row>
          <Form labelCol={{ span: 10 }} layout="vertical">
            <Form.Item>
              <label style={{ fontSize: "14px", color: "gray" }}>
                Өвөл|10.01-03.31
              </label>
              <Input type="text"></Input>
            </Form.Item>
            <Form.Item>
              <label style={{ fontSize: "14px", color: "gray" }}>
                Зун|04.01-09.31
              </label>
              <Input type="text"></Input>
            </Form.Item>
          </Form>
          <Row>
            Шөнийн цагаар түрээслэх үнэ
            <text style={{ color: "blue" }}>
              <b>|19:00-8:30|</b>
            </text>
          </Row>
          <Form labelCol={{ span: 10 }} layout="vertical">
            <Form.Item>
              <label style={{ fontSize: "14px", color: "gray" }}>
                Өвөл|10.01-03.31
              </label>
              <Input type="text"></Input>
            </Form.Item>
            <Form.Item>
              <label style={{ fontSize: "14px", color: "gray" }}>
                Зун|04.01-09.31
              </label>
              <Input type="text"></Input>
            </Form.Item>
          </Form>
        </Col>
        <Col offset={4}>
          <Row>
            Бүтэн өдрийн түрээслэх үнэ
            <text style={{ color: "blue" }}>
              <b>|24 цаг|</b>
            </text>
          </Row>
          <Form labelCol={{ span: 10 }} layout="vertical">
            <Form.Item>
              <label style={{ fontSize: "14px", color: "gray" }}>
                Өвөл|10.01-03.31
              </label>
              <Input type="text"></Input>
            </Form.Item>
            <Form.Item>
              <label style={{ fontSize: "14px", color: "gray" }}>
                Зун|04.01-09.31
              </label>
              <Input type="text"></Input>
            </Form.Item>
          </Form>
          <Row>
            Цагийн түрээслэх үнэ
            <text style={{ color: "blue" }}>
              <b>|1 цаг|</b>
            </text>
          </Row>
          <Form labelCol={{ span: 10 }} layout="vertical">
            <Form.Item>
              <label style={{ fontSize: "14px", color: "gray" }}>
                1 цаг түрээслэх
              </label>
              <Input type="text"></Input>
            </Form.Item>
          </Form>
          <Row>
            <Col>
              <p style={{ fontSize: "12px" }}>Багц 1 | 1-3 цаг|</p>
              <p>2,500</p>
            </Col>
            <Col style={{ marginLeft: "15px" }}>
              <p style={{ fontSize: "12px" }}>Багц 2 | 3-5 цаг|</p>
              <p>4,000</p>
            </Col>
            <Col style={{ marginLeft: "15px" }}>
              <p style={{ fontSize: "12px" }}>Багц 3 | 5-8 цаг|</p>
              <p>6,000</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
export default priceInfo;
