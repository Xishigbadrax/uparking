/* eslint-disable react/prop-types */
import {Row, Col, Button, Divider, Form, Input, Item, Upload, Spin, Select} from 'antd';
import {
  EditOutlined,
  LeftOutlined,
  RightOutlined,
  PlusOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import {useEffect, useState} from 'react';
import Image from 'next/image';
import {callGet, callPost} from '@api/api';
import PriceInfo from '@components/registerSpace/priceInfo';
// import {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
// } from 'react-google-maps';
import GoogleMapReact from 'google-map-react';
// import discount from '@components/registerSpace/discount';
const mainImage = [{
  id: 1,
  image: '/car.png',
},
{
  id: 2,
  image: '/car-1.png',
},
{
  id: 3,
  image: '/driver.png',
}];
const AnyReactComponent = ({text}) => (
  <div
    className={'locationBackground'}
    style={{marginTop: '-35px', marginLeft: '-27px'}}
  >
    <p
      style={{
        textAlign: 'center',
        color: 'white',
        fontSize: '16px',
      }}
    >
      <b>{text}</b>
    </p>
  </div>
);
// const getBase64=(img, callback)=> {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result));
//   reader.readAsDataURL(img);
// };
const beforeUpload = (file)=> {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 6;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};
const timeSplit = [
  {id: 1, name: 'Боломжтой'},
  {id: 2, name: 'Боломжгүй'},
];
// eslint-disable-next-line react/prop-types
const Edit = ({data}) => {
  const GOOGLE_API = process.env.NEXT_GOOGLE_API;
  // const router = useRouter();
  const [current, setCurrent] = useState(0);
  // const {id} = router.query;
  const [Mainvalue, setValue] = useState(false);
  const [spaceValue, setSpaceValue] = useState(false);
  const [editData, setEditData] = useState({});
  const [mainImageValue, setMainImageValue] = useState(false);
  const [priceValue, setPriceValue]=useState(false);
  const LoadIcon = <LoadingOutlined />;
  const [addressForm] = Form.useForm();
  const [uzuuleltForm] = Form.useForm();
  const [priceForm]= Form.useForm();
  const [saleForm]= Form.useForm();
  const [lat, setLatitude]=useState();
  const [lng, setLongitude]=useState();
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading]=useState(false);
  const [mainLoading, setMainLoading]= useState(false);
  const [loadingDiscount, setLoadingDiscount]= useState(false);
  const [loadingSale, setLoadingSale] = useState(false);
  const [spaceLoading, setSpaceLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [selectedPositionImage, setSelectedResidenceSideImage] = useState();
  // const [selectedDirectionImage, setSelectedMainImage] = useState();
  // const [selectedNumberingImage, setSelectedDoorExitImage] = useState();
  // eslint-disable-next-line no-unused-vars
  const [selectResidenceEXitImage, setSelectedResidenceExitImage] = useState();
  // eslint-disable-next-line no-unused-vars
  const [loadingPosition, setLoadingPosition] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [loadingDirect, setLoadingDirect] = useState(false);
  const [aimag, setAimag]= useState([]);
  const [selectedAimag, setSelectedAimag] = useState();
  const [sum, setSum]= useState([]);
  const [selectedSum, setSelectedSum] = useState();
  const [section, setSection]= useState([]);
  const [mainData, setMainData] = useState({
    provinceId: data.provinceId,
    districtId: data.districtId,
    sectionId: data.sectionId,
    residenceBlockId: data.residenceBlockId,
    residenceBlockNumber: data.residenceBlockNumber,
    parkingSpaceId: data.id,
    parkingGateNumber: data.parkingGateNumber,
    parkingSpaceGarageNumber: data.parkingSpaceGarageNumber,
    residenceId: data.residenceId ?data.residenceId : 0,
    residenceName: data.residenceName,
    latitude: data.lat,
    longitude: data.lng,
    capacityId: data.capacityId,
    entranceLock: data.entranceLockId,
    isNumbering: data.isNumberingId,
    floorNumber: data.floorNumberId,
    returnRoutes: data.returnRoutesId,
    typeId: data.typeId,
    typeOther: data.typeOther,
  });
  // eslint-disable-next-line no-unused-vars
  const [selectedSection, setSelectedSection] = useState();
  const [residenceList, setResidence] = useState([]);
  const [selectedResidence, setSelectedResidence] = useState();
  const [residenceBLockList, setResidenceBlockList]= useState([]);
  // Зогсоолын үзүүлэлтийн мэдээлэл  хадгалах State
  const [spaceSizeData, setSpaceSizeData] = useState([]);
  const [entranceData, setEncranceData] = useState([]);
  const [parkingData, setParkingData] = useState([]);
  const [spaceTypeData, setSpaceTypeData] = useState([]);
  const [routeData, setRouteData] = useState([]);
  const [floorData, setFloorData] = useState([]);
  const [priceArray, setPriceArray]= useState([]);
  const [discountValue, setDiscountValue]=useState(false);

  // eslint-disable-next-line no-unused-vars
  const [weekData, setWeekData] = useState();
  // eslint-disable-next-line no-unused-vars
  const [checked, setChecked] = useState();

  const [mondayMorning, setmondayMorning] = useState('Боломжтой');
  const [tuesdayMorning, settuesdayMorning] = useState('Боломжтой');
  const [wednesdayMorning, setwednesdayMorning] = useState('Боломжтой');
  const [thursdayMorning, setthursdayMorning] = useState('Боломжтой');
  const [fridayMorning, setfridayMorning] = useState('Боломжтой');
  const [saturdayMorning, setsaturdayMorning] = useState('Боломжтой');
  const [sundayMorning, setsundayMorning] = useState('Боломжтой');
  // eslint-disable-next-line no-unused-vars
  const [mondayNight, setondayNight] = useState('Боломжтой');
  const [tuesdayNight, settuesdayNight] = useState('Боломжтой');
  const [wednesdayNight, setwednesdayNight] = useState('Боломжтой');
  const [thursdayNight, setthursdayNight] = useState('Боломжтой');
  const [fridayNight, setfridayNight] = useState('Боломжтой');
  const [saturdayNight, setsaturdayNight] = useState('Боломжтой');
  const [sundayNight, setsundayNight] = useState('Боломжтой');
  useEffect(async ()=>{
    const aimags=await callGet('/address/aimag');
    setAimag(aimags);

    const spaceSize = await callGet('/reference/list/test?type=SPACE_TYPE');
    setSpaceSizeData(spaceSize);
    const parking = await callGet('/reference/list/test?type=SPACE_SIGN');
    setParkingData(parking);
    const entranceLock = await callGet(
      '/reference/list/test?type=ENTRANCE_LOCK',
    );
    setEncranceData(entranceLock);
    const spaceType = await callGet('/reference/list/test?type=SPACE_CAPACITY');
    setSpaceTypeData(spaceType);
    const route = await callGet('/reference/list/test?type=RETURN_ROUTE');
    setRouteData(route);
    const floor = await callGet('/reference/list/test?type=FLOOR_NUMBER');
    setFloorData(floor);
    setEditData(data);
    console.log(data);
    console.log(editData);
    setLatitude(editData.lat);
    setLongitude(editData.lng);
    console.log('--------------->mainData--->', mainData);
    // eslint-disable-next-line react/prop-types
    setPriceArray(data.priceList);
    addressForm.setFieldsValue({
      // eslint-disable-next-line react/prop-types
      provinceId: data.provinceLabel,
      // eslint-disable-next-line react/prop-types
      districtId: data.districtLabel,
      sectionId: data.sectionLabel,
      parkingGateNumber: data.parkingGateNumber,
      residenceName: data.residenceName,
      parkingSpaceId: data.parkingSpaceId ? data.parkingSpaceId :null,
      parkingSpaceGarageNumber: data.parkingSpaceGarageNumber,
      residenceBlockNumber: data.residenceBlockNumber,
      uparkingNumber: data.uparkingNumber,
    });
    uzuuleltForm.setFieldsValue({
      floorNumberId: data.floorNumberLabel!==null ? data.floorNumberLabel:null,
      entranceLock: data.entranceLockLabel !==null ? data.entranceLockLabel:null,
      isNumbering: data.isNumberingLabel !==null? data.isNumberingLabel :null,
      capacityId: data.capacityLabel!==null ? data.capacityLabel:null,
      typeId: data.typeLabel!==null ?data.typeLabel:null,
      returnRoutes: data.returnRoutesLabel !==null?data.returnRoutesLabel:null,
      typeOther: data.typeOther,
    });
  }, []);
  const onChangeAimag = async (e)=>{
    const value = aimag.find((item)=>item.label===e);
    const sum = await callGet(`/address/sum/${value.value}`);
    setSum(sum);
    setSelectedAimag(value.value);
    setMainData({...mainData, provinceId: value.value});
  };
  const onChangeSum = async (e)=>{
    const section = await callGet(`/address/khoroo/${e}`);
    setSection(section);
    setMainData({...mainData, districtId: e});
    setSelectedSum(e);
  };
  const onChangeSection = async (e)=>{
    setSelectedSection(e);
    console.log(e);
    setMainData({...mainData, sectionId: e});
    const residence = await callGet(`/address/residence?districtId=${selectedSum}&provinceId=${selectedAimag}&sectionId=${e}`);
    setResidence(residence);
  };
  const onChangeResidence = async (e)=>{
    console.log(e);
    setMainData({...mainData, residenceId: e});
    setSelectedResidence(e);
    const residenceBlock = await callGet(`/address/residenceblock?residenceId=${e}`);
    console.log(residenceBlock);
    setResidenceBlockList(residenceBlock);
  };
  const onchangeInputResidenceName=(e)=>{
    setMainData({...mainData, residenceName: e.target.value});
    console.log(e.target.value);
  };
  const onChangeInputResidenceNumber =(e)=>{
    setMainData({...mainData, residenceBlockNumber: e.target.value});
    console.log(e.target.value);
  };
  const onChangeParkingGateNumber =(e)=>{
    setMainData({...mainData, parkingGateNumber: e.target.value});
    console.log(e.target.value);
  };
  const changeMainValue = (e) => {
    setMainLoading(true);
    setMainImageValue(true);
  };
  const onMapClick = (e)=>{
    setLongitude(e.lng);
    setLatitude(e.lat);
    console.log(e);
  };
  const changeMaindata = (e) => {
    setMainLoading(true);
    setValue(true);
    setMainLoading(false);
  };
  const changeSpaceData = (e) => {
    setSpaceLoading(true);
    + setSpaceValue(true);
    setSpaceLoading(false);
  };

  const OnSaveAddressData = async (e) => {
    console.log(addressForm.getFieldsValue());
    console.log(mainData);
    const res = await callPost('/parkingspace/update/1', mainData);
    console.log(res);
    const gg = await callGet(`parkingspace/update/1?parkingSpaceId=${data.id}`);
    console.log(gg);

    setValue(false);
  };
  const spaceDataSave = (e) => {
    setSpaceValue(false);
  };
  const onChangeFloorNumber = (e)=>{
    console.log(e);
  };
  const addCurrent = (e) => {
    SSS;
    setCurrent(current + 1);
  };
  const divideCurrent = (e) => {
    setCurrent(current - 1);
  }; S;
  const onsaveMainImage = () => {
    setMainImageValue(false);
  };
  const changePriceValue = ()=>{
    setLoadingSale(true);
    setPriceValue(true);
    setLoadingSale(false);
  };
  const onSavePriceData =()=>{
    setLoading(true);
    setPriceValue(false);
    setLoading(false);
  };
  const changeDiscountValue = async ()=>{
    setDiscountValue(true);
    // eslint-disable-next-line react/prop-types
    const discountValue = await callGet(`/parkingspace/update/6?parkingSpaceId=${data.parkingId}`);
    console.log(discountValue);
    setLoading(false);
  };
  const onSaveDiscountData = (e)=>{
    setLoadingDiscount(true);
    saleForm.validateFields();
    console.log(saleForm.getFieldValue());
    setLoadingDiscount(false);
  };
  const onChangeMonthSale = (e) =>{
    console.log(e.target.value);
  };

  const onFinish = (e) => {
    console.log('xaaxaa');
  };
  return (
    <div>
      <Row
        style={{
          fontSize: '20px',
        }}
      >
        Авто зогсоол бүртгүүлэх
      </Row>
      <div >
        <Row>
          <Col span={6}offset={1}>
            <p
              style={{
                color: 'blue',
                fontSize: '17px',
                marginTop: '50px',
              }}
            >
              <b>Үндсэн мэдээлэл</b>
              <p style={{color: 'gray', fontSize: '12px'}}>Алхам 1/7</p>
            </p>
          </Col>
          <Col style={{marginTop: '50px '}} span={2} offset={14}>
            <Button
              className='editSpaceDataButton'
              onClick={changeMaindata}
              title="Засах"
              style={{borderRadius: '10px'}}
              icon={<EditOutlined />}
              shape="rounded"
            >
              засах
            </Button>
          </Col>
        </Row>
        <Divider />
        <Spin spinning={mainLoading}>
          {Mainvalue ? (
            <Row style={{padding: '30px'}}>
              <Col span={10}>
                <Form
                  form={addressForm}
                  onFinish={onFinish}
                  labelCol={{span: 10}}
                  wrapperCol={{span: 10}}
                >
                  <Form.Item label="Аймаг,Хот*" name="provinceId"
                  >
                    <Select onChange={onChangeAimag} >
                      {aimag.map((item)=>(
                        <Select.Option key={item.value} value={item.label}>
                          {item.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item label="Сум,Дүүрэг *" name="districtId">
                    <Select onChange={onChangeSum}>
                      {sum.map((item)=>(
                        <Select.Option key={item.value} value={item.value}>
                          {item.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item label="Хороо Баг *" name="sectionId">
                    <Select onChange={onChangeSection}>
                      {section.map((item)=>(
                        <Select.Option key={item.value} value={item.value}>
                          {item.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item label="Байрны нэр*" name= "residenceName">
                    <Select onChange={onChangeResidence}>
                      {residenceList.map((item)=>(
                        <Select.Option key={item.label} value={item.value}>
                          {item.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  {selectedResidence === 0 ?
                    (
                      <div>
                        <Form.Item label="Байрны нэр" name="residenceName">
                          <Input onChange={onchangeInputResidenceName}/>
                        </Form.Item>
                        <Form.Item label ="Байрны дугаар" name="residenceBlockNumber">
                          <Input onChange={onChangeInputResidenceNumber}/>
                        </Form.Item>
                      </div>
                    ):(<Form.Item label="Байрны дугаар*"name="residenceBlockNumber">
                      <Select onChange={onChangeResidence}>
                        {residenceBLockList.map((item)=>(
                          <Select.Option key={item.label} value={item.value}>
                            {item.label}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>)}
                  <Form.Item label="Хаалганы тоо*" name="parkingGateNumber" >
                    <Input onChange={onChangeParkingGateNumber}/>
                  </Form.Item>
                  <Form.Item label="Зогсоолын дугаар*" name="uparkingNumber">
                    <Input disabled />
                  </Form.Item>
                  <Form.Item>
                    <Button onClick={OnSaveAddressData}>Хадгалах</Button>
                  </Form.Item>
                </Form>
              </Col>
              <Col span={12} style={{height: '300px', width: '500px'}}>
                <GoogleMapReact
                  style={{height: '250px', width: '500px'}}
                  bootstrapURLKeys={{key: GOOGLE_API}}
                  defaultCenter={{lat: 47.886398, lng: 106.905746}}
                  defaultZoom={16}
                  onClick={onMapClick}
                >
                  <AnyReactComponent
                    lat={lat}
                    lng={lng}
                    text="энд"
                  />
                </GoogleMapReact>
              </Col>
            </Row>
          ) : (
            <Row style={{padding: '30px'}}>
              <Col style={{lineHeight: '40px', color: '#647189'}} span={5} offset={1} >
                <p>Хот,Аймаг *</p>
                <p>Дүүрэг ,Сум *</p>
                <p>Хороо ,Баг*</p>
                <p>Байрны нэр </p>
                <p>Байрны дугаар</p>
                <p>Хаалганы тоо</p>
                <p>Зогсоолын дугаар *</p>
              </Col>
              <Col style={{lineHeight: '40px', color: '#647189'}} span={5}>
                <p>{editData.provinceLabel !==null ? <p>{editData.provinceLabel}</p> :<p>null</p>}</p>
                <p>{editData.districtLabel ? <p>{data.districtLabel}</p> :<>null</> }</p>
                <p>{editData.sectionLabel ?editData.sectionLabel :<p>null</p>}</p>
                <p>{editData.residenceName ? editData.residenceName :<p>null</p>}</p>
                <p>{editData.residenceBlockNumber}</p>
                <p>{editData.parkingGateNumber}</p>
                <p>{editData.uparkingNumber}</p>
              </Col>
              <Col span={12}>
                <GoogleMapReact
                  style={{height: '250px', width: '500px'}}
                  bootstrapURLKeys={{key: GOOGLE_API}}
                  defaultCenter={{lat: 47.886398, lng: 106.905746}}
                  defaultZoom={16}
                >
                  <AnyReactComponent
                    lat={lat}
                    lng={lng}
                    text="энд"
                  />
                </GoogleMapReact>
              </Col>
            </Row>
          )}
        </Spin>
      </div>
      {/* Зогсоолын үзүүлэлтийн мэдээлэл шинэчлэх*/}
      <div>
        <Spin spinning={spaceLoading}>
          <Row>
            <Col span={6} offset={1}>
              <p
                style={{
                  color: 'blue',
                  fontSize: '17px',
                  marginTop: '50px',
                }}
              >
                <b>Зогсоолын үзүүлэлт</b>
                <p style={{color: 'gray', fontSize: '12px'}}>Алхам 2/7</p>
              </p>
            </Col>
            <Col style={{marginTop: '50px '}} span={2} offset={14} >
              <Button
                onClick={changeSpaceData}
                title="Засах"
                className='editSpaceDataButton'
                style={{borderRadius: '10px'}}
                icon={<EditOutlined style={{fontSize: '12px'}} />}
                shape="rounded"
              >
              засах
              </Button>
            </Col>
          </Row>
          <Divider />
          {spaceValue ? (
            <div style={{padding: '30px'}}>
              <Col span={10} >
                <Form
                  form={uzuuleltForm}
                  onFinish={onFinish}
                  labelCol={{span: 10}}
                  wrapperCol={{span: 10}}
                >
                  <Form.Item label="Давхрын байршил*" name="floorNumberId">
                    <Select onChang={onChangeFloorNumber} >
                      {floorData.map((item)=>(
                        <Select.Option key={item.value}>
                          <div style={{display: 'flex'}}>
                            <div>
                              <img
                                src={'https://uparking.mn' + item.image}
                                height="20px"
                                width="24px" style={{marginTop: '3px'}}
                              ></img>
                            </div>
                            <p style={{fontSize: '12px', marginLeft: '10px'}}>
                              {item.label}
                            </p>
                          </div>
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item label="Орох хаалга" name="entranceLock">
                    <Select
                      placeholder="Зогсоолын орох хаалга /Хэрхэн нэвтрэх/"
                    // onChange={onChangeEntranceLock}
                    >
                      {entranceData.map((item) => (
                        <Select.Option
                          key={item.value}
                        >
                          <div style={{display: 'flex'}}>
                            <div>
                              <img
                                src={'https://uparking.mn' + item.image}
                                height="20px"
                                width="40px"
                              ></img>
                            </div>
                            {item.label}
                            <p style={{fontSize: '12px'}}></p>
                          </div>
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item label="Дугаарын тэмдэглэгээ*" name="isNumbering">
                    <Select>
                      {parkingData.map((item) => (
                        <Select.Option
                          key={item.value}
                        >
                          <div style={{display: 'flex'}}>
                            <div>
                              <img
                                src={'https://uparking.mn' + item.image}
                                height="20px"
                                width="20px"
                              ></img>
                            </div>
                            {item.label}
                            <p style={{fontSize: '12px'}}></p>
                          </div>
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item label="Хэмжээ*" name="capacityId">
                    <Select>
                      {spaceTypeData.map((item) => (
                        <Select.Option
                          key={item.value}
                        >
                          <div style={{display: 'flex'}}>
                            <div>
                              <img
                                src={'https://uparking.mn' + item.image}
                                height="20px"
                                width="20px"
                              ></img>
                            </div>
                            {item.label}
                            <p style={{fontSize: '12px'}}></p>
                          </div>
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item label="Төрөл*" name="typeId">
                    <Select>
                      {spaceSizeData.map((item) => (
                        <Select.Option
                          key={item.value}
                        >
                          <div style={{display: 'flex'}}>
                            <div>
                              <img
                                src={'https://uparking.mn' + item.image}
                                height="20px"
                                width="20px"
                              ></img>
                            </div>
                            {item.label}
                            <p style={{fontSize: '12px'}}></p>
                          </div>
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item label="Эргэх урсгал" name="returnRoutes">
                    <Select>
                      {routeData.map((item) => (
                        <Select.Option
                          key={item.value}
                        >
                          <div style={{display: 'flex'}}>
                            <div>
                              <img
                                src={'https://uparking.mn' + item.image}
                                height="20px"
                                width="20px"
                              ></img>
                            </div>
                            {item.label}
                            <p style={{fontSize: '12px'}}></p>
                          </div>
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item label="Нэмэлт тайлбар" name="typeOther">
                    <Input />
                  </Form.Item>
                  <Col offset={20} span={4}>
                    <Form.Item>
                      <Button onClick={spaceDataSave}>Save</Button>
                    </Form.Item>
                  </Col>
                </Form>
              </Col>
            </div>
          ) : (
            <div>
              <Row style={{padding: '30px', color: '#647189'}}>
                <Col style={{lineHeight: '40px'}} offset={1} span={5}>
                  <p>Давхрын байршил *</p>
                  <p>Орох хаалга</p>
                  <p>Дугаарын тэмдэглэгээ </p>
                  <p>Хэмжээ </p>
                  <p>Төрөл</p>
                  <p>Эргэх урсгал</p>
                  <p>Нэмэлт тайлбар</p>
                </Col>
                <Col style={{lineHeight: '40px', color: '#647189'}} span={5}>
                  <p>{data.floorNumberLabel? data.floorNumberLabel:<p style={{color: 'gray'}}>null</p>}</p>
                  <p>{data.entranceLockLabel?data.entranceLockLabel:<p>null</p>}</p>
                  <p>{data.isNumberingLabel ? data.isNumberingLabel :<p>null</p>}</p>
                  <p>{data.capacityLabel ?data.capacityLabel : <p>null</p>}</p>
                  <p>{data.typeLabel ? data.typeLabel :<p>null</p>}</p>
                  <p>{data.returnRoutesLabel ? data.returnRoutesLabel:<>null</>}</p>
                  <p>{data.typeOther? data.typeOther :<>null</>}</p>
                </Col>
                <Col></Col>
              </Row>
            </div>
          )}
        </Spin>
      </div>
      <div >
        <Row>
          <Col span={6} offset={1}>
            <p
              style={{
                color: 'blue',
                fontSize: '17px',
                marginTop: '50px',
              }}
            >
              <b>Үндсэн зураг </b>
              <p style={{color: 'gray', fontSize: '12px'}}>Алхам 3/7</p>
            </p>
          </Col>
          <Col style={{marginTop: '50px '}} span={2} offset={14}>
            <Button
              onClick={changeMainValue}
              title="Засах"
              className='editSpaceDataButton'
              style={{borderRadius: '10px'}}
              icon={<EditOutlined style={{fontSize: '12px'}} />}
              shape="rounded"
            >
              засах
            </Button>
          </Col>
        </Row>
        <Divider />
        <Row>
          {!mainImageValue ? (
            <Col style={{marginTop: '30px'}} offset={3}>

              <div key={Item}>
                <Image src={mainImage[current].image} height="400px" width='800px'/>
                <div
                  style={{
                    display: 'flex',
                    color: 'white',
                    marginTop: '-30px',
                    position: 'absolute',
                  }}
                >
                  <p>Зогсоолын орц гарцын зураг</p>
                  {current >= 1 && (
                    <LeftOutlined
                      onClick={divideCurrent}
                      style={{marginLeft: '10px'}}
                    />
                  )}
                  <p style={{marginLeft: '10px'}}>{current + 1}/3</p>
                  {current < 2 && (
                    <RightOutlined
                      onClick={addCurrent}
                      style={{fontSize: '12px', marginLeft: '10px'}}
                    />
                  )}
                </div>
              </div>
            </Col>
          ) : (
            <div>
              <Row style={{marginTop: '50px'}}>
                <Col offset={4}>
                  <p style={{fontSize: '15px'}}>Хотхоны ойр орчмын зураг</p>
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                  >
                    {selectedPositionImage ? (
                      <img
                        src={selectedPositionImage}
                        alt="avatar"
                        style={{width: '100%', height: '240px'}}
                      />
                    ) : (
                      <div>
                        {loadingPosition ? (
                          <Spin
                            indicator={LoadIcon}
                            tip="зургийг хуулж байна."
                          />
                        ) : (
                          <PlusOutlined
                            style={{
                              justifyContent: 'center',
                              alignContent: 'center',
                              backgroundColor: 'blue',
                              color: 'white',
                              height: '20px',
                              width: '20px',
                              borderRadius: '10px',
                            }}
                          />
                        )}
                      </div>
                    )}
                  </Upload>
                </Col>
                <Col offset={4}>
                  <p style={{fontSize: '15px'}}>Хотхоны орц гарцын зураг</p>
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    style={{width: '400px'}}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                  >
                    {selectResidenceEXitImage ? (
                      // <Image
                      //   src={selectResidenceEXitImage}
                      //   alt="avatar"
                      //   style={{height: '240px'}}
                      // />
                      <div>as</div>
                    ) : (
                      <div>
                        {loadingDirect ? (
                          <Spin
                            indicator={LoadIcon}
                            tip="зургийг хуулж байна."
                          />
                        ) : (
                          <PlusOutlined
                            style={{
                              justifyContent: 'center',
                              alignContent: 'center',
                              backgroundColor: 'blue',
                              color: 'white',
                              height: '20px',
                              width: '20px',
                              borderRadius: '10px',
                            }}
                          />
                        )}
                      </div>
                    )}
                  </Upload>
                </Col>
              </Row>
              <Button onClick={onsaveMainImage}>Svaeaee</Button>
            </div>
          )}
        </Row>
      </div>
      <div>
        <Row>
          <Col span={6} offset={1}>
            <p
              style={{
                color: 'blue',
                fontSize: '17px',
                marginTop: '50px',
              }}
            >
              <b>Зогсоолын зураг </b>
              <p style={{color: 'gray', fontSize: '12px'}}>Алхам 4/7</p>
            </p>
          </Col>
          <Col style={{marginTop: '50px '}} span={2} offset={14}>
            <Button
              style={{borderRadius: '10px'}}
              onClick={changeMainValue}
              title="Засах"
              className='editSpaceDataButton'
              icon={<EditOutlined style={{fontSize: '12px'}} />}
              shape="rounded"
            >
              засах
            </Button>
          </Col>
        </Row>
        <Divider />
        <Row>
          {!mainImageValue ? (
            <Col offset={3}>
              <div key={Item}>
                <Image src={mainImage[current].image} height="400px" width='800px'/>
                <div
                  style={{
                    display: 'flex',
                    color: 'white',
                    marginTop: '-30px',
                    position: 'absolute',
                  }}
                >
                  <p>Зогсоолын орц гарцын зураг</p>
                  {current >= 1 && (
                    <LeftOutlined
                      onClick={divideCurrent}
                      style={{marginLeft: '10px'}}
                    />
                  )}
                  <p style={{marginLeft: '10px'}}>{current + 1}/3</p>
                  {current < 2 && (
                    <RightOutlined
                      onClick={addCurrent}
                      style={{fontSize: '12px', marginLeft: '10px'}}
                    />
                  )}
                </div>
              </div>
            </Col>
          ) : (
            <div>
              <Row style={{marginTop: '50px'}}>
                <Col offset={4}>
                  <p style={{fontSize: '15px'}}>Хотхоны ойр орчмын зураг</p>
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                  >
                    {selectedPositionImage ? (
                      <img
                        src={selectedPositionImage}
                        alt="avatar"
                        style={{width: '100%', height: '240px'}}
                      />
                    ) : (
                      <div>
                        {loadingPosition ? (
                          <Spin
                            indicator={LoadIcon}
                            tip="зургийг хуулж байна."
                          />
                        ) : (
                          <PlusOutlined
                            style={{
                              justifyContent: 'center',
                              alignContent: 'center',
                              backgroundColor: 'blue',
                              color: 'white',
                              height: '20px',
                              width: '20px',
                              borderRadius: '10px',
                            }}
                          />
                        )}
                      </div>
                    )}
                  </Upload>
                </Col>
                <Col offset={4}>
                  <p style={{fontSize: '15px'}}>Хотхоны орц гарцын зураг</p>
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    style={{width: '400px'}}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                  >
                    {selectResidenceEXitImage ? (
                      // <Image
                      //   src={selectResidenceEXitImage}
                      //   alt="avatar"
                      //   style={{height: '240px'}}
                      // />
                      <div>as</div>
                    ) : (
                      <div>
                        {loadingDirect ? (
                          <Spin
                            indicator={LoadIcon}
                            tip="зургийг хуулж байна."
                          />
                        ) : (
                          <PlusOutlined
                            style={{
                              justifyContent: 'center',
                              alignContent: 'center',
                              backgroundColor: 'blue',
                              color: 'white',
                              height: '20px',
                              width: '20px',
                              borderRadius: '10px',
                            }}
                          />
                        )}
                      </div>
                    )}
                  </Upload>
                </Col>
              </Row>
              <Button onClick={onsaveMainImage}>Хадгалах</Button>
            </div>
          )}
        </Row>
      </div>
      <div style={{marginTop: '10px'}}>
        <Row>
          <Col span={6} offset={1}>
            <p
              style={{
                color: 'blue',
                fontSize: '17px',
              }}
            >
              <b>Зогсоолын үнэ </b>
              <p style={{color: 'gray', fontSize: '12px'}}>Алхам 5/7</p>
            </p>
          </Col>
          <Col span={2} offset={14}>
            <Button
              style={{borderRadius: '10px'}}
              onClick={changePriceValue}
              title="Засах"
              className='editSpaceDataButton'
              icon={<EditOutlined style={{fontSize: '12px'}} />}
              shape="rounded"
            >
              засах
            </Button>
          </Col>
        </Row>
        <Divider />
        <div>
          <Spin spinning={loadingSale}>
            {!priceValue ? (
              <Row>
                <Col span={10}>
                  {priceArray.map((item)=>(
                    <Row key={item.dateSplitId} width="100%" style={{lineHeight: '30px'}}>
                      {item.dateSplitId === 1 && (
                        <Col offset={4} span={21}>
                          <Row><p><b>Өвлийн цагийн түрээсийн үнэ | {item.startString} - {item.endString}</b></p></Row>
                          <Row>
                            <Col span={18}><p>Өдрийн цагаар түрээслэх үнэ <text style={{color: 'blue'}}>| 09:00 - 18:30</text></p></Col>
                            <Col offset={2}><p>{item.priceForRenter2}</p></Col></Row>
                          <Row>
                            <Col span={18}><p>Шөнийн цагаар түрээслэх үнэ <text style={{color: 'blue'}}>| 18:00 - 08:30</text></p></Col>
                            <Col offset={2}>{item.priceForRenter3}</Col></Row>
                          <Row>
                            <Col span={18}><p>Бүтэн өдрийн түрээслэх үнэ <text style={{color: 'blue'}}>| 9:00 - 08:30</text></p></Col>
                            <Col offset={2}>{item.priceForRenter1}</Col>
                          </Row>
                          <Row>
                            <Col span={18}><p>Цагийн түрээслэх үнэ <text style={{color: 'blue'}}>| 1 цаг</text></p></Col>
                            <Col offset={2}>{item.hourlyPrice}1000</Col>
                          </Row>
                        </Col>)}
                    </Row>
                  ))}
                </Col>
                <Col span={10}>
                  {priceArray.map((item)=>(
                    <Row key={item.dateSplitId} width="100%" style={{lineHeight: '30px'}}>
                      {item.dateSplitId === 2 && (
                        <Col offset={3} span={21}>
                          <Row><p><b>Зуны цагийн түрээсийн үнэ | {item.startString} - {item.endString}</b></p></Row>
                          <Row>
                            <Col span={18}><p>Өдрийн цагаар түрээслэх үнэ <text style={{color: 'blue'}}>| 09:00 - 18:30</text></p></Col>
                            <Col offset={2}><p>{item.priceForRenter2}</p></Col></Row>
                          <Row>
                            <Col span={18}><p>Шөнийн цагаар түрээслэх үнэ <text style={{color: 'blue'}}>| 18:00 - 08:30</text></p></Col>
                            <Col offset={2}>{item.priceForRenter3}</Col></Row>
                          <Row>
                            <Col span={18}><p>Бүтэн өдрийн түрээслэх үнэ <text style={{color: 'blue'}}>| 9:00 - 08:30</text></p></Col>
                            <Col offset={2}>{item.priceForRenter1}</Col>
                          </Row>
                          <Row>
                            <Col span={18}><p>Цагийн түрээслэх үнэ <text style={{color: 'blue'}}>| 1 цаг</text></p></Col>
                            <Col offset={2}>{item.hourlyPrice}1000</Col>
                          </Row>
                        </Col>)}
                    </Row>
                  ))}
                </Col>
              </Row>
            ):(<div><Row>
              <Col span={24}>
                <PriceInfo form={priceForm} priceArray={priceArray}/>
              </Col>
            </Row>
            <Row><Button onClick={onSavePriceData}>Хадгалах</Button></Row></div>)}
          </Spin>
        </div>
        <div style={{marginTop: '10px'}}>
          <Spin spinning={loadingDiscount}>
            <Row>
              <Col span={6} offset={1}>
                <p
                  style={{
                    color: 'blue',
                    fontSize: '17px',
                  }}
                >
                  <b>Зогсоолын хөнгөлөлт </b>
                  <p style={{color: 'gray', fontSize: '12px'}}>Алхам 6/7</p>
                </p>
              </Col>
              <Col span={2} offset={14}>
                <Button
                  style={{borderRadius: '10px'}}
                  onClick={changeDiscountValue}
                  title="Засах"
                  className='editSpaceDataButton'
                  icon={<EditOutlined style={{fontSize: '12px'}} />}
                  shape="rounded"
                >
              засах
                </Button>
              </Col>
            </Row>
            <Divider />
            {!discountValue ? (
              <Col offset={1} span={16}><Row><Col span={10}>7 хоногын захиалга - Хөнгөлөлтийн %</Col>
                <Col span={2} offset={4}>5%</Col></Row>
              <Row><Col span={10}>1 сарын захиалга - Хөнгөлөлтийн %</Col>
                <Col span={2} offset={4}>10%</Col></Row></Col>
            ):<Row>
              <Col span={20}>
                <Form form={saleForm}>
                  <Col offset={2} span={12}>
                    <Form.Item name="WeekSale" label="7 хоногийн хөнгөлөлтийн хувь" rules={[{required: true, message: 'Талбараа бүрэн бөглөнө үү?'}]}>
                      <Input/>
                    </Form.Item>
                  </Col>
                  <Col offset={2} span={12}>
                    <Form.Item name="monthSale" label="1 сарын  хөнгөлөлтийн хувь  " rules={[{required: true, message: 'Талбараа бүрэн бөглөнө үү?'}]}>
                      <Input onChange={onChangeMonthSale}/>
                    </Form.Item>
                  </Col>
                  <Form.Item>
                    <Button type={'primary'} onClick={onSaveDiscountData}>Хадгалах</Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>}
          </Spin>
        </div>
        <div>
          <Row>
            <Col span={6} offset={1}>
              <p
                style={{
                  color: 'blue',
                  fontSize: '17px',
                  marginTop: '50px',
                }}
              >
                <b>Түрээслэх өдөр</b>
                <p style={{color: 'gray', fontSize: '12px'}}>Алхам 6/7</p>
              </p>
            </Col>
            <Col style={{marginTop: '50px'}} span={2} offset={14}>
              <Button
                style={{borderRadius: '10px'}}
                onClick={changeDiscountValue}
                title="Засах"
                className='editSpaceDataButton'
                icon={<EditOutlined style={{fontSize: '12px'}} />}
                shape="rounded"
              >
              засах
              </Button>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col offset={1} span={2}>
              <Row> x</Row>
              <Row>
              Өдөр|08:00-18:30
              </Row>
              <Row >
              Шөнө|08:00-18:30
              </Row>
            </Col>
            <Col span={3} className={'pickWeekDayState'}>
              <Row style={{fontSize: '15px'}}>
              Ням
              </Row>
              <Row >
                <Select
                  onChange={(e) => {
                  // props.setRentData(weekData);
                    setsundayMorning(e), setChecked(2);
                  }}
                  value={sundayMorning}
                  className={
                    sundayMorning === 'Боломжтой' ? 'Surrender' : 'NotSurrender'
                  }
                >
                  {timeSplit.map((item) => (
                    <Select.Option key={item.id} value={item.name}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Row>
              <Row>
                <Select
                  onChange={(e) => {
                  // props.setRentData(weekData);
                    setsundayNight(e), setChecked(2);
                  }}
                  value={sundayNight}
                  className={
                    sundayNight === 'Боломжтой' ? 'Surrender' : 'NotSurrender'
                  }
                >
                  {timeSplit.map((item) => (
                    <Select.Option key={item.id} value={item.name}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Row>
            </Col>
            <Col span={3} className={'pickWeekDayState'}>
              <Row>Даваа</Row>
              <Row>
                <Select
                  onChange={(e) => {
                  // props.setRentData(weekData);
                    setmondayMorning(e), setChecked(2);
                  }}
                  value={mondayMorning}
                  className={
                    mondayMorning === 'Боломжтой' ? 'Surrender' : 'NotSurrender'
                  }
                >
                  {timeSplit.map((item) => (
                    <Select.Option key={item.id} value={item.name}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Row>
              <Row>
                <Select
                  onChange={(e) => {
                  // props.setRentData(weekData);
                    setmondayNight(e), setChecked(2);
                  }}
                  value={mondayNight}
                  className={
                    mondayNight === 'Боломжтой' ? 'Surrender' : 'NotSurrender'
                  }
                >
                  {timeSplit.map((item) => (
                    <Select.Option key={item.id} value={item.name}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Row>
            </Col>
            <Col span={3} className={'pickWeekDayState'}>
              <Row >Мягмар</Row>
              <Row>
                <Select
                  onChange={(e) => {
                  // props.setRentData(weekData);
                    settuesdayMorning(e), setChecked(2);
                  }}
                  value={tuesdayMorning}
                  className={
                    tuesdayMorning === 'Боломжтой' ? 'Surrender' : 'NotSurrender'
                  }
                >
                  {timeSplit.map((item) => (
                    <Select.Option key={item.id} value={item.name}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Row>
              <Row>
                <Select
                  onChange={(e) => {
                  // props.setRentData(weekData);
                    settuesdayNight(e), setChecked(2);
                  }}
                  value={tuesdayNight}
                  className={
                    tuesdayNight === 'Боломжтой' ? 'Surrender' : 'NotSurrender'
                  }
                >
                  {timeSplit.map((item) => (
                    <Select.Option key={item.id} value={item.name}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Row>
            </Col>
            <Col span={3} className={'pickWeekDayState'}>
              <Row>Лхагва</Row>
              <Row>
                <Select
                  onChange={(e) => {
                  // props.setRentData(weekData);
                    setwednesdayMorning(e), setChecked(2);
                  }}
                  value={wednesdayMorning}
                  className = {
                    wednesdayMorning === 'Боломжтой' ? 'Surrender' : 'NotSurrender'
                  }
                >
                  {timeSplit.map((item) => (
                    <Select.Option key={item.id} value={item.name}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Row>
              <Row >
                <Select
                  onChange={(e) => {
                  // props.setRentData(weekData);
                    setwednesdayNight(e), setChecked(2);
                  }}
                  value={wednesdayNight}
                  className={
                    wednesdayNight === 'Боломжтой' ? 'Surrender' : 'NotSurrender'
                  }
                >
                  {timeSplit.map((item) => (
                    <Select.Option key={item.id} value={item.name}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Row>
            </Col>
            <Col span={3} className={'pickWeekDayState'}>
              <Row >Пүрэв</Row>
              <Row>
                <Select
                  onChange={(e) => {
                  // props.setRentData(weekData);
                    setthursdayMorning(e), setChecked(2);
                  }}
                  value={thursdayMorning}
                  className={
                    thursdayMorning === 'Боломжтой' ? 'Surrender' : 'NotSurrender'
                  }
                >
                  {timeSplit.map((item) => (
                    <Select.Option key={item.id} value={item.name}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Row>
              <Row>
                <Select
                  onChange={(e) => {
                  // props.setRentData(weekData);
                    setthursdayNight(e), setChecked(2);
                  }}
                  value={thursdayNight}
                  className={
                    thursdayNight === 'Боломжтой' ? 'Surrender' : 'NotSurrender'
                  }
                >
                  {timeSplit.map((item) => (
                    <Select.Option key={item.id} value={item.name}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Row>
            </Col>
            <Col span={3} className={'pickWeekDayState'}>
              <Row >Баасан</Row>
              <Row >
                <Select
                  onChange={(e) => {
                  // props.setRentData(weekData);
                    setfridayMorning(e), setChecked(2);
                  }}
                  value={fridayMorning}
                  className={
                    fridayMorning === 'Боломжтой' ? 'Surrender' : 'NotSurrender'
                  }
                >
                  {timeSplit.map((item) => (
                    <Select.Option key={item.id} value={item.name}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Row>
              <Row >
                <Select
                  onChange={(e) => {
                  // props.setRentData(weekData);
                    setfridayNight(e), setChecked(2);
                  }}
                  value={fridayNight}
                  className={
                    fridayNight === 'Боломжтой' ? 'Surrender' : 'NotSurrender'
                  }
                >
                  {timeSplit.map((item) => (
                    <Select.Option key={item.id} value={item.name}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Row>
            </Col>
            <Col span={3} className={'pickWeekDayState'}>
              <Row >Бямба</Row>
              <Row >
                <Select
                  onChange={(e) => {
                  // props.setRentData(weekData);
                    setsaturdayMorning(e), setChecked(2);
                  }}
                  value={saturdayMorning}
                  className={
                    saturdayMorning === 'Боломжтой' ? 'Surrender' : 'NotSurrender'
                  }
                >
                  {timeSplit.map((item) => (
                    <Select.Option key={item.id} value={item.name}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Row>
              <Row>
                <Select
                  onChange={(e) => {
                  // props.setRentData(weekData);
                    setsaturdayNight(e), setChecked(1);
                  }}
                  value={saturdayNight}
                  className={
                    saturdayNight === 'Боломжтой' ? 'Surrender' : 'NotSurrender'
                  }
                >
                  {timeSplit.map((item) => (
                    <Select.Option key={item.id} value={item.name}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};
export default Edit;
