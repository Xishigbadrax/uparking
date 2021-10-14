import {useState, useEffect} from 'react';
import React from 'react';
// import ProfileLayout from '@components/layouts/ProfileLayout';
import {callGet, callPost} from '@api/api';
import {Steps, Divider, Alert, Modal, Form, Button, Input, Select} from 'antd';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {Row, Col} from 'antd';
import {ArrowLeftOutlined} from '@ant-design/icons';
import MainInfo from '@components/registerSpace/mainInfo';
import MainImage from '@components/registerSpace/mainImage';
import SpaceImage from '@components/registerSpace/spaceImage';
import SpaceIndicator from '@components/registerSpace/spaceIndicator';
import PriceInfo from '@components/registerSpace/priceInfo';
import Discount from '@components/registerSpace/discount';
import RentDate from '@components/registerSpace/rentDate';

const {Step} = Steps;
const steps = [
  {
    title: 'Үндсэн мэдээлэл',
    content: 'Үндсэн мэдээлэл',
  },
  {
    title: 'Зогсоолын үзүүлэлт',
    content: 'Зогсоолын үзүүлэлт',
  },
  {
    title: 'Үндсэн зураг',
    content: 'Үндсэн зураг',
  },
  {
    title: 'Зогсоолын зураг',
    content: 'Зогсоолын зураг',
  },

  {
    title: 'Үнийн мэдээлэл',
    content: 'Үнийн мэдээлэл',
  },
  {
    title: 'Хөнгөлөлт',
    content: 'Хөнгөлөлт ',
  },
  {
    title: 'Түрээслэх өдрүүд',
    content: 'Түрээслэх өдрүүд',
  },
];

const Optional = () => {
  const [vehicles, setVehicles] = useState([]);
  const [uildwer, setUildwer] = useState([]);
  const [colors, setColor] = useState([]);
  const [isVehileVisible, setIsVehileVisible] = useState(false);
  const [formData, setFormdata] = useState({});
  const [zagwar, setZagwar] = useState([]);
  const [form] = Form.useForm();
  const [vehicleForm] = Form.useForm();
  const router = useRouter();

  const [imageSpaceNumber, setImageSpaceNUmbe] = useState();
  const [imageParkingGate, setImageParkingGate] = useState();
  const [imageParkingOverall, setImageParkingOverall] = useState();
  const [imageFromGate, setImageFromGate] = useState();
  const [isParkVisible, setIsParkVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [mainData, setMainData] = useState(null);
  const [residenceBlockId, setResidenceBlockId] = useState();
  const [parkId, setParkId] = useState(null);
  const [parkingSpaceId, setParkingSpaceId] = useState(null);
  const [weekSale, setweekSale] = useState(null);
  const [weekId, setweekId] = useState(null);
  const [weekDescription, setweekDescription] = useState();
  const [monthId, setmonthId] = useState(null);
  const [monthSale, setmonthSale] = useState(null);
  const [monthDescription, setMonthDescription] = useState();
  const [rentData, setRentData] = useState();

  const onFinish = ()=>{
    router.push('/park');
  };
  const handleCancel = () => {
    setIsVehileVisible(false);
  };
  const onFinishFailedVehile = (errorInfo) => {
  };
  const onChangeDugaar = (e) => {
    const dugar = e.target.value;
    setFormdata({...formData, vehicleNumber: dugar});
  };
  const onChangeUildver = async (e) => {
    const uildver = uildwer.find((item) => item.value === e);
    const model = await callGet(`/user/vehicle/model?maker=${uildver.label}`);
    setZagwar(model);
    setFormdata({...formData, maker: uildver.value});
  };
  const onChangeZagwar = (e) => {
    const selectZagwar = zagwar.find((item) => item.value === e);

    setFormdata({...formData, model: selectZagwar.value});
  };
  const onChangeColor = (e) => {
    const selectColor = colors.find((item) => item.label === e);
    // setSelectedColor(selectColor);
    setFormdata({...formData, color: selectColor});
  };
  const onFinishSale = () => {
  };
  const onchangeNewVehicle = () => {
    vehicleForm.setFieldsValue({
      vehicleNumber: null,
      maker: null,
      model: null,
      color: null,
    });
  };
  const getBase64 = (img, callback) =>{
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const handleOk = async () => {
    if (vehicleForm.validateFields()) {
      const a = vehicleForm.getFieldsValue();

      const res = await callPost('/user/vehicle', {
        vehicleNumber: a.vehicleNumber,
        maker: a.maker,
        color: a.color,
        model: a.model,
      });
      setIsVehileVisible(false);
    } else {
    }
    // setIsVehileVisible(false);
  };
  const onClickContinue = async () => {
    form.validateFields();
    const componentData = form.getFieldsValue();
    // Үндсэн мэдээллийн өгөгдлийг өгөгдлийн санруу
    if (current === 0) {
      const res = await callPost('/parkingfirst', mainData);
      setResidenceBlockId(mainData.residenceBlockId);
      if (res.status === 'success') {
        setCurrent(current + 1);
      }
    } else if (current === 1) {
      const second = await callGet(
        `/parkingsecond?parkingFloorId=${componentData.floorNumber}&residenceBlockId=${mainData.residenceBlockId}`,
      );
      setParkId(second.parkingId);
      setParkingSpaceId(mainData.parkingSpaceId);
      const res = await callPost('/parkingspace', {
        entranceLock: componentData.entranceLock,
        floorNumber: componentData.floorNumber,
        isNumbering: componentData.isNumbering,
        parkingSpaceId: parkingSpaceId,
        residenceBlockId: residenceBlockId,
        returnRoutes: componentData.returnRoutes[0],
        capacityId: componentData.capacityId,
        parkingId: parkId,
        typeId: componentData.typeId,
        typeOther: ' ',
      });
      if (res.status === 'success') {
        setCurrent(current + 1);
      };
    } else if (current === 2) {
      // Үндсэн зургийн мэдээллийг өгөгдлийн санруу бичих
      getBase64(componentData.imageParkingGate.file.originFileObj, (image2) =>
        setImageParkingGate(image2),
      );
      getBase64(
        componentData.imageParkingOverall.file.originFileObj,
        (image2) => {
          setImageParkingOverall(image2);
        },
      );
      const res = await callPost('/parkingspace/parkingimage', {
        imageParkingOverall: imageParkingOverall,
        imageParkingGate: imageParkingGate,
        parkingSpaceId: parkingSpaceId,
      });
      if (res.status === 'success') {
        setCurrent(current + 1);
      }
    } else if (current === 3) {
      getBase64(componentData.imageFromGate.file.originFileObj, (image2) => {
        setImageFromGate(image2.substring(24));
      });
      getBase64(componentData.imageSpaceNumber.file.originFileObj, (image2) => {
        setImageSpaceNUmbe(image2.substring(24));
      });
      const res = await callPost('/parkingspace/detail', {
        imageFromGate: imageFromGate,
        imageSpaceNumber: imageSpaceNumber,
        parkingSpaceId: parkingSpaceId,
      });
      if (res.status === 'success') {
        setCurrent(current + 1);
      }
    } else if (current === 4) {
      const data = await callGet('/parkingspace/timesplit');
      const array = [
        {
          dateSplitId: data.daySplit,
          priceForRenter: Number(componentData.daySplitWinterPrice),
          timeSplitId: [data.daySplit.id],
        },
        {
          dateSplitId: data.daySplit,
          priceForRenter: Number(componentData.daySplitSummerPrice),
          timeSplitId: [data.daySplit.id],
        },
        {
          dateSplitId: data.nightSplit,
          priceForRenter: Number(componentData.nightSplitWinterPrice),
          timeSplitId: [data.nightSplit.id],
        },
        {
          dateSplitId: data.nightSplit,
          priceForRenter: Number(componentData.nightSplitSummerPrice),
          timeSplitId: [data.nightSplit.id],
        },
        {
          dateSplitId: data.fullDaySplit,
          priceForRenter: Number(componentData.fullDaySplitWinterPrice),
          timeSplitId: [data.fullDaySplit.id],
        },
        {
          dateSplitId: data.fullDaySplit,
          priceForRenter: Number(componentData.fullDaySplitSummerPrice),
          timeSplitId: [data.fullDaySplit.id],
        },
      ];
      const formData = {
        hourlyPrice: Number(componentData.hourlyPrice),
        parkingSpaceId: parkingSpaceId,
        parkingSpacePriceInstance: array,
      };
      const res = await callPost('/parkingspace/price', formData);
      setCurrent(current + 1);
    } else if (current === 5) {
      const saleData = form.getFieldsValue();
      const res = await callGet('/division/salesplit');
      if (res && res.saleSplit) {
        res.saleSplit.forEach((c) => {
          if (c.code == 'WEEKLY_SALE') {
            setweekId(c.id);
            setweekSale(Number(saleData.weekSale));
            setweekDescription(c.description);
          }
          if (c.code == 'MONTHLY_SALE') {
            setmonthId(c.id);
            setmonthSale(Number(saleData.monthSale));
            setMonthDescription(c.description);
          }
        });
      }

      const ress = await callPost('/parkingspace/sale', {
        parkingSpaceId: parkingSpaceId,
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
      });
      if (!ress || ress === undefined) {
        showMessage(messageType.FAILED.type, ress.error);
        return true;
      } else {
        setCurrent(current + 1);
      }
    } else if (current === 6) {
    }
  };
  const onFinish123 = (values) => {};
  const goBack = () => {
    setCurrent(current - 1);
  };
  const onFinishSPace = (values) => {
  };

  useEffect(async () => {
    const data = await callGet('/user/vehicle/list');
    setVehicles(data);
    const uildwer = await callGet('/user/vehicle/maker');
    setUildwer(uildwer);
    const color = await callGet('/user/vehicle/color');

    setColor(color);
    // setFormdata({...formData, rfid: '12'});
  }, []);
  return (
    <div>
      <Row>
        <Col span={10} offset={2} style={{marginTop: '150px'}}>
          <Row>
            <Col style={{height: '400px'}}>
              <img src="/Nemelt.png"></img>
            </Col>
          </Row>
          <Row style={{marginTop: '30px'}}>
            <Col offset={2}>
              <Link href="/park/profile/verify">
                <img src="/Container.png" />
              </Link>
            </Col>
          </Row>
        </Col>
        <Col span={10} offset={1} style={{marginTop: '50px', height: '400px'}}>
          <Row>
            <Col span={16} offset={1}>
              <Steps size="small" style={{fontSize: '15px', marginTop: '50px'}} current={1}>
                <Step title="Үндсэн мэдээлэл" size="middle" />
                <Step title={<b>Нэмэлт мэдээлэл</b>}/>
              </Steps>
            </Col>
          </Row>
          <Row style={{marginTop: '30px'}}>
            <Col span={14} offset={1} style={{textAlign: 'justify'}} className="text-[#A2A4AA]">
                Та хаана ч хэзээ ч өөрийн зогсоолд тээврийн хэрэгсэлээ
                байршуулахыг хүсэж байвал тээврийн хэрэгслийн бүртгэлээ хийнэ
                үү.
            </Col>
          </Row>
          <Row>
            <Col offset={1} className="mt-8 text-[#A2A4AA]">
              <b>Тээврийн хэрэгсэл бүртгүүлэх</b>
            </Col>
          </Row>
          <Row>
            <Col offset={1}>
              { vehicles && vehicles.length > 0 ? vehicles.map((item) => (
                <div
                  key={item.value}
                  className="mt-4 width-auto  rounded flex shadow-sm"
                  style={{backgroundColor: 'white', width: '325px'}}
                >
                  <div className="mt-4 ml-4">
                    <img
                      src="/directions_car_24px.png"
                      height="20px "
                      width="20px"
                    ></img>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm">{item.label}</div>
                    <div className="text-base" style={{color: 'blue '}}>
                      {item.label}
                    </div>
                  </div>
                  <div className="ml-40 mt-2 ">
                    <Link href={`/teever/edit/${item.id}`}>
                      <img src="/mode_24px.png" />
                    </Link>
                  </div>
                </div>
              )):<div>nullll</div>}
              <div className="mt-4">

                <button onClick={() => {
                  onchangeNewVehicle(), setIsVehileVisible(true);
                }}>
                  <img src="/add.png" />
                </button>

              </div>
            </Col>
          </Row>
          <Row style={{marginTop: '30px'}}>
            <Col offset={1} span={14} style>
              <p style={{textAlign: 'justify'}} className="text-[#76809C]">
                Та өөрийн зогсоолыг илүү үр ашигтайгаар бусдад хуваалцахыг хүсэж
                байвал авто зогсоолын бүртгэлээ хийнэ үү.
              </p>
            </Col>
          </Row>
          <Row style={{marginTop: '20px'}}>
            <Col offset={1}>
              <div className="text-[#76809C]">
                <b>Авто зогсоол бүртгүүлэх</b>
              </div>
            </Col>
          </Row>
          <Row>
            <Col offset={1} style={{marginTop: '10px'}}>

              <button onClick={() => setIsParkVisible(true)}>
                <img src="/add.png" />
              </button>

            </Col>
          </Row>
          <Row style={{marginTop: '40px'}} >
            <Col offset={16}>
              <div className={'FinishButton flex mb-[64px]'} onClick={onFinish}>
                <button style={{paddingLeft: '20px', color: 'white'}}>
                  Дуусгах
                </button>
                <div style={{marginTop: '10px', marginLeft: '20px'}}>
                  <img src="/arrow_forward_24px.png" />
                </div>
              </div>
            </Col>
          </Row>

        </Col>
      </Row>

      <Modal
        className="fullModal "
        title="Тээврийн хэрэгсэл бүртгүүлэх"
        centered
        form={form}
        style={{minHeight: '800px', height: 'auto'}}
        visible={isVehileVisible}
        // okButtonProps={{
        //   form: 'vehile-edit-form',
        //   key: 'submit',
        //   htmlType: 'submit',
        // }}
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
            <div className={'titleV'}>
              <div className="topV">Тээврийн - мэдээлэл</div>
              <div className="bottomV">
                Тухайн хэсэгт зогсоолын байрлал, дугаарлалт харагдаж буй зураг
                хийхгүй
              </div>
            </div>
            <Row style={{marginTop: '100px'}}>
              <Col span={8}>
                <Form
                  className={'addVehicleForm'}
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
                        message: 'Улсын дугаар оруулна уу',
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
                        message: 'Үйлдвэр сонгоно уу',
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
                        message: 'Загвар сонгоно уу',
                      },
                    ]}
                  >
                    <Select onChange={onChangeZagwar}>
                      {zagwar.map((item) => (
                        <Select.Option key={item.value} value={item.value}>
                          {item.label}
                        </Select.Option>
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
                        message: 'Өнгө сонгоно уу?',
                      },
                    ]}
                  >
                    {colors.length > 0 ?
                      <Select onChange={onChangeColor}>
                        {colors.map((item) => (
                          <Select.Option key={item.value} value={item.value}>
                            {item.label}
                          </Select.Option>
                        ))}
                      </Select> :<div>xaxa</div>}
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
        style={{minHeight: '800px', height: 'auto'}}
        centered
        visible={isParkVisible}
        // onOk={() => setIsParkVisible(false)}
        onCancel={() => setIsParkVisible(false)}
        cancelButtonProps={{style: {display: 'none'}}}
        okButtonProps={{style: {display: 'none'}}}
        width={1000}
        footer={[
          <>
            {current > 0 && <Button onClick={goBack}>Буцах</Button>}</>,
          <>
            {current < steps.length - 0 && (
              <Button
                onClick={onClickContinue}
                type="primary"
                // className="buttonGo"
              >
                Үргэлжлүүлэх
              </Button>
            )}
            {/* {current === steps.length - 1 && (
              <Button onClick={onSavedSpaceFormData} className="buttonGo">
                Дуусгах
              </Button>
            )} */}
          </>,
        ]}
      >
        <Row width={1266}>
          <Col span={22} offset={1}>
            <Steps
              size="small"
              style={{fontSize: '15px', color: 'blue'}}
              current={current}
            >
              {steps.map((item) => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
          </Col>
        </Row>
        <Row style={{height: '580px'}}>
          <Col span={24}>
            {(steps[current].title === 'Үндсэн мэдээлэл' && (
              <MainInfo
                form={form}
                setMainData={setMainData}
                current={current}
                setCurrent={setCurrent}
                onFinish={onFinish123}
              />
            )) ||
              (steps[current].title === 'Үндсэн зураг' && (
                <MainImage form={form} />
              )) ||
              (steps[current].title === 'Зогсоолын зураг' && (
                <SpaceImage form={form} />
              )) ||
              (steps[current].title === 'Зогсоолын үзүүлэлт' && (
                <SpaceIndicator form={form} onFinish={onFinishSPace} />
              )) ||
              (steps[current].title === 'Үнийн мэдээлэл' && (
                <PriceInfo form={form} />
              )) ||
              (steps[current].title === 'Хөнгөлөлт' && (
                <Discount form={form} onFinish={onFinishSale} />
              )) ||
              (steps[current].title === 'Түрээслэх өдрүүд' && (
                <RentDate setRentData={setRentData} />
              ))}
          </Col>
        </Row>
        {/* <Row
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
            )}
          </Col>
        </Row> */}
      </Modal>

    </div>

  );
};
export default Optional;
