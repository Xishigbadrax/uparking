/* eslint-disable react/prop-types */
import {Row, Col, Button, Divider, Form, Input, Upload, Spin, Select, Carousel} from 'antd';
import {
  EditOutlined,
  // LeftOutlined,
  RedoOutlined,
  // RightOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import {useEffect, useState} from 'react';
import Image from 'next/image';
import {callGet, callPost} from '@api/api';
import PriceInfo from '@components/registerSpace/priceInfo';
import GoogleMapReact from 'google-map-react';
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
const getBase64=(img, callback)=> {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};
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
  console.log(data, 'dataaaaaaaaa');
  const GOOGLE_API = process.env.NEXT_GOOGLE_API;
  // const router = useRouter();
  // const [current, setCurrent] = useState(0);
  // const {id} = router.query;
  const [Mainvalue, setValue] = useState(false);
  const [spaceValue, setSpaceValue] = useState(false);
  const [editData, setEditData] = useState({});
  const [mainImageValue, setMainImageValue] = useState(false);
  const [spaceImage, setSpaceImage]= useState(false);
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
  const [MainImageSpin, setMainImageSpin] = useState(false);
  const [spaceImageSpin, setSpaceImageSpin] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [selectedPositionImage, setSelectedResidenceSideImage] = useState();
  const [selectedDirectionImage, setSelectedDirectionImage] = useState();
  const [selectedExitImage, setSelectedExitImage] = useState();
  const [imageFromGate, setImageFromGate]= useState();
  const [imageSpaceNumber, setImageSpaceNumber] = useState();
  // eslint-disable-next-line no-unused-vars
  const [selectResidenceEXitImage, setSelectedResidenceExitImage] = useState();
  const [imageParkingOverall, setImageParkingOverall]=useState();
  // eslint-disable-next-line no-unused-vars
  const [loadingPosition, setLoadingPosition] = useState(false);
  const [loadingExitImage, setLoadingExitImage] = useState(false);
  const [loadingExit, setLoadingExit] = useState(false);
  const [loadingOverall, setOverallLoading]=useState(false);
  const [loadingFromGate, setLoadingFromGate] = useState(false);
  const [loadingSpaceNumber, setLoadingSpaceNumber] =useState(false);
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
  // const [statusValue, setStatusValue]=useState('CANCELLED');
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
  const onChangeMainImageState = (e) => {
    setMainImageSpin(true);
    if (data.imageResidenceSurrounding) {
      setSelectedResidenceSideImage(`data:image/jpeg;base64,${data.imageResidenceSurrounding}`);
    }
    if (data.imageResidenceGate !==null) {
      setSelectedResidenceExitImage(`data:image/jpeg;base64,${data.imageResidenceGate}`);
    }
    if (data.imageParkingOverall) {
      setImageParkingOverall(`data:image/jpeg;base64,${data.imageParkingOverall}`);
    }
    setMainImageValue(true);
    setMainImageSpin(false);
  };
  const onChangeSpaceImageState =(e)=>{
    setSpaceImageSpin(true);
    if (data.imageFromGate) {
      setImageFromGate(`data:image/jpeg;base64,${data.imageFromGate}`);
    }
    if (data.imageSpaceNumber) {
      setImageSpaceNumber(`data:image/jpeg;base64,${data.imageSpaceNumber}`);
    }
    setSpaceImage(true);
    setSpaceImageSpin(false);
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
    setSpaceValue(true);
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
  {/* Үндсэн зургийн мэдээлэлтэй холбоотой STATE*/}
  const onsaveMainImage = () => {
    setMainImageValue(false);
  };
  {/* Хотхоны ой орчмын зураг оруулах хэсэг*/}
  const onChangeResidenceSideImage = (info)=>{
    if (info.file.status === 'uploading') {
      setLoadingPosition(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(
        info.file.originFileObj,
        (image3) => (
          console.log(image3),
          setLoadingPosition(false),
          setSelectedResidenceSideImage(image3)
        ),
      );
    }
  };
  {/* Хотхоны орц гарцын зураг оруулах хэсэг*/}
  const onChangeResidenceExitImage = (info) => {
    if (info.file.status === 'uploading') {
      setLoadingExit(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(
        info.file.originFileObj,
        (image2) => (
          setLoadingExit(false), setSelectedResidenceExitImage(image2)
        ),
      );
    }
  };
  {/* Зогсоолын хаалганы ,орох гарах хэсгийн зураг*/}
  const onChangeDoorExitImage =(info)=>{
    if (info.file.status === 'uploading') {
      setLoadingExitImage(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(
        info.file.originFileObj,
        (image3) => (
          console.log(image3),
          setLoadingExitImage(false),
          setSelectedExitImage(image3)
        ),
      );
    }
  };
  {/* ЗОгсоолын ерөнхий зураглал*/}
  const onChangeOverallImage = (info)=>{
    if (info.file.status === 'uploading') {
      setOverallLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(
        info.file.originFileObj,
        (image3) => (
          console.log(image3),
          setOverallLoading(false),
          setImageParkingOverall(image3)
        ),
      );
    }
  };
  const onChangeSpaceNumber = ()=>{
    if (info.file.status === 'uploading') {
      setLoadingSpaceNumber(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(
        info.file.originFileObj,
        (image3) => (
          console.log(image3),
          setLoadingSpaceNumber(false),
          setImageSpaceNumber(image3)
        ),
      );
    }
  };
  const onChangeFromGate = (info)=>{
    if (info.file.status === 'uploading') {
      setLoadingFromGate(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(
        info.file.originFileObj,
        (image3) => (
          console.log(image3),
          setLoadingFromGate(false),
          setImageFromGate(image3)
        ),
      );
    }
  };
  const onChangeDirectionImage =(info)=>{
    if (info.file.status === 'uploading') {
      setLoadingDirect(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(
        info.file.originFileObj,
        (image3) => (
          console.log(image3),
          setLoadingDirect(false),
          setSelectedDirectionImage(image3)
        ),
      );
    }
  };
  const onSaveSpaceImage = ()=>{
    setSpaceImage(false);
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

      >
        <Col span={10} offset={1} style={{
          fontSize: '20px',
          color: '#35446D',
          lineHeight: '24px',
          fontWeight: '700',
          fontStyle: 'Helvetica',
        }} >
        Авто зогсоол бүртгүүлэх
        </Col>
      </Row>
      <Row>
        <Col span={10} offset={1}>
          {data.requestStatusCode === 'PENDING' && < div style={{
            border: '1px solid #F8C40C',
            height: '64px',
            width: '475px',
            marginTop: '20px',
            display: 'flex',
            borderRadius: '8px'}}>
            <div style={{marginTop: '18px', marginLeft: '18px'}}>
              <Image src='/icons/timer_24px.png' height="24px" width='24px'/>
            </div>
            <div style={{color: '#F8C40C', marginTop: '10px', fontSize: '14px', lineHeight: '20px', fontWeight: '400', fontStyle: 'Roboto', textAlign: 'left', width: '415px', marginLeft: '10px'}}>
            Зогсоолын мэдээллийг шалгаж байна. Мэдээлэл баталгаажсаны дараа түрээсийн захиалга авах боломжтой.
            </div>
          </div>}
          {data.requestStatusCode === 'CANCELLED' && < div style={{
            border: '1px solid #C6231A',
            height: '64px',
            width: '475px',
            marginTop: '20px',
            display: 'flex',
            borderRadius: '8px'}}>
            <div style={{marginTop: '18px', marginLeft: '18px'}}>
              <InfoCircleOutlined style={{height: '24px', width: '24px'}} />
            </div>
            <div style={{color: '#C6231A', marginTop: '10px', fontSize: '14px', lineHeight: '20px', fontWeight: '400', fontStyle: 'Roboto', textAlign: 'left', width: '415px', marginLeft: '10px'}}>
            Зогсоол бүртгүүлэх хүсэлтийг админаас татгалзан хариу өгсөн байна.
            </div>
          </div>}
        </Col>
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
            {data.requestStatusCode !=='PENDING'?
              <div>
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
              </div>: null}
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
              {data.requestStatusCode !=='PENDING'?
                <Button
                  onClick={changeSpaceData}
                  title="Засах"
                  className='editSpaceDataButton'
                  style={{borderRadius: '10px'}}
                  icon={<EditOutlined style={{fontSize: '12px'}} />}
                  shape="rounded"
                >
              засах
                </Button>:null}
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
      {/* Зогсоолын үндсэн зургийн мэдээлэл болон түүнийг өөрчлөх хэсэг UPDATE*/}
      <div >
        <Spin spinning ={MainImageSpin}>
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
              {data.requestStatusCode !=='PENDING'?
                <Button
                  onClick={onChangeMainImageState}
                  title="Засах"
                  className='editSpaceDataButton'
                  style={{borderRadius: '10px'}}
                  icon={<EditOutlined style={{fontSize: '12px'}} />}
                  shape="rounded"
                >
              засах
                </Button>:null}
            </Col>
          </Row>
          <Divider />
          <Row>
            {!mainImageValue ? (
              <Col style={{marginTop: '30px'}} offset={3}>
                {/* ЗОгсоолын зураг харагдах хэсэг*/}
                <Carousel autoplay>
                  {data.imageParkingGate ?
                    <div>
                      <div>
                        <Image src={`data:image/jpeg;base64,${data.imageParkingGate}`} height="400px" width='800px' style={{zIndex: '-1', position: 'absolute'}}/>
                        {/* <h8 style={{position: 'relative', color: 'red'}}>adwadawdaw</h8> */}
                      </div>
                    </div>:null}
                  {data.imageParkingOverall ?<div>
                    <Image src={`data:image/jpeg;base64,${data.imageParkingOverall}`} height="400px" width='800px'/>
                  </div>:null}
                  {data.imageResidenceGate ?<div>
                    <Image src={`data:image/jpeg;base64,${data.imageResidenceGate}`} height="400px" width='800px'/>
                  </div>:null}
                </Carousel>
              </Col>
            ) : (
              <Col span={24}>
                <Row style={{marginTop: '50px'}} className='MainImage'>
                  <Col offset={2} span={8}>
                    <p style={{fontSize: '15px'}}>Хотхоны ойр орчмын зураг</p>
                    <Upload
                      name="avatar"
                      accept='.png , .jpg'
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      beforeUpload={beforeUpload}
                      onChange={onChangeResidenceSideImage}
                    >
                      {selectedPositionImage ? (
                        <div>
                          <img
                            src={selectedPositionImage}
                            alt="avatar"
                            style={{width: '380px', height: '180px', borderRadius: '10px'}}
                          />
                          <div
                            className={'UploadAgainButton'}
                            style={{
                              marginTop: '-40px',
                              zIndex: 5,
                              position: 'absolute',
                              marginLeft: '200px',
                              height: '28px',
                              width: '150px',
                              display: 'flex',
                            }}
                          >
                            <p style={{marginLeft: '30px', color: 'white'}}>
                        Дахин авах{' '}
                            </p>
                            <RedoOutlined
                              style={{
                                color: 'white',
                                marginLeft: '10px',
                                marginTop: '5px',
                                height: '20px',
                                width: '20px',
                              }}
                            />
                          </div>
                        </div>
                      ) : (
                        <div>
                          {loadingPosition ? (
                            <Spin indicator={LoadIcon} tip="зургийг хуулж байна." />
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
                    <p style={{fontSize: '14px', height: '30px', width: '100%'}}>
                        Зогсоолын хаалганы ,орох гарах хэсгийн зураг
                    </p>
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      beforeUpload={beforeUpload}
                      onChange={onChangeDoorExitImage}
                    >
                      {selectedExitImage ? (
                        <div>
                          <img
                            src={selectedExitImage}
                            alt="avatar"
                            style={{width: '380px', height: '180px', borderRadius: '10px'}}
                          />
                          <div
                            className={'UploadAgainButton'}
                            style={{
                              marginTop: '-40px',
                              zIndex: 5,
                              position: 'absolute',
                              marginLeft: '200px',
                              height: '28px',
                              width: '150px',
                              display: 'flex',
                            }}
                          >
                            <p style={{marginLeft: '30px', color: 'white'}}>
                              Дахин авах{' '}
                            </p>
                            <RedoOutlined
                              style={{
                                color: 'white',
                                marginLeft: '10px',
                                marginTop: '5px',
                                height: '20px',
                                width: '20px',
                              }}
                            />
                          </div>
                        </div>
                      ) : (
                        <div>
                          {loadingExitImage ? (
                            <Spin indicator={LoadIcon} tip="зургийг хуулж байна." />
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
                  <Col offset={2}>
                    <p style={{fontSize: '15px'}}>Хотхоны орц гарцын зураг</p>
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      style={{width: '400px'}}
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      beforeUpload={beforeUpload}
                      onChange={onChangeResidenceExitImage}
                    >
                      {selectResidenceEXitImage ? (
                        <div>
                          <img
                            src={selectResidenceEXitImage}
                            alt="avatar"
                            style={{width: '380px', height: '180px', borderRadius: '10px'}}
                          />
                          <div
                            className={'UploadAgainButton'}
                            style={{
                              marginTop: '-40px',
                              zIndex: 5,
                              position: 'absolute',
                              marginLeft: '200px',
                              height: '28px',
                              width: '150px',
                              display: 'flex',
                            }}
                          >
                            <p style={{marginLeft: '30px', color: 'white'}}>
                            Дахин авах{' '}
                            </p>
                            <RedoOutlined
                              style={{
                                color: 'white',
                                marginLeft: '10px',
                                marginTop: '5px',
                                height: '20px',
                                width: '20px',
                              }}
                            />
                          </div>
                        </div>
                      ) : (
                        <div>
                          {loadingExit ? (
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
                    <p style={{fontSize: '14px', height: '30px'}}>Зогсоолын ерөнхий зураглал</p>
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      beforeUpload={beforeUpload}
                      onChange={onChangeOverallImage}
                    >
                      {imageParkingOverall ? (
                        <div>
                          <div>
                            <img
                              src={imageParkingOverall}
                              alt="avatar"
                              style={{width: '380px', height: '180px', borderRadius: '10px'}}
                            ></img>
                          </div>
                          <div
                            className={'UploadAgainButton'}
                            style={{
                              marginTop: '-40px',
                              zIndex: 5,
                              position: 'absolute',
                              marginLeft: '200px',
                              height: '28px',
                              width: '150px',
                              display: 'flex',
                            }}
                          >
                            <p style={{marginLeft: '30px', color: 'white'}}>
                        Дахин авах{' '}
                            </p>
                            <RedoOutlined
                              style={{
                                color: 'white',
                                marginLeft: '10px',
                                marginTop: '5px',
                                height: '20px',
                                width: '20px',
                              }}
                            />
                          </div>
                        </div>
                      ) : (
                        <div>
                          {loadingOverall ? (
                            <Spin indicator={LoadIcon} tip="зургийг хуулж байна." />
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
                <Button type='primary' onClick={onsaveMainImage}>Хадгалах</Button>
              </Col>
            )}
          </Row>
        </Spin>
      </div>
      {/* Зосоолын зураг засварлах хэсэг*/}
      <div>
        <Spin spinning={spaceImageSpin}>
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
              {data.requestStatusCode !=='PENDING'?
                <Button
                  style={{borderRadius: '10px'}}
                  onClick={onChangeSpaceImageState}
                  title="Засах"
                  className='editSpaceDataButton'
                  icon={<EditOutlined style={{fontSize: '12px'}} />}
                  shape="rounded"
                >
              засах
                </Button>:null}
            </Col>
          </Row>
          <Divider />
          <Row>
            {!spaceImage ? (
              <Col offset={3}>
                <Carousel autoplay>
                  {data.imageResidenceGate ? <div>
                    <Image src={`data:image/jpeg;base64,${data.imageResidenceGate}`} height="400px" width='800px'/>
                  </div>:null}
                  {data.imageSpaceNumber ? <div>
                    <Image src={`data:image/jpeg;base64,${data.imageSpaceNumber}`} height="400px" width='800px'/>
                  </div>:null}
                  {data.imageFromGate ? <div>
                    <Image src={`data:image/jpeg;base64,${data.imageFromGate}`} height="400px" width='800px'/>
                  </div>:null}
                </Carousel>
              </Col>
            ) : (
              <Col span={24}>
                <Row style={{marginTop: '50px'}} className='spaceImage'>
                  <Col offset={2} span={8}>
                    <p style={{fontSize: '15px'}}>
                      Зогсоолын байршлын зураг (хаалга хэсгээс)
                    </p>
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      beforeUpload={beforeUpload}
                      onChange={onChangeFromGate}
                    >
                      {imageFromGate ? (
                        <div>
                          <img
                            src={imageFromGate}
                            alt="avatar"
                            style={{width: '380px', height: '180px', borderRadius: '10px'}}
                          />
                          <div
                            className={'UploadAgainButton'}
                            style={{
                              marginTop: '-40px',
                              zIndex: 5,
                              position: 'absolute',
                              marginLeft: '200px',
                              height: '28px',
                              width: '150px',
                              display: 'flex',
                            }}
                          >
                            <p style={{marginLeft: '30px', color: 'white'}}>
                        Дахин авах{' '}
                            </p>
                            <RedoOutlined
                              style={{
                                color: 'white',
                                marginLeft: '10px',
                                marginTop: '5px',
                                height: '20px',
                                width: '20px',
                              }}
                            />
                          </div>
                        </div>
                      ) : (
                        <div>
                          {loadingFromGate ? (
                            <Spin indicator={LoadIcon} tip="зургийг хуулж байна." />
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
                    <p style={{fontSize: '15px'}}>
              Дугаарлалтын харагдах байдлын зураг
                    </p>
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      beforeUpload={beforeUpload}
                      onChange={onChangeSpaceNumber}
                    >
                      {imageSpaceNumber ? (
                        <div>
                          <img
                            src={imageSpaceNumber}
                            alt="avatar"
                            style={{width: '380px', height: '180px', borderRadius: '10px'}}
                          />
                          <div
                            className={'UploadAgainButton'}
                            style={{
                              marginTop: '-40px',
                              zIndex: 5,
                              position: 'absolute',
                              marginLeft: '200px',
                              height: '28px',
                              width: '150px',
                              display: 'flex',
                            }}
                          >
                            <p style={{marginLeft: '30px', color: 'white'}}>
                        Дахин авах{' '}
                            </p>
                            <RedoOutlined
                              style={{
                                color: 'white',
                                marginLeft: '10px',
                                marginTop: '5px',
                                height: '20px',
                                width: '20px',
                              }}
                            />
                          </div>
                        </div>
                      ) : (
                        <div>
                          {loadingSpaceNumber ? (
                            <Spin indicator={LoadIcon} tip="зургийг хуулж байна." />
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
                  <Col offset={2}>
                    <p style={{fontSize: '15px'}}>
              Зогсоолын эргэх урсгал харагдах зураг
                    </p>
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      style={{width: '400px'}}
                      beforeUpload={beforeUpload}
                      onChange={onChangeDirectionImage}
                    >
                      {selectedDirectionImage ? (
                        <div>
                          <img
                            src={selectedDirectionImage}
                            alt="avatar"
                            style={{height: '180px', width: '380px', borderRadius: '10px'}}
                          />
                          <div
                            className={'UploadAgainButton'}
                            style={{
                              marginTop: '-40px',
                              zIndex: 5,
                              position: 'absolute',
                              marginLeft: '200px',
                              height: '28px',
                              width: '150px',
                              display: 'flex',
                            }}
                          >
                            <p style={{marginLeft: '30px', color: 'white'}}>
                        Дахин авах{' '}
                            </p>
                            <RedoOutlined
                              style={{
                                color: 'white',
                                marginLeft: '10px',
                                marginTop: '5px',
                                height: '20px',
                                width: '20px',
                              }}
                            />
                          </div>
                        </div>
                      ) : (
                        <div>
                          {loadingDirect ? (
                            <Spin indicator={LoadIcon} tip="зургийг хуулж байна." />
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
                <Row>
                  <Col offset={3} span={10}>
                    <Button type='primary' onClick={onSaveSpaceImage}>Хадгалах</Button>
                  </Col>
                </Row>
              </Col>
            )}
          </Row>
        </Spin>
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
            {data.requestStatusCode !=='PENDING'?
              <Button
                style={{borderRadius: '10px'}}
                onClick={changePriceValue}
                title="Засах"
                className='editSpaceDataButton'
                icon={<EditOutlined style={{fontSize: '12px'}} />}
                shape="rounded"
              >
              засах
              </Button>:null}
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
                {data.requestStatusCode !=='PENDING'?
                  <Button
                    style={{borderRadius: '10px'}}
                    onClick={changeDiscountValue}
                    title="Засах"
                    className='editSpaceDataButton'
                    icon={<EditOutlined style={{fontSize: '12px'}} />}
                    shape="rounded"
                  >
              засах
                  </Button>:null}
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
              {data.requestStatusCode !=='PENDING'?
                <Button
                  style={{borderRadius: '10px'}}
                  onClick={changeDiscountValue}
                  title="Засах"
                  className='editSpaceDataButton'
                  icon={<EditOutlined style={{fontSize: '12px'}} />}
                  shape="rounded"
                >
              засах
                </Button>:null}
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
                  {data.requestStatusCode !=='PENDING' &&timeSplit.map((item) => (
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
                  {data.requestStatusCode !=='PENDING' &&timeSplit.map((item) => (
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
                  { data.requestStatusCode !=='PENDING' &&timeSplit.map((item) => (
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
                  { data.requestStatusCode !=='PENDING' &&timeSplit.map((item) => (
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
                  { data.requestStatusCode !=='PENDING' &&timeSplit.map((item) => (
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
                  { data.requestStatusCode !=='PENDING' && timeSplit.map((item) => (
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
                  {data.requestStatusCode !=='PENDING' && timeSplit.map((item) => (
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
                  {data.requestStatusCode !=='PENDING' &&timeSplit.map((item) => (
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
                  {data.requestStatusCode !=='PENDING' &&timeSplit.map((item) => (
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
                  {data.requestStatusCode !=='PENDING' &&timeSplit.map((item) => (
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
                  {data.requestStatusCode !=='PENDING' &&timeSplit.map((item) => (
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
                  {data.requestStatusCode !=='PENDING' &&timeSplit.map((item) => (
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
                  {data.requestStatusCode !=='PENDING' &&timeSplit.map((item) => (
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
                  {data.requestStatusCode !=='PENDING' && timeSplit.map((item) => (
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
