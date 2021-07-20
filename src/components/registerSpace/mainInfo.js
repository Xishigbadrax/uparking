import { Menu, Row, Col, Card, Alert } from "antd";
import { Modal, Button, Form, Input, Checkbox, Layout, Select } from "antd";
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
const mainInfo = () => {
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
    setSelectedAimag(aimag);
  }, []);

  function classNames(...classes) {
    return classes.filter(Boolean).join("  ");
  }

  useEffect(async () => {
    const sums = await callGet(`/address/sum/${selectedAimag.value}`);
    console.log(sums);
    setSum(sums);
  }, [selectedAimag]);

  useEffect(async () => {
    const khoroo = await callGet(`/address/khoroo/${selectedSum.value}`);
    console.log(khoroo);
    setKhoroo(khoroo);
  }, [selectedSum]);

  useEffect(async () => {
    const residence = await callGet(
      `/address/residence?districtId=${selectedSum.value}&provinceId=${selectedAimag.value}&sectionId=${selectedKhoroo.value}`
    );
    setResidence(residence);
    console.log("residence--->", residence);
  }, [selectedKhoroo]);

  useEffect(async () => {
    const residenceBlock = await callGet(
      `/address/residenceblock?residenceId=${selectedResidence.value}`
    );
    setResidenceBlock(residenceBlock);
    console.log("residenceBlock--->", residenceBlock);
  }, [selectedResidence]);

  const [isProfileNotEdit, setIsProfileNotEdit] = useState(true);
  const [isVehileVisible, setIsVehileVisible] = useState(false);
  const [isParkVisible, setIsParkVisible] = useState(false);

  // const onFinish = (values) => {
  //   console.log("Success:", values);
  // };

  // const onFinishFailed = (errorInfo) => {
  //   console.log("Failed:", errorInfo);
  // };
  // const clickProfileEdit = () => {
  //   if (isProfileNotEdit) {
  //     setIsProfileNotEdit(false);
  //   } else {
  //     setIsProfileNotEdit(true);
  //   }
  // };
  const handleOk = async () => {
    console.log(formData);
    const res = await callPost("/user/vehicle", formData);
    console.log("success", res);
    setIsVehileVisible(false);
  };

  const handleCancel = () => {
    setIsVehileVisible(false);
  };
  const onChangeAimag = (e) => {
    const aimag1 = aimag.find((item) => item.value === Number(e));
    setSelectedAimag(aimag1);
    setResidenceData({ ...residenceData, provinceId: aimag1.value });
  };

  const onChangeSum = (e) => {
    const sum1 = sum.find((item) => item.value === Number(e));
    console.log(sum1);
    setSelectedSum(sum1);
    setResidenceData({ ...residenceData, districtId: sum1.value });
  };
  const onChangeKhoroo = (e) => {
    const horoo = khoroo.find((item) => item.value === Number(e));
    setSelectedKhoroo(horoo);
    setResidenceData({ ...residenceData, sectionId: horoo.value });
  };
  const onChangeResidence = (e) => {
    const residence1 = residence.find((item) => item.value === Number(e));
    setSelectedResidence(residence1);

    setResidenceData({
      ...residenceData,
      residenceName: residence1.label,
      residenceId: e,
    });
    console.log("nicee");
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
      residenceBlockNumber: selectedResidenceBlock.label,
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
  };

  //   const onSaved = async () => {
  //     const res = callPost("/parkingfirst", residenceData);
  //     setCurrent(current + 1);
  //     console.log("success", res);
  //   };
  //   const goBack = () => {
  //     console.log("Bye");
  //     setCurrent(current - 1);
  //   };
  const onFinishFailedVehile = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
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
            labelCol={{ span: 4 }}
            layout="horizontal"
            style={{ marginLeft: "100px", marginTop: "50px" }}
          >
            <Form.Item span={4}>
              <Select onChange={onChangeAimag} placeholder="Хот,Aймаг *">
                {aimag.map((item) => (
                  <Option key={item.value} value={item.value}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item span={4}>
              <Select onChange={onChangeSum} placeholder="Сум,Дүүрэг *">
                {sum.map((item) => (
                  <Option key={item.value} value={item.value}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item span={4}>
              <Select onChange={onChangeKhoroo} placeholder="Баг,Хороо">
                {khoroo.map((item) => (
                  <Option key={item.value} value={item.value}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item span={4}>
              <Select onChange={onChangeResidence} placeholder="Байрны нэр">
                {residence.map((item) => (
                  <Option key={item.value} value={item.value}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item span={4}>
              <Select
                onChange={onChangeResidenceNumber}
                placeholder="Байрны дугаар "
              >
                {residenceblock.map((item) => (
                  <Option key={item.value} value={item.value}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item span={4}>
              <Input
                onChange={onChangeDoorNumber}
                placeholder="Авто Зогсоолын хаалганы тоо "
              ></Input>
            </Form.Item>
            <Form.Item span={4}>
              <Input
                onChange={onChangeSpaceNumber}
                placeholder="Авто Зогсоолын дугаар "
              ></Input>
            </Form.Item>
          </Form>
          {/* <Form.Item>
          <Button onClick={onSaved}>za uzii</Button>
        </Form.Item> */}
        </Col>
        <Col offset={2} style={{ width: "800px", height: "600px" }}>
          <Row style={{ fontSize: "12px" }}>
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
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </Col>
      </Row>
      {/* <Row style={{ marginLeft: "100px" }}>
        <Col>
          {current > 0 && (
            <Button onClick={goBack} style={{ color: "blue" }}>
              Буцах
            </Button>
          )}
        </Col>
        <Col offset={16}>
          {current < steps.length - 1 && (
            <Button onClick={onSaved} className="buttonGo">
              Үргэлжлүүлэх
            </Button>
          )}
        </Col>
      </Row> */}
    </div>
  );
};
export default mainInfo;
