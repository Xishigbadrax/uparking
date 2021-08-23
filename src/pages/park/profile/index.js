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
import { useEffect } from "react";
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
    title: "Зогсоолын үзүүлэлт",
    content: "Зогсоолын үзүүлэлт",
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
    title: "Үнийн мэдээлэл",
    content: "Үнийн мэдээлэл",
  },
  {
    title: "Хөнгөлөлт",
    content: "Хөнгөлөлт ",
  },
  {
    title: "Түрээслэх өдрүүд",
    content: "Түрээслэх өдрүүд",
  },
];

const Profile = () => {
  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  const [formData, setFormdata] = useState({});
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
  const [current, setCurrent] = useState(6);

  const [isProfileNotEdit, setIsProfileNotEdit] = useState(true);
  const [isVehileVisible, setIsVehileVisible] = useState(false);
  const [isParkVisible, setIsParkVisible] = useState(false);
  const [isVehicleEditVisible, setIsVehicleEditVisible] = useState(false);
  const [imageSpaceNumber, setImageSpaceNUmbe] = useState();
  const [imageParkingGate, setImageParkingGate] = useState();
  const [imageParkingOverall, setImageParkingOverall] = useState();
  const [imageFromGate, setImageFromGate] = useState();
  const mainInfoRef = useRef(null);
  const [form] = Form.useForm();
  const [vehicleForm] = Form.useForm();
  const [vehicleEditForm] = Form.useForm();

  const { userdata } = useContext(Context);
  const [realData, setRealData] = useState("");
  const [mainData, setMainData] = useState(null);
  const [imageData, setImageData] = useState(null);

  const [spaceData, setSpaceData] = useState(null);
  const [vehicleId, setVehicleId] = useState();
  const [updatedData, setUpdatedData] = useState();
  const [id, setId] = useState(null);
  const [weekSale, setweekSale] = useState(null);
  const [weekId, setweekId] = useState(null);
  const [weekDescription, setweekDescription] = useState();
  const [monthId, setmonthId] = useState(null);
  const [monthSale, setmonthSale] = useState(null);
  const [monthDescription, setMonthDescription] = useState();
  const [parkingSpaceData, setParkingSpaceData] = useState({});
  useEffect(async () => {
    if (typeof userdata.firstName != "undefined") {
      setRealData(userdata);
    }
  }, [userdata]);
  const onFinish123 = (values) => {};

  const onFinishSPace = (values) => {
    console.log(values);
    console.log(form.getFieldsValue());
  };
  const onchangeNewVehicle = () => {
    vehicleForm.setFieldsValue({
      vehicleNumber: null,
      maker: null,
      model: null,
      color: null,
    });
  };
  const onChangeisVehicleEditVisible = async (a) => {
    const vehicleData = await callGet(`/user/vehicle?vehicleId=${a}`);
    vehicleEditForm.setFieldsValue({
      vehicleNumber: vehicleData.vehicleNumber,
      maker: vehicleData.maker,
      model: vehicleData.model,
      color: vehicleData.color,
    });
    setIsVehicleEditVisible(true);
  };
  useEffect(async () => {
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
    console.log(vehicleForm.validateFields());
    if (vehicleForm.validateFields()) {
      const a = vehicleForm.getFieldsValue();
      console.log("boloh l ymdaaa------->");
      const res = await callPost("/user/vehicle", {
        vehicleNumber: a.vehicleNumber,
        maker: a.maker,
        color: a.colorId,
        model: a.model,
      });
      console.log(res);
      setIsVehileVisible(false);
    } else {
    }
    // setIsVehileVisible(false);
  };
  const handleEditOk = async () => {
    const a = vehicleForm.getFieldsValue();
    console.log(a);
    console.log(vehicleId);
    const res = await callPost("/user/vehicle/update", {
      vehicleNumber: a.vehicleNumber,
      maker: a.maker,
      color: a.colorId,
      model: a.model,
      vehicleId: vehicleId,
    });
    setUpdatedData(res.data);
  };
  const handleCancel = () => {
    setIsVehileVisible(false);
  };
  const onFinish = (values) => {
    console.log("Undesen dataaa yma");
  };
  const onFinishSale = () => {
    console.log("sale Data--->");
  };

  const onClickContinue = async () => {
    const componentData = form.getFieldsValue();
    form.validateFields();
    //Үндсэн мэдээллийн өгөгдлийг өгөгдлийн санруу
    if (current === 0) {
      console.log(mainData, ",<---------main");
      const res = callPost("/parkingfirst", mainData);
      console.log(res);
      {
        (res.status === 200 || res.status === 201) & setCurrent(current + 1);
      }
    }
    //Үндсэн зургийн мэдээллийг өгөгдлийн санруу бичих
    if (current === 2) {
      getBase64(componentData.imageParkingGate.file.originFileObj, (image2) =>
        setImageParkingGate(image2)
      );
      getBase64(
        componentData.imageParkingOverall.file.originFileObj,
        (image2) => {
          setImageParkingOverall(image2), console.log(image2);
        }
      );
      const res = await callPost("/parkingspace/parkingimage", {
        imageParkingOverall: imageParkingOverall,
        imageParkingGate: imageParkingGate,
        parkingSpaceId: id,
      });
      console.log(res);
      setCurrent(current + 1);
    }
    //зогсоолын зургийн мэдээллийг өгөгдлийн санруу бичих
    if (current === 3) {
      getBase64(componentData.imageFromGate.file.originFileObj, (image2) => {
        setImageFromGate(image2.substring(24));
      });
      getBase64(componentData.imageSpaceNumber.file.originFileObj, (image2) => {
        setImageSpaceNUmbe(image2.substring(24)),
          console.log(image2.substring(24));
      });
      const res = await callPost("/parkingspace/detail", {
        imageFromGate: imageFromGate,
        imageSpaceNumber: imageSpaceNumber,
        parkingSpaceId: id,
      });
      if (
        res.status === 200 ||
        res.status === 201 ||
        res.status === "success"
      ) {
        setCurrent(current + 1);
      }
    }
    if (current === 1) {
      console.log(componentData);
      setParkingSpaceData({
        ...parkingSpaceData,
        entranceLock: componentData.entranceLock,
        floorNumber: componentData.floorNumber,
        isNumbering: componentData.isNumbering,
        parkingSpaceId: mainData.parkingSpaceId,
        residenceBlockId: mainData.residenceBlockId,
        returnRoutes: componentData.returnRoutes[0],
        capacityId: componentData.capacityId,
        typeId: componentData.typeId,
        parkingId: 220,
        typeOther: null,
      });
      const second = await callGet(
        `/parkingsecond?parkingFloorId=${componentData.floorNumber}&residenceBlockId=${mainData.residenceBlockId}`
      );
      console.log(second);
      const res = await callPost("/parkingspace", {
        entranceLock: componentData.entranceLock,
        floorNumber: componentData.floorNumber,
        isNumbering: componentData.isNumbering,
        parkingSpaceId: mainData.parkingSpaceId,
        residenceBlockId: mainData.residenceBlockId,
        returnRoutes: componentData.returnRoutes[0],
        capacityId: componentData.capacityId,
        typeId: componentData.typeId,
        typeOther: " ",
      });
      console.log(res);
      if (
        res.status === 200 ||
        res.status === 201 ||
        res.status === "success"
      ) {
        setCurrent(current + 1);
        setId(res.message);
        console.log(id);
      }
    }
    if (current === 4) {
      const data = await callGet("/parkingspace/timesplit");
      console.log(data);
      console.log(componentData);
      let array = [
        {
          dateSplitId: data.daySplit.winterId,
          timeSplitId: data.daySplit.id,
          priceForRenter: componentData.daySplitWinterPrice,
        },
        {
          dateSplitId: data.daySplit.summerId,
          timeSplitId: data.daySplit.id,
          priceForRenter: componentData.daySplitSummerPrice,
        },
        {
          dateSplitId: data.nightSplit.winterId,
          timeSplitId: data.nightSplit.id,
          priceForRenter: componentData.nightSplitWinterPrice,
        },
        {
          dateSplitId: data.nightSplit.summerId,
          timeSplitId: data.nightSplit.id,
          priceForRenter: componentData.nightSplitSummerPrice,
        },
        {
          dateSplitId: data.fullDaySplit.winterId,
          timeSplitId: [data.fullDaySplit.id],
          priceForRenter: componentData.fullDaySplitWinterPrice,
        },
        {
          dateSplitId: data.fullDaySplit.summerId,
          timeSplitId: [data.fullDaySplit.id],
          priceForRenter: componentData.fullDaySplitSummerPrice,
        },
      ];

      let formData = {
        hourlyPrice: Number(componentData.hourlyPrice),
        parkingSpaceId: id,
        parkingSpacePriceInstance: array,
      };
      console.log(formData);
      const res = await callPost(`/parkingspace/price`, formData);
      console.log(res);
    }
    if (current === 5) {
      const saleData = form.getFieldsValue();
      console.log(saleData);
      const res = await callGet("/division/salesplit");
      console.log(res);
      if (res && res.saleSplit) {
        res.saleSplit.forEach((c) => {
          if (c.code == "WEEKLY_SALE") {
            setweekId(c.id);
            setweekSale(Number(saleData.weekSale));
            setweekDescription(c.description);
          }
          if (c.code == "MONTHLY_SALE") {
            setmonthId(c.id);
            setmonthSale(Number(saleData.monthSale));
            setMonthDescription(c.description);
          }
        });
      }
      let formData = {
        parkingSpaceId: id,
        parkingSpaceSale: [
          {
            salePercent: weekSale,
            saleSplitId: weekId,
            saleSplitDescription: weekDescription,
          },
          {
            salePercent: monthSale,
            saleSplitId: monthId,
            saleSplitDescription: monthDescription,
          },
        ],
      };
      console.log(formData);
      if (formData) {
        const a = await callPost("/parkingspace/sale", {
          formData,
        });
        console.log(a);
      }
    }
  };

  const goBack = () => {
    console.log("Bye");
    setCurrent(current - 1);
  };
  const onFinishFailedVehile = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // console.log(userdata.firstName)
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
            {realData != "" ? (
              <Form
                className="profileForm"
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={realData}
              >
                <Form.Item
                  label="Овог:"
                  name="lastName"
                  rules={[{ required: true, message: "Овог оруулна уу" }]}
                >
                  <Input disabled={isProfileNotEdit} />
                </Form.Item>
                <Form.Item
                  label="Нэр:"
                  name="firstName"
                  rules={[{ required: true, message: "Нэр оруулна уу" }]}
                >
                  <Input disabled={isProfileNotEdit} />
                </Form.Item>
                <Form.Item
                  label="Регистрийн дугаар:"
                  name="registerNumber"
                  rules={[
                    { required: true, message: "Регистрийн дугаар оруулна уу" },
                  ]}
                >
                  <Input disabled={isProfileNotEdit} />
                </Form.Item>
                <Form.Item
                  label="Утасны дугаар:"
                  name="phoneNumber"
                  rules={[
                    { required: true, message: "Утасны дугаар оруулна уу" },
                  ]}
                >
                  <Input disabled={isProfileNotEdit} />
                </Form.Item>
                <Form.Item
                  label="И-мэйл хаяг:"
                  name="email"
                  rules={[
                    { required: true, message: "И-мэйл хаяг оруулна уу" },
                  ]}
                >
                  <Input disabled={isProfileNotEdit} />
                </Form.Item>
                <Form.Item
                  label="Facebook:"
                  name="fbLink"
                  rules={[{ required: false, message: "Facebook оруулна уу" }]}
                >
                  <Input disabled={isProfileNotEdit} />
                </Form.Item>

                <Form.Item label="Хэрэглэгчийн дугаар:" name="id">
                  <Input disabled={isProfileNotEdit} />
                </Form.Item>

                {!isProfileNotEdit && (
                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                      Хадгалах
                    </Button>
                  </Form.Item>
                )}
              </Form>
            ) : null}
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
                    <div
                      onClick={(key) => {
                        setVehicleId(item.value);
                        onChangeisVehicleEditVisible(item.value);
                      }}
                    >
                      <img src="/mode_24px.png" />
                    </div>
                  </div>
                </div>
              ))}
            </Row>
            <Row>
              <Button
                type="dashed"
                block
                onClick={() => {
                  onchangeNewVehicle(), setIsVehileVisible(true);
                }}
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
                <Col key={item.value} offset={2}>
                  АЗН
                </Col>;
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
        form={form}
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
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            onClick={(values) => handleOk(values)}
          >
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
            <Row style={{ marginTop: "100px" }}>
              <Col span={8}>
                <Form
                  className={`addVehicleForm`}
                  form={vehicleForm}
                  layout="vertical"
                  name="basic"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailedVehile}
                >
                  <Form.Item
                    label="Улсын дугаар"
                    name="vehicleNumber"
                    // defaultValue={vehicleEditData.vehicleNumber}
                    rules={[
                      {
                        required: true,
                        message: "Улсын дугаар оруулна уу",
                      },
                    ]}
                  >
                    <Input onChange={onChangeDugaar} />
                  </Form.Item>
                  <Divider />
                  <Form.Item
                    label="Үйлдвэр"
                    name="maker"
                    rules={[
                      {
                        required: true,
                        message: "Үйлдвэр сонгоно уу",
                      },
                    ]}
                  >
                    <Select onChange={onChangeUildver}>
                      {uildwer.map((item) => (
                        <Select.Option key={item.value} value={item.value}>
                          {item.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Divider />
                  <Form.Item
                    label="Загвар"
                    name="model"
                    rules={[
                      {
                        required: true,
                        message: "Загвар сонгоно уу",
                      },
                    ]}
                  >
                    <Select onChange={onChangeZagwar}>
                      {zagwar.map((item) => (
                        <Option key={item.value} value={item.value}>
                          {item.label}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Divider />
                  <Form.Item
                    label="Өнгө"
                    name="color"
                    rules={[
                      {
                        required: true,
                        message: "Өнгө сонгоно уу?",
                      },
                    ]}
                  >
                    <Select onChange={onChangeColor}>
                      {color.map((item) => (
                        <Option key={item.value} value={item.label}>
                          {item.label}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Divider />
                </Form>
              </Col>
              <Col span={12} offset={1}>
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
      {/*Машины мэдээлэл шинэчлэх Modal */}
      <Modal
        className="fullModal "
        title="Тээврийн хэрэгсэл шинэчлэх"
        centered
        form={vehicleEditForm}
        style={{ minHeight: "800px", height: "auto" }}
        visible={isVehicleEditVisible}
        okButtonProps={{
          form: "vehile-edit-form",
          key: "submit",
          htmlType: "submit",
        }}
        onOk={() => setIsVehicleEditVisible(false)}
        onCancel={() => setIsVehicleEditVisible(false)}
        width={1000}
        footer={[
          <Button key="back" type="link" onClick={handleCancel}>
            <ArrowLeftOutlined /> Буцах
          </Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            onClick={(values) => handleEditOk(values)}
          >
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
            <Row style={{ marginTop: "100px" }}>
              <Col span={8}>
                <Form
                  className={`addVehicleForm`}
                  form={vehicleEditForm}
                  layout="vertical"
                  name="basic"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    label="Улсын дугаар"
                    name="vehicleNumber"
                    rules={[
                      {
                        required: true,
                        message: "Улсын дугаар оруулна уу",
                      },
                    ]}
                  >
                    <Input onChange={onChangeDugaar} />
                  </Form.Item>
                  <Divider />
                  <Form.Item
                    label="Үйлдвэр"
                    name="maker"
                    rules={[
                      {
                        required: true,
                        message: "Үйлдвэр сонгоно уу",
                      },
                    ]}
                  >
                    <Select onChange={onChangeUildver}>
                      {uildwer.map((item) => (
                        <Select.Option key={item.value} value={item.value}>
                          {item.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Divider />
                  <Form.Item
                    label="Загвар"
                    name="model"
                    rules={[
                      {
                        required: true,
                        message: "Загвар сонгоно уу",
                      },
                    ]}
                  >
                    <Select onChange={onChangeZagwar}>
                      {zagwar.map((item) => (
                        <Option key={item.value} value={item.value}>
                          {item.label}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Divider />
                  <Form.Item
                    label="Өнгө"
                    name="color"
                    rules={[
                      {
                        required: true,
                        message: "Өнгө сонгоно уу?",
                      },
                    ]}
                  >
                    <Select onChange={onChangeColor}>
                      {color.map((item) => (
                        <Option key={item.value} value={item.label}>
                          {item.label}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Divider />
                </Form>
              </Col>
              <Col span={12} offset={1}>
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
        // onOk={() => setIsParkVisible(false)}
        onCancel={() => setIsParkVisible(false)}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        width={1000}
        footer={
          ((
            <div>
              {current > 0 && (
                <Button
                  onClick={goBack}
                  style={{
                    color: "blue",
                    position: "absolute",
                  }}
                >
                  Буцах
                </Button>
              )}
            </div>
          ),
          (
            <div>
              {current < steps.length - 0 && (
                <Button onClick={onClickContinue} className="buttonGo">
                  Үргэлжлүүлэх
                </Button>
              )}
            </div>
          ))
        }
      >
        <Row width={1266}>
          <Col span={22} offset={1}>
            <Steps
              size="small"
              style={{ fontSize: "15px", color: "blue" }}
              current={current}
            >
              {steps.map((item) => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
          </Col>
        </Row>
        <Row style={{ height: "580px" }}>
          <Col span={24}>
            {(steps[current].title === "Үндсэн мэдээлэл" && (
              <MainInfo
                form={form}
                setMainData={setMainData}
                current={current}
                setCurrent={setCurrent}
                onFinish={onFinish123}
              />
            )) ||
              (steps[current].title === "Үндсэн зураг" && (
                <MainImage setImageData={setImageData} form={form} />
              )) ||
              (steps[current].title === "Зогсоолын зураг" && (
                <SpaceImage setSpaceData={setSpaceData} form={form} />
              )) ||
              (steps[current].title === "Зогсоолын үзүүлэлт" && (
                <SpaceIndicator form={form} onFinish={onFinishSPace} />
              )) ||
              (steps[current].title === "Үнийн мэдээлэл" && (
                <PriceInfo form={form} />
              )) ||
              (steps[current].title === "Хөнгөлөлт" && (
                <Discount form={form} onFinish={onFinishSale} />
              )) ||
              (steps[current].title === "Түрээслэх өдрүүд" && <RentDate />)}
          </Col>
        </Row>
        <Row
          style={{
            marginLeft: "100px",
            paddingBottom: "10px",
          }}
        >
          {/* <Col>
            {current > 0 && (
              <Button
                onClick={goBack}
                style={{
                  color: "blue",
                  position: "absolute",
                }}
              >
                Буцах
              </Button>
            )}
          </Col>
          <Col offset={20}>
            {current < steps.length - 0 && (
              <Button onClick={onClickContinue} className="buttonGo">
                Үргэлжлүүлэх
              </Button>
            )} */}
          {/* {current === steps.length - 1 && (
              <Button onClick={onSavedSpaceFormData} className="buttonGo">
                Дуусгах
              </Button>
            )} */}
          {/* </Col> */}
        </Row>
      </Modal>
      );
    </ProfileLayout>
  );
};

export default Profile;
