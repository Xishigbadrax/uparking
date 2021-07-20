import { Row, Col, Select } from "antd";
import { Modal, Button, Form, Input, Checkbox, Layout } from "antd";
import { useEffect, useState } from "react";

const spaceIndicator = () => {
  return (
    <div>
      <Row offset={4}>
        <p
          style={{
            fontSize: "20px",
            marginTop: "50px",
            color: "blue",
            marginLeft: "100px",
          }}
        >
          <b>Зогсоолийн үндсэн үзүүлэлт</b>
        </p>
      </Row>
      <Row>
        <p style={{ fontSize: "12px", marginLeft: "100px" }}>
          Тухайн зогсоолийн тохиромжтой байдлыг илэрхийлэх үзүүлэлтүүд
        </p>
      </Row>
      <Row>
        <Col>
          <Form>
            <Form.Item
              style={{ borderBottom: "1px solid black", border: "none" }}
            >
              <Select placeholder="Зогсоолын орох хаалга /Хэрхэн нэвтрэх/">
                <Option></Option>
              </Select>
            </Form.Item>
          </Form>
        </Col>
        <Col offset={2}></Col>
      </Row>
    </div>
  );
};
export default spaceIndicator;
