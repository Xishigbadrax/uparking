import { PushpinFilled } from "@ant-design/icons";
import { Menu, Dropdown } from "@headlessui/react";
import { Row, Col } from "antd";
import { Modal, Button, Form, Input, Checkbox, Layout, Select } from "antd";
import { useEffect, useState } from "react";
const validateMessages = [{}];
const pushDoor = [
  { name: "Дугаар таньдаг", image: "/icons/1) Checkbox.png" },
  { name: "Машин мэдэрдэг", image: "/icons/1) Checkbox.png" },
  { name: "Чипээр онгойдог", image: "/icons/1) Checkbox.png" },
  { name: "Сигналдаж онгойдог", image: "/icons/1) Checkbox.png" },
  { name: "Өөрөө онгойлгодог", image: "/icons/1) Checkbox.png" },
];
const floor = [
  { title: "B2", name: "B2 Давхар" },
  { title: "B1", name: "B1 Давхар" },
  { title: "F1", name: "1 Давхар" },
  { title: "F2", name: "2 Давхар" },
  { title: "F3", name: "3 Давхар" },
  { title: "F4", name: "4 Давхар" },
  { title: "F5", name: "5 Давхар" },
  { title: "F6", name: "6 Давхар" },
  { title: "F7", name: "7 Давхар" },
];

const parking = [
  { title: "Тэмдэглэгээтэй", image: "/icons/Car icons 19.png" },
  { title: "Тэмдэглэгээгүй", image: "/icons/temdegleegui.png" },
];

const spaceSize = [
  { title: "Дан зогсоол", image: "/icons/Parking type 3.png" },
  { title: "Давхар зогсоол |Хаадаг|", image: "/icons/haadag.png" },
  { title: "Давхар зогсоол |Хаалгадаг|", image: "/icons/haalgadg.png" },
  { title: "Бусад" },
];
const spaceType = [
  { title: "Жижиг тэрэг", image: "/icons/Micro car.png" },
  { title: "Суудлын тэрэг", image: "/icons/Sedan.png" },
  { title: "Жижиг SUV", image: "/icons/Small SUV.png" },
  { title: "Дундаж SUV", image: "/icons/Medium SUV.png" },
  { title: "Том SUV", image: "/icons/Large SUV.png" },
];
const direction = [
  { title: "Чигээрээ", image: "/icons/Up.png" },
  { title: "Баруун", image: "/icons/baruun.png" },
  { title: "Зүүн", image: "/icons/Left.png" },
  { title: "Чигээрээ,Баруун,зүүн", image: "/icons/Left & up & right.png" },
  { title: "Баруун ,Зүүн", image: "/icons/Left & right.png" },
  { title: "Чигээрээ ,Баруун", image: "/icons/Up & right.png" },
  { title: "Чигээрээ, Зүүн", image: "/icons/Up & left.png" },
];

const spaceIndicator = () => {
  const [IndicatorData, setIndicatorData] = useState({});
  const [spacesSize, setSpaceSize] = useState({});

  const onChangeEntranceLock = (e) => {
    console.log(e);
    setIndicatorData({ ...IndicatorData, entranceLock: e });
  };
  const onChangeFloor = (e) => {
    console.log(e);
    setIndicatorData({ ...IndicatorData, floorNumber: e });
  };
  const onChangeIsNumber = (e) => {
    console.log(e);
    setIndicatorData({ ...IndicatorData, isNumbering: e });
  };
  const onChangeSpaceSize = (e) => {
    console.log(e);
    console.log(IndicatorData);
    setSpaceSize(e);
    setIndicatorData({ ...IndicatorData, wad: e });
  };
  const onChangeSpaceSizeInput = (e) => {
    console.log(e.target.value);
    setIndicatorData({ ...IndicatorData });
  };
  const onChangeCheckBox = (e) => {
    console.log(e);
  };
  return (
    <div className={`h-5/6`}>
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
        <Col style={{ marginLeft: "100px" }} span={6}>
          <Form
            style={{ marginTop: "50px" }}
            labelCol={{ span: 4 }}
            layout="horizontal"
          >
            <Form.Item
              span={4}
              rules={[
                { required: true, message: "ЗОгсоолын хаалгаа сонгоно уу?" },
              ]}
            >
              <Select
                placeholder="Зогсоолын орох хаалга /Хэрхэн нэвтрэх/"
                onChange={onChangeEntranceLock}
              >
                {pushDoor.map((item) => (
                  <Select.Option key={item.name} span={4}>
                    <div style={{ display: "flex" }}>
                      <div>
                        <img
                          src={item.image}
                          height="24px"
                          width="48px"
                          style={{
                            marginTop: "-3px",
                            marginLeft: "-10px",
                          }}
                        ></img>
                      </div>
                      {item.name}
                      <p style={{ fontSize: "12px" }}></p>
                    </div>
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item span={4}>
              <Select
                placeholder="Зогсоолын давхрын байршил*"
                onChange={onChangeFloor}
              >
                {floor.map((item) => (
                  <Select.Option key={item.title} value={item.title}>
                    <div style={{ display: "flex" }}>
                      <p style={{ fontSize: "15px" }}>
                        <b>{item.title}</b>
                      </p>
                      <p style={{ marginLeft: "10px", fontSize: "12px" }}>
                        {item.name}
                      </p>
                    </div>
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item span={6}>
              <Select
                placeholder="Зогсоолын дугаарын тэмдэглэгээ*"
                span={6}
                onChange={onChangeIsNumber}
              >
                {parking.map((item) => (
                  <Select.Option key={item.title} value={item.title} span={6}>
                    <div style={{ display: "flex" }}>
                      <div>
                        <img src={item.image} height="24px" width="24px"></img>
                      </div>
                      <p style={{ marginLeft: "10px", fontSize: "12px" }}>
                        {item.title}
                      </p>
                    </div>
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item span={4}>
              <Select
                placeholder="Зогсоолын хэмжээ*"
                onChange={onChangeSpaceSize}
              >
                {spaceSize.map((item) => (
                  <Select.Option key={item.title}>
                    <div style={{ display: "flex" }}>
                      <div>
                        <img src={item.image} height="24px" width="24px"></img>
                      </div>
                      <p style={{ marginLeft: "10px", fontSize: "12px" }}>
                        {item.title}
                      </p>
                    </div>
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            {spacesSize === "Бусад" && (
              <Form.Item>
                <Input
                  placeholder="Төрөлөө оруулна уу?"
                  onChange={onChangeSpaceSizeInput}
                ></Input>
              </Form.Item>
            )}
            <Form.Item span={4}>
              <Select placeholder="Зогсоолын төрөл*">
                {spaceType.map((item) => (
                  <Select.Option key={item.title} value={item.title}>
                    <div style={{ display: "flex" }}>
                      <div>
                        <img src={item.image} height="20px" width="24px"></img>
                      </div>
                      <p style={{ fontSize: "12px", marginLeft: "10px" }}>
                        {item.title}
                      </p>
                    </div>
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Col>
        <Col offset={2}>
          <p style={{ fontSize: "12px" }}>
            Зогсоолын эргэж гарах боломжтой чиглэл
          </p>

          <Checkbox.Group
            onChange={onChangeCheckBox}
            style={{ marginTop: "50px" }}
          >
            {direction.map((item) => (
              <Row>
                <Checkbox key={item.title} value={item.title}>
                  <div style={{ display: "flex" }}>
                    <div>
                      <img src={item.image} height="20px" width="20px"></img>
                    </div>
                    <p style={{ fontSize: "12px" }}>{item.title}</p>
                  </div>
                </Checkbox>
              </Row>
            ))}
          </Checkbox.Group>
        </Col>
      </Row>
      <Row></Row>
      <Row></Row>
      <Row></Row>
    </div>
  );
};
export default spaceIndicator;
