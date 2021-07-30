import { Row, Col, Divider } from "antd";
import { Form, Input } from "antd";
const discount = () => {
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
          <b> Хөнгөлөлтийн хувь</b>
        </p>
      </Row>
      <Row>
        <p
          style={{
            marginLeft: "100px",
            fontSize: "12px",
          }}
        >
          1 удаахын захиалгаарр урт хугацааны захиалга үүсгэхэд олгох хөнгөлөлт
        </p>
      </Row>
      <Row>
        <Col offset={5}>
          <Form style={{ marginTop: "70px" }}>
            <Form.Item>
              <label style={{ fontSize: "12px" }}>
                7 хоногын захиалга - Хөнгөлөлтийн %
              </label>
              <Input placeholder="5%" style={{ marginTop: "20px" }}></Input>
              <Divider />
            </Form.Item>
            <Form.Item style={{ marginTop: "20px" }}>
              <label style={{ fontSize: "12px" }}>
                1 сарын захиалга - Хөнгөлөлтийн %
              </label>
              <Input placeholder="10%" style={{ marginTop: "20px" }}></Input>
              <Divider />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
export default discount;
