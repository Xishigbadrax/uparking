import { Menu, Row, Col, Card, Alert } from "antd";
import {
  Modal,
  Button,
  Form,
  Input,
  Checkbox,
  Layout,
  Select,
  Divider,
} from "antd";
import { useContext, useState } from "react";
import { useEffect, useS } from "react";
import { apiList, callGet, callPost } from "@api/api";
import { Steps } from "antd";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { AntDesignOutlined } from "@ant-design/icons";

const MyMapComponent = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
      {props.isMarkerShown && (
        <Marker position={{ lat: -34.397, lng: 150.644 }} />
      )}
    </GoogleMap>
  ))
);
const steps = [
  {
    title: "Үндсэн мэдээлэл",
    content: "Үндсэн мэдээлэл",
  },
  {
    title: "Үндсэн зураг",
    content: "Үндсэн зураг",
  },
  {
    title: "Зогсоолын зураг",
    content: "Зогсоолын зураг",
  },
  {
    title: "Зогсоолын зураг",
    content: "Зогсоолын зураг",
  },
  {
    title: "Зогсоолын үзүүлэлт",
    content: "Зогсоолын зураг",
  },
  {
    title: "Үнийн мэдээлэл",
    content: "Зогсоолын зураг",
  },
  {
    title: "Хөнгөлөлт",
    content: "Зогсоолын зураг",
  },
  {
    title: "Түрээслэх өдрүүд",
    content: "Зогсоолын зураг",
  },
];
const { SubMenu } = Menu;
const { Content } = Layout;
const { Option } = Select;
const { Step } = Steps;
const mainInfo = (props) => {
  const [form] = Form.useForm();
  const [InputResidenceData, setInputResidenceData] = useState({});
  const [residenceData, setResidenceData] = useState({});
  const [aimag, setAimag] = useState([]);
  const [selectedAimag, setSelectedAimag] = useState({});
  const [sum, setSum] = useState([]);
  const [selectedSum, setSelectedSum] = useState({});
  const [khoroo, setKhoroo] = useState([]);
  const [selectedKhoroo, setSelectedKhoroo] = useState({});
  const [residence, setResidence] = useState([]);
  const [selectedResidence, setSelectedResidence] = useState({});
  const [residenceblock, setResidenceBlock] = useState([]);
  const [selectedResidenceBlock, setSelectedResidenceBlock] = useState({});
  const [DoorNo, setDoorNo] = useState();
  const [spaceNumber, setSpaceNumber] = useState();
  const [current, setCurrent] = useState(0);
  useEffect(async () => {
    const aimag = await callGet("/address/aimag");
    console.log(aimag);
    setAimag(aimag);
  }, []);

  useEffect(() => {
    props.setMainData(residenceData);
  }, [residenceData]);

  function classNames(...classes) {
    return classes.filter(Boolean).join("  ");
  }

  const onChangeAimag = async (e) => {
    const aimag1 = aimag.find((item) => item.value === Number(e));
    setSelectedAimag(aimag1);
    setResidenceData({ ...residenceData, provinceId: aimag1.value });
    const sums = await callGet(`/address/sum/${aimag1.value}`);
    console.log(sums);
    setSum(sums);
  };

  const onChangeSum = async (e) => {
    const sum1 = sum.find((item) => item.value === Number(e));
    console.log(sum1);
    setSelectedSum(sum1);
    setResidenceData({ ...residenceData, districtId: sum1.value });
    const khoroo = await callGet(`/address/khoroo/${sum1.value}`);
    console.log(khoroo);
    setKhoroo(khoroo);
  };
  const onChangeKhoroo = async (e) => {
    const horoo = khoroo.find((item) => item.value === Number(e));
    setSelectedKhoroo(horoo);
    setResidenceData({ ...residenceData, sectionId: horoo.value });
    const residence = await callGet(
      `/address/residence?districtId=${selectedSum.value}&provinceId=${selectedAimag.value}&sectionId=${horoo.value}`
    );
    setResidence(residence);
    console.log("residence--->", residence);
  };
  const onChangeResidence = async (e) => {
    const residence1 = residence.find((item) => item.value === Number(e));
    setSelectedResidence(residence1);
    setResidenceData({
      ...residenceData,
      residenceName: residence1.label,
      residenceId: e,
    });
    console.log("nicee");
    const residenceBlock = await callGet(
      `/address/residenceblock?residenceId=${e}`
    );
    setResidenceBlock(residenceBlock);
    console.log("residenceBlock--->", residenceBlock);
  };
  const onChangeInputResidence = (e) => {
    setResidenceData({ ...residenceData, residenceName: e.target.value });
  };
  const onChangeInputResidenceNumber = (e) => {
    setResidenceData({
      ...residenceData,
      residenceBlockNumber: e.target.value,
    });
  };
  const onChangeResidenceNumber = (e) => {
    const resiblock = residenceblock.find((item) => item.value === Number(e));
    setSelectedResidenceBlock(resiblock);
    setResidenceData({
      ...residenceData,
      residenceBlockId: selectedResidenceBlock.value,
    });
    setResidenceData({
      ...residenceData,
      residenceBlockNumber: e,
      residenceBlockId: e,
    });
  };
  const onChangeDoorNumber = (e) => {
    console.log(e.target.value);
    setDoorNo(e.target.value);
    setResidenceData({
      ...residenceData,
      parkingGateNumber: e.target.value,
    });
  };
  const onChangeSpaceNumber = (e) => {
    setSpaceNumber(e.target.value);
    setResidenceData({
      ...residenceData,
      parkingSpaceId: e.target.value,
    });
    console.log(residenceData);
  };
  const onFinishFailedVehile = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  // const onFinish = (values) => {
  //   console.log(values);
  // };
  return (
    <div className={`h-5/6`}>
      <Row offset={4}>
        <p
          style={{
            color: "blue",
            fontSize: "20px",
            marginTop: "50px",
            marginLeft: "100px",
          }}
        >
          <b> Орон сууц хотхоны үндсэн мэдээлэл</b>
        </p>
      </Row>
      <Row>
        <p
          style={{
            width: "300px",
            marginLeft: "100px",
            fontSize: "12px",
          }}
        >
          Албан ёсны болон олон нийтийн нэршил болсон нэрийг ашиглана уу!
        </p>
      </Row>
      <Row>
        <Col span={10}>
          <Form
            layout="horizontal"
            form={props.form}
            style={{ marginLeft: "100px", marginTop: "50px" }}
            onFinish={props.onFinish}
            onFinishFailed={onFinishFailedVehile}
          >
            <Form.Item
              name="aimag"
              rules={[{ required: true, message: "Choose value" }]}
            >
              <Select
                onChange={onChangeAimag}
                placeholder="Аймаг хот*"
                bordered="none"
              >
                {aimag.map((item) => (
                  <Select.Option key={item.value} value={item.value}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
              <Divider />
            </Form.Item>
            <Form.Item
              name="sum"
              rules={[{ required: true, message: "Choose province " }]}
              style={{ marginTop: "-10px" }}
            >
              <Select onChange={onChangeSum} placeholder="Сум дүүрэг">
                {sum.map((item) => (
                  <Select.Option key={item.value} value={item.value}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
              <Divider />
            </Form.Item>
            <Form.Item
              name="bag"
              rules={[{ required: true, message: "Choose value" }]}
              style={{ marginTop: "-10px" }}
            >
              <Select onChange={onChangeKhoroo} placeholder="Баг Хороо">
                {khoroo.map((item) => (
                  <Select.Option key={item.value} value={item.value}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
              <Divider />
            </Form.Item>
            <Form.Item
              name="residenceName"
              rules={[{ required: true, message: "Choose value" }]}
              style={{ marginTop: "-10px" }}
            >
              <Select onChange={onChangeResidence} placeholder="Байрны нэр*">
                {residence.map((item) => (
                  <Select.Option key={item.value} value={item.value}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
              <Divider />
            </Form.Item>

            {selectedResidence.label === "Бусад" ? (
              <div>
                <Form.Item name="residenceName" style={{ marginTop: "-10px" }}>
                  <Input
                    onChange={onChangeInputResidence}
                    placeholder="Байрны нэр "
                  />
                  <Divider />
                </Form.Item>
                <Form.Item
                  name="residenceNumber"
                  style={{ marginTop: "-10px" }}
                >
                  <Input
                    onChange={onChangeInputResidenceNumber}
                    placeholder="Байрны дугаар "
                  />
                  <Divider />
                </Form.Item>
              </div>
            ) : (
              <Form.Item
                name="residenceNumber"
                rules={[{ required: true, message: "Choose value" }]}
                style={{ marginTop: "-10px" }}
              >
                <Select
                  placeholder="Байрны дугаар*"
                  onChange={onChangeResidenceNumber}
                >
                  {residenceblock.map((item) => (
                    <Select.Option key={item.value} value={item.value}>
                      {item.label}
                    </Select.Option>
                  ))}
                </Select>
                <Divider />
              </Form.Item>
            )}
            {selectedResidenceBlock === "Бусад" && (
              <Form.Item
                style={{ marginTop: "-10px" }}
                name="haalgaNumber"
                rules={[{ required: true, message: "Utgaa oruulna uu?" }]}
              >
                <Input
                  placeholder="Авто зогсоолын хаалганы тоо"
                  onChange={onChangeInputResidenceNumber}
                />
                <Divider />
              </Form.Item>
            )}
            <Form.Item
              style={{ marginTop: "-10px" }}
              name="DoorNo"
              rules={[{ required: true, message: "error" }]}
            >
              <Input
                placeholder="Авто зогсоолын хаалганы тоо"
                onChange={onChangeDoorNumber}
              />
              <Divider />
            </Form.Item>
            <Form.Item name="spaceNumber ">
              <Input
                onChange={onChangeSpaceNumber}
                placeholder="Авто зогсоолын дугаар"
              />
              <Divider />
            </Form.Item>
          </Form>
        </Col>
        <Col offset={2} style={{ width: "800px", height: "600px" }}>
          <Row style={{ fontSize: "18px" }}>
            Хамгийн нарийвчлалтайгаар авто зогсоолын орох хаалгыг{" "}
            <b>“Google Map” дээр</b> тэмдэглэнэ үү!
          </Row>
          <Row>
            <div
              className="flex"
              style={{
                border: "1px solid yellow",
                borderRadius: "10px",
                marginTop: "10px",
              }}
            >
              <div style={{ padding: "5px" }}>
                <img src="/icons/info_outline_24px.png"></img>
              </div>
              <div
                style={{ fontSize: "15px", color: "yellow", padding: "5px" }}
              >
                Та зогсоолын орох хаалгын зааж өгнө үү!!
              </div>
            </div>
          </Row>
          <MyMapComponent
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={
              <div style={{ height: `400px`, marginTop: "20px" }} />
            }
            mapElement={<div style={{ height: `100%` }} />}
            style={{ marginTop: "10px" }}
          />
        </Col>
      </Row>
    </div>
  );
};
export default mainInfo;
