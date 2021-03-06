import {Row, Col, Card, Alert} from 'antd';
import MaskedInput from 'antd-mask-input';
import {
  UserOutlined,
  EditOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import ProfileLayout from '@components/layouts/ProfileLayout';
import {
  Modal,
  Button,
  Form,
  Input,
  Spin,
  Select,
  Divider,
} from 'antd';
import { useState,useContext} from 'react';
import {useEffect} from 'react';
import {Steps} from 'antd';
import {callGet, callPost} from '@api/api';
import MainInfo from '@components/registerSpace/mainInfo';
import MainImage from '@components/registerSpace/mainImage';
import SpaceImage from '@components/registerSpace/spaceImage';
import SpaceIndicator from '@components/registerSpace/spaceIndicator';
import PriceInfo from '@components/registerSpace/priceInfo';
import Discount from '@components/registerSpace/discount';
import RentDate from '@components/registerSpace/rentDate';
import Context from '@context/Context';
import Edit from '../edit';
import {showMessage} from '@utils/message';
import {messageType} from '@constants/constants';

// import {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
//   Marker,
// } from "react-google-maps";
// const {SubMenu} = Menu;
// const {Content} = Layout;
const {Option} = Select;
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

const Profile = () => {
  const getBase64 = (img, callback) =>{
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const [formData, setFormdata] = useState({});
 
  const [status, setStatus] = useState();
  const ctx =  useContext(Context);
  // eslint-disable-next-line no-unused-vars
  const [dugaar, setDugaar] = useState();
  // eslint-disable-next-line no-unused-vars
  const [space, setSpace] = useState([]);
  const [uildwer, setUildwer] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [selectedUildwer, setSelectedUildwer] = useState({});
  const [zagwar, setZagwar] = useState([]);
  // const [rfId, setRfId] = useState();
  const [color, setColor] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [selectedZagwar, setSelectedZagwar] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [selectedColor, setSelectedColor] = useState({});
  const [vehicles, setVehicles] = useState([]);
  // const [editId, setEditId] = useState();
  const [current, setCurrent] = useState(0);
  const [dayOfWeek, setRentData] = useState([]);
  const [isProfileNotEdit, setIsProfileNotEdit] = useState(true);
  const [isVehileVisible, setIsVehileVisible] = useState(false);
  const [isParkVisible, setIsParkVisible] = useState(false);
  const [isVehicleEditVisible, setIsVehicleEditVisible] = useState(false);
  const [imageSpaceNumber, setImageSpaceNUmbe] = useState(null);
  const [imageParkingGate, setImageParkingGate] = useState(null);
  const [imageParkingOverall, setImageParkingOverall] = useState(null);
  const [imageFromGate, setImageFromGate] = useState(null);
  const [visibleParkingSpaceEdit, setVisibleParkingSpaceEdit]= useState(false);
  // const mainInfoRef = useRef(null);
  const [form] = Form.useForm();
  const [vehicleForm] = Form.useForm();
  const [vehicleEditForm] = Form.useForm();
  const [residenceBlockId, setResidenceBlockId] = useState();
  // eslint-disable-next-line no-unused-vars
  const [parkingSpaceId, setParkingSpaceId] = useState(null);
  // const [parkingListData, setParkingListData]= useState([]);
  const {userdata} = useContext(Context);
  const [mainData, setMainData] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [imageData, setImageData] = useState(null);
  const [parkId, setParkId] = useState(null);
  const [realData,setRealData] = useState();
  // eslint-disable-next-line no-unused-vars
  const [spaceData, setSpaceData] = useState(null);
  const [vehicleId, setVehicleId] = useState();
  // const [editData1, setEditData1]=useState();
  // eslint-disable-next-line no-unused-vars
  const [updatedData, setUpdatedData] = useState();
  const [loading, setLoading] = useState(false);
  const [spaceEditData, setSpaceEditData] = useState(null);
  const [weekSale, setweekSale] = useState(null);
  const [weekId, setweekId] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [editId, setEditId]= useState();
  const [weekDescription, setweekDescription] = useState();
  const [monthId, setmonthId] = useState(null);
  const [deleteData, setDeleteData] = useState({
    parkingSpaceId: null,
    rawPassword: ""
  });
  const [monthSale, setmonthSale] = useState(null);
  // const [userId, setUserId]= useState(null);
  const [monthDescription, setMonthDescription] = useState();
  const [sendPhotos,setSendPhotos]= useState(false);
  const [sendSpacePhotos,setSendSpacePhotos]= useState(false);
  const [sendSale,setSendSale] = useState(false);
  // const [parkingSpaceData, setParkingSpaceData] = useState({});
  //хэрэглэгчийн мэдээлэл авах
  useEffect(async () => {
    if (typeof userdata.firstName != 'undefined') {
      setRealData(userdata);
      // setUserId(userdata.id);
     
    }
  }, [userdata]);
  const onFinish123 = (values) => {};
  const onFinishMainImage = (values) =>{
  };
  const onFinishSpaceImage = (values)=>{
  };
  const onFinishSPace = (values) => {
  };
  const onchangeNewVehicle = () => {
    vehicleForm.setFieldsValue({
      vehicleNumber: null,
      maker: null,
      model: null,
      color: null,
    });
  };
  //зогсоолын мэдээлэл засах
  const onChangeisSpaceEditVisible = async (a)=>{
    setEditId(a);
    setLoading(true);
    const spaceEdit = await callGet(`/parkingspace?parkingSpaceId=${a}`);
    const res = await callGet(`parkingspace/update/1?parkingSpaceId=${a}`);
    setSpaceEditData(spaceEdit);
    spaceEdit && setDeleteData({...deleteData, parkingSpaceId: spaceEdit.id});
   
    setLoading(false);
  };
  //Авто машины мэдээлэл засахад тухайн засах машины мэдээлэл авах
  const onChangeisVehicleEditVisible = async (a) => {
    ctx.setIsLoading(true);
    const vehicleData = await callGet(`/user/vehicle?vehicleId=${a}`);
    vehicleEditForm.setFieldsValue({
      vehicleNumber: vehicleData.vehicleNumber,
      maker: vehicleData.maker,
      model: vehicleData.model,
      color: vehicleData.color,
    });
    setIsVehicleEditVisible(true);
    ctx.setIsLoading(false);

  };
   // Бүх зогсоолын мэдээллүүдийг машины мэдээллүүдийг авах
  useEffect(async () => {
    ctx.setIsLoading(true);
    const park =  await callGet(`parkingspace/list`);
    if(park){
      // const parkSpaceList = await callGet(`/parkingspace/list/user?id=${userdata.id}`);
      setSpace(park.parkingSpace);
    }
    //get mashinii medeell awah
    const data = await callGet('/user/vehicle/list');
    setVehicles(data);
    //uidlwer medeelel
    const uildwer = await callGet('/user/vehicle/maker');
    setSelectedUildwer(uildwer);
    setUildwer(uildwer);
    //ungu
    const color = await callGet('/user/vehicle/color');
    setColor(color);
    ctx.setIsLoading(false);

    // setFormdata({...formData, rfid: '12'});
  }, []);
  const onSaveModal = async (e) => {

    setVisibleParkingSpaceEdit(false);
  };
  //uildweriin medeelel onChange hiih
  const onChangeUildver = async (e) => {
    ctx.setIsLoading(true);
    const uildver = uildwer.find((item) => item.value === e);
    setSelectedUildwer(uildver);
    const model = await callGet(`/user/vehicle/model?maker=${uildver.label}`);
    if(!model && model===undefined ){
      ctx.setIsLoading(false);
      showMessage(messageType.FAILED.type, defaultMsg.dataError);
    }else{
    setZagwar(model);
    setFormdata({...formData, maker: uildver.value});
    ctx.setIsLoading(false);
    }
  };
  
  const onPassword = (e) => {
    setDeleteData({...deleteData, rawPassword: e.target.value})
  };

  
  const submitData = async () => {
    const res = await callPost('/parkingspace/delete', deleteData);
    
  };

  const onDeleteParkingSpace = () => {
    setVisibleParkingSpaceEdit(false);
    Modal.info({
      title: <p style={{fontWeight: 'bold'}}>Баталгаажуулах</p>,
      okText: 'Баталгаажуулах',
      content: (
        <div>
          <p>Та өөрийн гүйлгээний нууц үгээ оруулна уу</p>
          {/* <Input
            type="password"
            onChange={(e) => onchangeee(e)}
            placeholder="Гүйлгээний нууц үг"
          /> */}
          <Input  type="password" onChange={(e) => onPassword(e)} name="Гүйлгээний нууц үг" />
        </div>
      ),
      onOk() {
        submitData();
      },
    });
  };
  //zagwar medeelel uurchluh
  const onChangeZagwar = (e) => {
    const selectZagwar = zagwar.find((item) => item.value === e);
    setSelectedZagwar(selectZagwar);
    setFormdata({...formData, model: selectZagwar.value});
  };
  //onCHange dugaar
  const onChangeDugaar = (e) => {
    const dugar = e.target.value;
    setDugaar(dugar);
    setFormdata({...formData, vehicleNumber: dugar});
  };
  //onChange COlor 
  const onChangeColor = (e) => {
    const selectColor = color.find((item) => item.label === e);
    setSelectedColor(selectColor);
    setFormdata({...formData, color: selectColor});
  };
  const onFinishFailed = (errorInfo) => {
  };
  //profile medeelel uurchluh
  const clickProfileEdit = () => {
    if (isProfileNotEdit) {
      setIsProfileNotEdit(false);
    } else {
      setIsProfileNotEdit(true);
    }
  };
  //shine mashin bvrtguuleh
  const onSaveNewVehicle = async () => {
    ctx.setIsLoading(true);
    await vehicleForm.validateFields();
    const a = vehicleForm.getFieldsValue();
    if (a.vehicleNumber && a.maker && a.model && a.color ) {
      const res = await callPost('/user/vehicle', {
        vehicleNumber: a.vehicleNumber,
        maker: a.maker,
        color: a.color,
        model: a.model,
      });
      if(!res || res === undefined){
      ctx.setIsLoading(false);
      showMessage(messageType.FAILED.type, defaultMsg.dataError);
      }
      else{
        ctx.setIsLoading(false);
      setIsVehileVisible(false);

      }
    } else {
      showMessage(messageType.FAILED.type, defaultMsg.dataError +'Талбараа гүйцэт бөглөнө үү?');
    }
    // setIsVehileVisible(false);
  };
  const onSaveEditVehicleData = async () => {
    await vehicleEditForm.validateFields();
    ctx.setIsLoading(true);
    const a = vehicleEditForm.getFieldsValue();
    const colorId = color.find((item)=>item.label === a.color);
    const model = zagwar.find((item)=>item.label===a.model);
    const selectMaker = uildwer.find((item)=>item.label === a.maker);
    const editFormData={
      vehicleNumber: a.vehicleNumber,
      maker: selectMaker.value,
      color: colorId.value,
      model: model.value,
      vehicleId: vehicleId,
    };
    const res = await callPost('/user/vehicle/update', editFormData );
    if(!res || res ===  undefined ){
      ctx.setIsLoading(false);
      showMessage(messageType.FAILED.type, defaultMsg.dataError +'Талбараа гүйцэт бөглөнө үү?');
    }else{
      setUpdatedData(res.data);
      ctx.setIsLoading(false);
      setIsVehicleEditVisible(false);
    }
  };
  const handleCancel = () => {
    setIsVehileVisible(false);
  };
  const onFinish = async (values) => {
    // const res = await callPost(`/user/update`,values);
  };
  const onFinishSale = (values) => {
  };
  //Зогсоол бүртгүүлэхэд оруулсан зургууд амжилттай болсон тохиолдолд ажиллах useEffect
  useEffect(async ()=>{
    ctx.setIsLoading(true);
    if(sendSpacePhotos){
      // if (imageFromGate!==null && imageSpaceNumber !==null) {
        const res = await callPost('/parkingspace/detail', {
          imageFromGate: imageFromGate,
          imageSpaceNumber: imageSpaceNumber,
          parkingSpaceId: parkingSpaceId,
        });

        if (res.status === 'success') {
          setCurrent(current + 1);
          ctx.setIsLoading(false);
          setSendSpacePhotos(false);
        }
      // } else {
      //   ctx.setIsLoading(false);
      //   showMessage(messageType.FAILED.type, 'Зургуудаа оруулна уу?');
      // }
    }
  },[sendSpacePhotos && imageFromGate && imageSpaceNumber]);
  //Зогсоол бүртгүүлэхэд оруулсан зургууд амжилттай болсон тохиолдолд ажиллах useEffect
  useEffect(async ()=>{
    ctx.setIsLoading(true);
    if(sendPhotos){
      if (imageParkingOverall!==null && imageParkingGate!==null) {
        const res = await callPost('/parkingspace/parkingimage', {
          imageParkingOverall: String( imageParkingOverall),
          imageResidenceGate: String( imageParkingGate),
          parkingSpaceId: parkingSpaceId,
        });
        if (res.status === 'success') {
          setCurrent(current + 1);
          ctx.setIsLoading(false);
          setSendPhotos(false);
        }
      }
      else {
        ctx.setIsLoading(false);
        showMessage(messageType.FAILED.type, 'Зургуудаа оруулна уу?');
      }
    }

  },[sendPhotos&&imageParkingOverall&&imageParkingGate]);
  //Хөнгөлөлтийн хувийн мэдээлэл бүртгэх 
  useEffect(async ()=>{
    if (weekSale && monthSale &&weekId && monthId) {
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
        ctx.setIsLoading(false);
        return true;
      } else {
        setSendSale(false);
        setCurrent(current + 1);
        ctx.setIsLoading(false);
      }
    }
  },[sendSale])
//parking space bvrtguuleh
  const onSaveParkingSpaceDatas = async () => {
    await form.validateFields();
    const componentData = form.getFieldsValue();
    // Үндсэн мэдээллийн өгөгдлийг өгөгдлийн санруу
    if (current === 0 ) {
      await form.isFieldsValidating();
      ctx.setIsLoading(true);
      if (mainData) {
        if(mainData.latitude && mainData.longitude){
        const res = await callPost('/parkingfirst', mainData);
        setResidenceBlockId(mainData.residenceBlockId);
        if (res.status === 'success') {
          setCurrent(current + 1);
          ctx.setIsLoading(false);
        } else {
          showMessage(messageType.defaultMsg.validateLocation);
        }
    }else{
      showMessage(messageType.WARNING.type,'Байршилын мэдээллээ оруулна уу?');
    }     
  } 
  //Зогсоолын мэдээлэл бүртгүүллэх 
    } else if (current === 1) {
      ctx.setIsLoading(true);
      //Zogsoolin medeelel nemeh
      if (componentData) {
        const second = await callGet(
          `/parkingsecond?parkingFloorId=${componentData.floorNumber}&residenceBlockId=${mainData.residenceBlockId}`,
        );
        setParkId(second.parkingId);
        const res = await callPost('/parkingspace', {
          entranceLock: componentData.entranceLock,
          floorNumber: componentData.floorNumber,
          isNumbering: componentData.isNumbering,
          parkingSpaceId: parkingSpaceId,
          residenceBlockId: residenceBlockId,
          returnRoutes: componentData.returnRoutes[0],
          capacityId: componentData.capacityId,
          parkingId: second.parkingId,
          typeId: componentData.typeId,
          typeOther: ' ',
        });
        if (res.status === 'success') {
          setParkingSpaceId(res.message);
          ctx.setIsLoading(false);
          setCurrent(current + 1);
        }
      }
      else{
        ctx.setIsLoading(false);
        showMessage(messageType.FAILED.type,'Мэдээллээ бүрэн оруулна уу?');
      }
  //Үндсэн зургийн мэдээлэл
    } else if (current === 2) {
      // Үндсэн зургийн мэдээллийг өгөгдлийн санруу бичих
      if (componentData) {
        getBase64(componentData.imageParkingGate.file.originFileObj, (image2) =>{
          setImageParkingGate(image2.slice(22));
        })
        getBase64(
          componentData.imageParkingOverall.file.originFileObj,
          (image2) => {
            setImageParkingOverall(image2.slice(22));
          },
        );
      setSendPhotos(true);
      }
    } else if (current === 3) {
      {/* ЗОгсоолын зураг өгөгдлийн санруу шидэх*/}
      if (componentData) {
        getBase64(componentData.imageFromGate.file.originFileObj, (image1) => {
          setImageFromGate(image1.slice(22));
        });
        getBase64(componentData.imageSpaceNumber.file.originFileObj, (image4) => {
          setImageSpaceNUmbe(image4.slice(22));
        });
      setSendSpacePhotos(true);
      }
    //үнийн дүнгийн мэдээлэл хадгалах
    } else if (current === 4) {
      ctx.setIsLoading(true);
      const data = await callGet('/parkingspace/timesplit');
      const array = [
        {
          dateSplitId: data.daySplit.winterId,
          timeSplitId: [data.daySplit.id],
          priceForRenter: Number(componentData.daySplitWinterPrice),
        },
        {
          dateSplitId: data.daySplit.summerId,
          timeSplitId: [data.daySplit.id],
          priceForRenter: Number(componentData.daySplitSummerPrice),
        },
        {
          dateSplitId: data.nightSplit.winterId,
          timeSplitId: [data.nightSplit.id],
          priceForRenter: Number(componentData.nightSplitWinterPrice),
        },
        {
          dateSplitId: data.nightSplit.summerId,
          timeSplitId: [data.nightSplit.id],
          priceForRenter: Number(componentData.nightSplitSummerPrice),
        },
        {
          dateSplitId: data.fullDaySplit.winterId,
          priceForRenter: Number(componentData.fullDaySplitWinterPrice),
          timeSplitId: data.fullDaySplit.id,
        },
        {
          dateSplitId: data.fullDaySplit.summerId,
          priceForRenter: Number(componentData.fullDaySplitSummerPrice),
          timeSplitId: data.fullDaySplit.id,
        },
      ];
      const formData = {
        hourlyPrice: Number(componentData.hourlyPrice),
        parkingSpaceId: parkingSpaceId,
        parkingSpacePriceInstance: array,
      };
      const res = await callPost('/parkingspace/price', formData);
      if(!res || res === undefined){
      showMessage(messageType.FAILED.type, defaultMsg.dataError);
      }else{
        setCurrent(current + 1);
        ctx.setIsLoading(false)
      }
      // Хөнгөлөлтийн хувийн мэдээлэл хадгалах
    } else if (current === 5) {
      ctx.setIsLoading(true);
      const saleData = form.getFieldsValue();
      const res = await callGet('/division/salesplit');
      if (res && res.saleSplit) {
        res.saleSplit.forEach((c) => {
          if (c.code === 'WEEKLY_SALE') {
            setweekId(c.id);
            setweekSale(Number(saleData.weekSale));
            setweekDescription(c.description);
          }
          if (c.code === 'MONTHLY_SALE') {
            setmonthId(c.id);
            setmonthSale(Number(saleData.monthSale));
            setMonthDescription(c.description);
          }
        });
      }
      setSendSale(true);
  //7 хоногийн түрээслэх өдрүүдийн мэдээлэл хадгалах
    } else if (current === 6) {
      ctx.setIsLoading(true);
      const newGeneralScheduleDto = {
        parkingSpaceId: parkingSpaceId,
        dayOfWeek,
        holiday: [],
      };
      const res = await callPost('/schedule/general', newGeneralScheduleDto );
      if (!res || res === undefined) {
        showMessage(messageType.FAILED.type, ress.error);
        ctx.setIsLoading(false);
        return true;
      } else {
        ctx.setIsLoading(false);
        setIsParkVisible(false);}
    }
  };
  //буцах
  const goBack = () => {
    setCurrent(current - 1);
  };
  const onFinishFailedVehile = (errorInfo) => {
  };


  return (
    <ProfileLayout>
      <Spin tip="Уншиж байна..." spinning={loading}>
        <Row style={{marginLeft: '65px'}} className={'profileIndex'}>
          <Col span={12}>
          {/*Хувийн мэдээллийн хэсэг*/}
            <Card>
              <Row className="header">
                <Col span={3}>
                  <UserOutlined style={{fontSize: '30px'}} />
                </Col>
                <Col span={18}>
                  {' '}
                  <span className="text">Хувийн мэдээлэл</span>
                </Col>
                <Col span={3} style={{textAlign: 'right'}}>
                  <EditOutlined
                    className="edit"
                    onClick={clickProfileEdit}
                    style={{fontSize: '28px'}}
                  />
                </Col>
              </Row>
              { realData != null ? (
                <Form
                  className="profileForm"
                  name="basic"
                  labelCol={{span: 8}}
                  wrapperCol={{span: 16}}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  initialValues={realData}
                >
                  <Form.Item
                    label="Овог:"
                    name="lastName"
                    rules={[{required: true, message: 'Овог оруулна уу'}]}
                  >
                    <Input disabled={isProfileNotEdit} />
                  </Form.Item>
                  <Form.Item
                    label="Нэр:"
                    name="firstName"
                    rules={[{required: true, message: 'Нэр оруулна уу'}]}
                  >
                    <Input disabled={isProfileNotEdit} />
                  </Form.Item>
                  <Form.Item
                    label="Регистрийн дугаар:"
                    name="registerNumber"
                    rules={[
                      {required: true, message: 'Регистрийн дугаар оруулна уу'},
                    ]}
                  >
                    <Input disabled={isProfileNotEdit} />
                  </Form.Item>
                  <Form.Item
                    label="Утасны дугаар:"
                    name="phoneNumber"
                    rules={[
                      {required: true, message: 'Утасны дугаар оруулна уу'},
                    ]}
                  >
                    <Input disabled={isProfileNotEdit} />
                  </Form.Item>
                  <Form.Item
                    label="И-мэйл хаяг:"
                    name="email"
                    rules={[
                      {required: true, message: 'И-мэйл хаяг оруулна уу'},
                    ]}
                  >
                    <Input disabled={isProfileNotEdit} />
                  </Form.Item>
                  <Form.Item
                    label="Facebook:"
                    name="fbLink"
                    rules={[{required: false, message: 'Facebook оруулна уу'}]}
                  >
                    <Input disabled={isProfileNotEdit} />
                  </Form.Item>

                  <Form.Item label="Хэрэглэгчийн дугаар:" name="id">
                    <Input disabled={isProfileNotEdit} />
                  </Form.Item>

                  {!isProfileNotEdit && (
                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                      <Button type="primary" htmlType="submit">
                      Хадгалах
                      </Button>
                    </Form.Item>
                  )}
                </Form>
              ) : null}
            </Card>
          </Col>
          <Col span={12} style={{paddingLeft: '25px'}}>
            {/*Тээврийн хэрэгсэл*/}
            <Card>
              <Row className="header">
                <Col span={3}></Col>
                <Col span={18}>
                  <span className="text">Тээврийн хэрэгсэл</span>
                </Col>
                <Col span={3} style={{textAlign: 'right'}}></Col>
              </Row>
              <Row style={{paddingTop: '30px', width: '100%'}}>
                <Col span={24} >
                  {vehicles && vehicles.length> 0 ? vehicles.map((item) => (
                    <Row className="mt-4 rounded flex shadow-sm" key={item.value}
                      style={{backgroundColor: 'white'}}>
                      <Col span={2} offset={1} className='mt-4'>
                        <img src="/directions_car_24px.png" height='16px' width='16px'></img>
                      </Col>
                      <Col className="ml-4" span={16}>
                        <div className="text-sm">{item.label.split(' ')[0]},  {item.label.split(' ')[1]}</div>
                        <div className="text-base" style={{color: 'blue '}}>
                          {item.label.split(' ')[2]}
                        </div>
                      </Col>
                      <Col className=' mt-2' span={2} offset={1} style={{cursor:'pointer'}}>
                        <div
                          style={{}}
                          onClick={(key) => {
                            setVehicleId(item.value);
                            onChangeisVehicleEditVisible(item.value);
                          }}
                        >
                          <img src="/mode_24px.png" />
                        </div>
                      </Col>
                    </Row>

                  )):<div>Машин олдсонгүй</div>}
                </Col>
              </Row>

              <Row>
                <Button
                  type="solid"
                  style={{marginTop: '10px', borderRadius: '10px'}}
                  block
                  onClick={() => {
                    onchangeNewVehicle(), setIsVehileVisible(true);
                  }}
                >
                +
                </Button>
              </Row>
            </Card>
            {/*Авто зогсоол */}
            <Card style={{marginTop: '25px'}}>
              <Row className="header">
                <Col span={3}></Col>
                <Col span={18}>
                  {' '}
                  <span className="text">Авто зогсоол</span>
                </Col>
                <Col span={3} style={{textAlign: 'right'}}></Col>
              </Row>
              <Row style={{minHeight: '200px', paddingTop: '30px'}}>
                <Col span={20} offset={2}>
                  {space.length > 0 ? space.map((item) =>
                    // eslint-disable-next-line react/jsx-key
                    <Card style={{height: '70px', marginTop: '5px'}} key={item.id}>
                      <Row  style={{display: 'flex', borderRadius: '10px'}}>
                        <Col span={4}>
                          <img src="/icons/park 1.png" height={24} width={24}/>
                        </Col>
                        <Col span={14}><p style={{marginTop:'-10px'}}>{item.residenceName}</p>
                          <p></p></Col>
                        <Col span={4} offset={2}
                        style={{cursor:'pointer'}}
                          onClick={(key)=>{
                            setVisibleParkingSpaceEdit(true), onChangeisSpaceEditVisible(item.id);
                          }}>
                         {item.requestStatusCode ==='CONFIRMED' && <img src ="/icons/mode_24px.png" height={24} width={24}/>}
                         {item.requestStatusCode ==='PENDING'  && <img src ="/icons/info_outline_24px.png" height={24} width={24}/>}
                         {item.requestStatusCode === 'CANCELLED' && <img src ="/info_outline_242px.png" height={24} width={24}/>}
                         </Col>
                      </Row></Card>,

                  ) : <p>Зогсоол бүртгүүлээгүй байна</p>}
                </Col>
              </Row>
              <Row>
                <Button
                  type="solid"
                  block
                  style={{marginTop: '10px', borderRadius: '10px'}}
                  onClick={() => setIsParkVisible(true)}
                >
                +
                </Button>
              </Row>
            </Card>
          </Col>
        </Row>
        {/*Тээврийн хэрэгсэл бүртгүүлэх*/}
        <Modal
          className="fullModal "
          title="Тээврийн хэрэгсэл бүртгүүлэх"
          centered
          form={form}
          style={{minHeight: '800px', height: 'auto'}}
          visible={isVehileVisible}
          okButtonProps={{
            form: 'vehile-edit-form',
            key: 'submit',
            htmlType: 'submit',
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
              onClick={() => onSaveNewVehicle()}
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
                      rules={[
                        {
                          required: true,
                          message: 'Улсын дугаараа форматын дагуу  оруулна уу.',
                          pattern: new RegExp('[0-9]{4}[АБВГДЕЁЖЗИЙКЛМНОӨПРСТУҮФХЦЧШЩЬЫЬЭЮЯабвгдеёжзийклмноөпрстуүфхцчшщъыьэюя]{3}'),
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
                          message: 'Өнгө сонгоно уу?',
                        },
                      ]}
                    >
                      <Select onChange={onChangeColor}>
                        {color.map((item) => (
                          <Option key={item.value} value={item.value}>
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
        {/* Машины мэдээлэл шинэчлэх Modal */}
        <Modal
          className="fullModal "
          title="Тээврийн хэрэгсэл шинэчлэх"
          centered
          style={{minHeight: '800px', height: 'auto'}}
          visible={isVehicleEditVisible}
          okButtonProps={{
            form: 'vehile-edit-form',
            key: 'submit',
            htmlType: 'submit',
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
              onClick={() => onSaveEditVehicleData()}
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
                          message: 'Улсын дугаар 0000ААА форматын дагуу оруулна уу?',
                          pattern: new RegExp('[0-9]{4}[А-Яа-я]{3}'),
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
                          message: 'Өнгө сонгоно уу?',
                        },
                      ]}
                    >
                      <Select onChange={onChangeColor}>
                        {color.map((item) => (
                          <Option key={item.value} value={item.value}>
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
        {/*Авто зогсоол бүртгүүлэх */}
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
              {current > 0 ? <Button onClick={goBack}>Буцах</Button>:<div></div>}</>,
            <>
              {current < steps.length - 1 && (
                <Button
                  onClick={onSaveParkingSpaceDatas}
                  type="primary"
                >
                Үргэлжлүүлэх
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button onClick={onSaveParkingSpaceDatas} className="buttonGo" type='primary'>
                Дуусгах
                </Button>
              )}
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
                <MainImage setImageData={setImageData} form={form} onFinish={onFinishMainImage} />
              )) ||
              (steps[current].title === 'Зогсоолын зураг' && (
                <SpaceImage setSpaceData={setSpaceData} form={form} onFinish={onFinishSpaceImage}/>
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
                <RentDate onchangeRentData = {()=>onchangeRentData} setRentData={setRentData} />
              ))}
            </Col>
          </Row>
        </Modal>
        {!loading &&
      <Modal
        visible={visibleParkingSpaceEdit}
        width={1200}
        onCancel={()=>setVisibleParkingSpaceEdit(false)}
        footer={[
          status != "PENDING" ? (
            <>
          <Button key="back" className=" bg-red-500 text-[white]" onClick={onDeleteParkingSpace}>
            Устгах
          </Button>,
          <Button key="submit" type="primary" onClick={onSaveModal}>
            Хадгалах
          </Button>
          </>) : <Button key="submit" type="primary" onClick={() => setVisibleParkingSpaceEdit(false)}>
            Хаах
          </Button>

        ]}
      >
        <Edit  data={spaceEditData} />
      </Modal>}

      </Spin>
    </ProfileLayout>
  );
};

export default Profile;
