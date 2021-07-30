import { Menu, Row, Col, Card, Alert } from "antd";
import {
  UserOutlined,
  EditOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import ProfileLayout from "@components/layouts/ProfileLayout";
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
import { useContext, useState, useRef } from "react";
import { useEffect, useS } from "react";
import { Steps } from "antd";
import { apiList, callGet, callPost } from "@api/api";
import Link from "next/link";
import MainInfo from "@components/registerSpace/mainInfo";
import MainImage from "@components/registerSpace/mainImage";
import SpaceImage from "@components/registerSpace/spaceImage";
import SpaceIndicator from "@components/registerSpace/spaceIndicator";
import PriceInfo from "@components/registerSpace/priceInfo";
import Discount from "@components/registerSpace/discount";
import RentDate from "@components/registerSpace/rentDate";
import Context from "@context/Context";

// import {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
//   Marker,
// } from "react-google-maps";

const { SubMenu } = Menu;
const { Content } = Layout;
const { Option } = Select;
const { Step } = Steps;

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

const Profile = () => {
  const [formData, setFormdata] = useState({});
  // const [residenceData, setResidenceData] = useState({});
  const [dugaar, setDugaar] = useState();
  const [space, setSpace] = useState([]);
  const [uildwer, setUildwer] = useState([]);
  const [selectedUildwer, setSelectedUildwer] = useState({});
  const [zagwar, setZagwar] = useState([]);
  const [rfId, setRfId] = useState();
  const [color, setColor] = useState([]);
  const [selectedZagwar, setSelectedZagwar] = useState({});
  const [selectedColor, setSelectedColor] = useState({});
  const [vehicles, setVehicles] = useState([]);

  const [current, setCurrent] = useState(0);
  // // const ctx = useContext(Context);

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
  const [isProfileNotEdit, setIsProfileNotEdit] = useState(true);
  const [isVehileVisible, setIsVehileVisible] = useState(false);
  const [isParkVisible, setIsParkVisible] = useState(false);
  const mainInfoRef = useRef(null);
  const [form] = Form.useForm();

  const onFinish1234 = (values) => {};

  useEffect(async () => {
    const aimag = await callGet("/address/aimag");
    console.log(aimag);
    setAimag(aimag);
    const data = await callGet("/user/vehicle/list");
    setVehicles(data);
    const uildwer = await callGet("/user/vehicle/maker");
    setSelectedUildwer(uildwer);
    setUildwer(uildwer);
    const color = await callGet("/user/vehicle/color");
    setColor(color);
    // const space = await callGet("/parkingspace/list");
    setFormdata({ ...formData, rfid: "12" });
  }, []);

  function classNames(...classes) {
    return classes.filter(Boolean).join("  ");
  }
  const onSavedSpaceFormData = async () => {
    console.log(mainData);
    const res = await callPost("/parkingfirst", mainData);
    console.log(res);
  };
  const onChangeUildver = async (e) => {
    console.log("i am here-->", e);
    const uildver = uildwer.find((item) => item.value === e);
    setSelectedUildwer(uildver);
    const model = await callGet(`/user/vehicle/model?maker=${uildver.label}`);
    setZagwar(model);
    setFormdata({ ...formData, maker: uildver.value });
  };
  const onChangeZagwar = (e) => {
    console.log(e);
    const selectZagwar = zagwar.find((item) => item.value === e);
    setSelectedZagwar(selectZagwar);
    setFormdata({ ...formData, model: selectZagwar.value });
  };
  const onChangeDugaar = (e) => {
    const dugar = e.target.value;
    setDugaar(dugar);
    setFormdata({ ...formData, vehicleNumber: dugar });
  };
  const onChangeColor = (e) => {
    console.log(e);
    const selectColor = color.find((item) => item.label === e);
    setSelectedColor(selectColor);
    setFormdata({ ...formData, color: selectColor.value });
  };

  const [mainData, setMainData] = useState(null);
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const clickProfileEdit = () => {
    if (isProfileNotEdit) {
      setIsProfileNotEdit(false);
    } else {
      setIsProfileNotEdit(true);
    }
  };
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

  const onClickContinue = async () => {
    // if (steps === "Үндсэн мэдээлэл") {
    console.log("mainData11111111111", mainData);
    console.log(":mainInfoRef", mainInfoRef);
    console.log(form.validateFields());
    {
      form.getFieldError() ? null : setCurrent(current + 1);
    }
    // }
    // return;
    // const res = callPost("/parkingfirst", residenceData);
    // setCurrent(current + 1);
    // console.log("success", res);
  };
  const goBack = () => {
    console.log("Bye");
    setCurrent(current - 1);
  };
  const onFinishFailedVehile = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <ProfileLayout>
      <Row style={{ marginLeft: "65px" }} className={"profileIndex"}>
        <Col span={12}>
          <Card>
            <Row className="header">
              <Col span={3}>
                <UserOutlined style={{ fontSize: "30px" }} />
              </Col>
              <Col span={18}>
                {" "}
                <span className="text">Хувийн мэдээлэл</span>
              </Col>
              <Col span={3} style={{ textAlign: "right" }}>
                <EditOutlined
                  className="edit"
                  onClick={clickProfileEdit}
                  style={{ fontSize: "28px" }}
                />
              </Col>
            </Row>
            <Form
              className="profileForm"
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Овог:"
                name="surname"
                rules={[{ required: true, message: "Овог оруулна уу" }]}
              >
                <Input disabled={isProfileNotEdit} />
              </Form.Item>
              <Form.Item
                label="Нэр:"
                name="givenname"
                rules={[{ required: true, message: "Нэр оруулна уу" }]}
              >
                <Input disabled={isProfileNotEdit} />
              </Form.Item>
              <Form.Item
                label="Регистрийн дугаар:"
                name="register"
                rules={[
                  { required: true, message: "Регистрийн дугаар оруулна уу" },
                ]}
              >
                <Input disabled={isProfileNotEdit} />
              </Form.Item>
              <Form.Item
                label="Утасны дугаар:"
                name="phonenumber"
                rules={[
                  { required: true, message: "Утасны дугаар оруулна уу" },
                ]}
              >
                <Input disabled={isProfileNotEdit} />
              </Form.Item>
              <Form.Item
                label="И-мэйл хаяг:"
                name="email"
                rules={[{ required: true, message: "И-мэйл хаяг оруулна уу" }]}
              >
                <Input disabled={isProfileNotEdit} />
              </Form.Item>
              <Form.Item
                label="Facebook:"
                name="facebook"
                rules={[{ required: false, message: "Facebook оруулна уу" }]}
              >
                <Input disabled={isProfileNotEdit} />
              </Form.Item>

              <Form.Item label="Хэрэглэгчийн дугаар:" name="usernumber">
                <Input disabled={true} />
              </Form.Item>

              {!isProfileNotEdit && (
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Хадгалах
                  </Button>
                </Form.Item>
              )}
            </Form>
          </Card>
        </Col>
        <Col span={12} style={{ paddingLeft: "25px" }}>
          <Card>
            <Row className="header">
              <Col span={3}></Col>
              <Col span={18}>
                <span className="text">Тээврийн хэрэгсэл</span>
              </Col>
              <Col span={3} style={{ textAlign: "right" }}></Col>
            </Row>
            <Row style={{ minHeight: "200px", paddingTop: "30px" }}>
              {vehicles.map((item) => (
                <div
                  key={item.value}
                  className="mt-4 width-auto  rounded flex shadow-sm"
                  style={{ backgroundColor: "white", width: "325px" }}
                >
                  <div className="mt-4 ml-4">
                    <img src="/directions_car_24px.png"></img>
                  </div>
                  <div className="ml-4">
                    {/* <div class="text-sm">{item.label}</div> */}
                    <div className="text-base" style={{ color: "blue " }}>
                      {item.label}
                    </div>
                  </div>
                  <div className="ml-40 mt-2 ">
                    <Link href={`/teever/edit/${item.id}`}>
                      <img src="/mode_24px.png" />
                    </Link>
                  </div>
                </div>
              ))}
            </Row>
            <Row>
              <Button
                type="dashed"
                block
                onClick={() => setIsVehileVisible(true)}
              >
                +
              </Button>
            </Row>
          </Card>
          <Card style={{ marginTop: "25px" }}>
            <Row className="header">
              <Col span={3}></Col>
              <Col span={18}>
                {" "}
                <span className="text">Авто зогсоол</span>
              </Col>
              <Col span={3} style={{ textAlign: "right" }}></Col>
            </Row>
            <Row style={{ minHeight: "200px", paddingTop: "30px" }}>
              {space.map((item) => {
                <Col key={item.value} offset={2}>АЗН</Col>;
              })}
            </Row>
            <Row>
              <Button
                type="dashed"
                block
                onClick={() => setIsParkVisible(true)}
              >
                +
              </Button>
            </Row>
          </Card>
        </Col>
      </Row>
      <Modal
        className="fullModal "
        title="Тээврийн хэрэгсэл бүртгүүлэх"
        centered
        style={{ minHeight: "800px", height: "auto" }}
        visible={isVehileVisible}
        okButtonProps={{
          form: "vehile-edit-form",
          key: "submit",
          htmlType: "submit",
        }}
        onOk={() => setIsVehileVisible(false)}
        onCancel={() => setIsVehileVisible(false)}
        width={1000}
        footer={[
          <Button key="back" type="link" onClick={handleCancel}>
            <ArrowLeftOutlined /> Буцах
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Хадгалах
          </Button>,
        ]}
      >
        <Row>
          <Col span={2}></Col>
          <Col span={20}>
            <div className={"titleV"}>
              <div className="topV">Тээврийн - мэдээлэл</div>
              <div className="bottomV">
                Тухайн хэсэгт зогсоолын байрлал, дугаарлалт харагдаж буй зураг
                хийхгүй
              </div>
            </div>
            <Row style={{ marginTop: "20px" }}>
              <Col span={10}>
                <Form
                  id="vehile-edit-form"
                  layout="vertical"
                  name="basic"
                  labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 16,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={handleOk}
                  onFinishFailed={onFinishFailedVehile}
                >
                  <Form.Item
                    label="Улсын дугаар"
                    name="licensePlate"
                    rules={[
                      {
                        required: true,
                        message: "Улсын дугаар оруулна уу",
                      },
                    ]}
                  >
                    <Input onChange={onChangeDugaar} />
                    <Divider />
                  </Form.Item>
                  <Form.Item
                    label="Үйлдвэр"
                    name="maker"
                    rules={[
                      {
                        required: true,
                        message: "Үйлдвэр оруулна уу",
                      },
                    ]}
                  >
                    <Select onChange={onChangeUildver}>
                      {uildwer.map((item) => (
                        <Option
                          className="py-1"
                          key={item.value}
                          value={item.value}
                        >
                          {item.label}
                        </Option>
                      ))}
                    </Select>
                    <Divider />
                  </Form.Item>
                  <Form.Item
                    label="Загвар"
                    name="model"
                    rules={[
                      {
                        required: true,
                        message: "Загвар оруулна уу",
                      },
                    ]}
                  >
                    <Select onChange={onChangeZagwar}>
                      {zagwar.map((item) => (
                        <Option
                          className="py-1"
                          key={item.value}
                          value={item.value}
                        >
                          {item.label}
                        </Option>
                      ))}
                    </Select>
                    <Divider />
                  </Form.Item>
                  <Form.Item
                    label="Өнгө"
                    name="color"
                    rules={[
                      {
                        required: false,
                        message: "Өнгө оруулна уу",
                      },
                    ]}
                  >
                    <Select onChange={onChangeColor}>
                      {color.map((item) => (
                        <Option  key={item.value} value={item.label}>{item.label}</Option>
                      ))}
                    </Select>
                    <Divider />
                  </Form.Item>
                </Form>
              </Col>
              <Col span={14}>
                <Alert
                  message="Мэдэгдэл"
                  description="Түрээслэгдсэн зогсоолыг тээврийн хэрэгслийн мэдээлэлтэй тулган шалгах тохиолдолд байдаг тул Та тээврийн хэрэгслийн мэдээллийг үнэн зөв оруулна уу! "
                  type="warning"
                  showIcon
                />
              </Col>
            </Row>
          </Col>
          <Col span={2}></Col>
        </Row>
      </Modal>
      <Modal
        className="fullModal"
        title="Авто зогсоол"
        centered
        visible={isParkVisible}
        onOk={() => setIsParkVisible(false)}
        onCancel={() => setIsParkVisible(false)}
        width={1000}
      >
        <Row>
          <Steps
            size="small"
            style={{ fontSize: "15px", color: "blue" }}
            current={current}
          >
            {steps.map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
        </Row>
        {(steps[current].title === "Үндсэн мэдээлэл" && (
          <MainInfo
            setMainData={setMainData}
            form={form}
            onFinish={onFinish1234}
          />
        )) ||
          (steps[current].title === "Үндсэн зураг" && <MainImage />) ||
          (steps[current].title === "Зогсоолын зураг" && <SpaceImage />) ||
          (steps[current].title === "Зогсоолын үзүүлэлт" && (
            <SpaceIndicator />
          )) ||
          (steps[current].title === "Үнийн мэдээлэл" && <PriceInfo />) ||
          (steps[current].title === "Хөнгөлөлт" && <Discount />) ||
          (steps[current].title === "Түрээслэх өдрүүд" && <RentDate />)}

        <Row style={{ marginLeft: "100px" }}>
          <Col>
            {current > 0 && (
              <Button onClick={goBack} style={{ color: "blue" }}>
                Буцах
              </Button>
            )}
          </Col>
          <Col offset={20}>
            {current < steps.length - 1 && (
              <Button onClick={onClickContinue} className="buttonGo">
                Үргэлжлүүлэх
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button onClick={onSavedSpaceFormData} className="buttonGo">
                Дуусгах
              </Button>
            )}
          </Col>
        </Row>
      </Modal>
      );
    </ProfileLayout>
  );
};

export default Profile;
