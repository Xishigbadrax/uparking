import DefaultLayout from '@components/layouts/DefaultLayout';
import {Layout, Button, Carousel, Image, Row, Col, Divider, Modal, Alert} from 'antd';
import {LeftOutlined, DownOutlined, UpOutlined} from '@ant-design/icons';
import {showMessage} from '@utils/message';
import {useEffect, useState, useContext} from 'react';
import {callGet} from '@api/api';
import Context from '@context/Context';
import {useRouter} from 'next/router';
import Helper from '@utils/helper';
import Link from 'next/link';
import {Tabs} from 'antd';
import CustomCalendar from '@components/CustomCalendar';
import moment from 'moment';
import SettingPane from '@components/settingPane/setting';
import WalletInput from '../../../../components/WalletInput';
import WalletBankInfo from '@components/WalletBankInfo';
import WalletCard from '../../../../components/WalletCard';
import {callPost} from '@api/api';

import {
  messageType,
  defaultMsg,
} from '@constants/constants';

moment.updateLocale('mn', {
  weekdaysMin: ['НЯ', 'ДА', 'МЯ', 'ЛХ', 'ПҮ', 'БА', 'БЯ'],
});

const {TabPane} = Tabs;

const {Header} = Layout;

const IMG_URL = process.env.NEXT_PUBLIC_IMAGE_URL;
const style = {
  border: '1px solid #DEE2E9',
  borderRadius: '8px',
  padding: '5px 10px',
};
const tabItems = [
  {
    id: 1,
    name: 'Хаан банк',
    type: 'KHANBANK',
    src: '../../../images/icon/khanbank.png',
  },
  {
    id: 2,
    name: 'Хас банк',
    type: 'KHASBANK',
    src: '../../../images/icon/xac.png',
  },
  {
    id: 3,
    name: 'Голомт банк',
    type: 'GOLOMTBANK',
    src: '../../../images/icon/golomt.png',
  },
  {
    id: 4,
    name: 'Худалдаа хөгжлийн банк',
    type: 'TDB',
    src: '../../../images/icon/tdb.png',
  },
];


const OrderId = () => {
  const [type, settype] = useState('KHANBANK');
  const [type2, settype2] = useState('MONGOLCHAT');
  const [data, setdata] = useState(null);
  const [amount, setamount] = useState(0);
  const [formData] = useState({
    amount: null,
    phoneNumber: null,
  });
  const [userData, setuserData] = useState(null);
  const [message, setmessage] = useState('');
  const [status, setstatus] = useState('');
  const [title, settitle] = useState('');
  const [messageShow, setmessageShow] = useState(false);


  const router = useRouter();
  const ctx = useContext(Context);
  const [orderData, setOrderData] = useState({});
  const [images, setImages] = useState([]);
  const [parkingUpDownArrow, setParkingUpDownArrow] = useState(false);
  const [seemoreUpDownArrow, setSeemoreUpDownArrow] = useState(false);
  const [isModalVisibleCancelOrder, setIsModalVisibleCancelOrder] = useState(false);
  const [isModalVisibleCancelOrderConfirm, setIsModalVisibleCancelOrderConfirm] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [selectedDate, setSelectedDate] = useState([]);
  const [fromSelectedDate, setFromSelectedDate] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [time, settime] = useState(null);
  const compareDate=(date1, date2)=>{
    const fromDatetime = new Date(date1);
    const toDatetime = new Date(date2);
    console.log(fromDatetime, toDatetime);
    if (fromDatetime.getTime() > toDatetime.getTime()) {
      return 1;
    } else return 0;
  };
  useEffect(() => {
    getData();
  }, []);
  const onChangeInput = (value) => {
    setamount(value);
  };
  const onChangeInputPhone = (value) => {
    setphoneNumber(value);
  };
  useEffect(() => {
    fetchData4();
  }, []);

  const fetchData4 = async () => {
    ctx.setIsLoading(true);
    await callGet('/wallet/user', null).then((res) => {
      setuserData(res);
      if (res && res.pendingList && res.pendingList.length > 0) {
        setCalendarData(res.pendingList);
      }
      ctx.setIsLoading(false);
    });
  };

  const fetchData2 = async () => {
    if (amount != 0) {
      const formData2 = {
        amount: +amount,
        bookingId: null,
        topUp: true,
      };
      formData.amount = amount;
      formData.phoneNumber =
        type2 == 'LENDMN' ? phoneNumber : userData.phoneNumber;
      {
        type2 == 'MONGOLCHAT' ?
          await callPost('/mongolchat/wallet', formData).then((res) => {
            if (res.code == 1000) {
              settitle('Амжилтай');
              setmessage('Амжилттай. Нэхэмжлэх үүсгэлээ.');
              setstatus('success');
              setmessageShow(true);
              try {
                const win = window.open(res.dynamic_link, '_blank');
                win.focus();
              } catch (e) {
                settitle('Анхааруулга');
                setmessage('Нэхэмжлэх үүсгэхэд алдаа гарлаа');
                setstatus('warning');
                setmessageShow(true);
              }
            } else {
              settitle('Анхааруулга');
              setmessage('Нэхэмжлэх үүсгэхэд алдаа гарлаа');
              setstatus('warning');
              setmessageShow(true);
            }
          }) :
          type2 == 'LENDMN' ?
            await callPost('/lend/qr/wallettopup', formData).then((res) => {
              if (res.qr_string) {
                settitle('Амжилтай');
                setmessage('Амжилттай. Нэхэмжлэх үүсгэлээ.');
                setstatus('success');
                setmessageShow(true);
              } else {
                settitle('Анхааруулга');
                setmessage('Нэхэмжлэх үүсгэхэд алдаа гарлаа');
                setstatus('warning');
                setmessageShow(true);
              }
            }) :
            type2 == 'SOCIALPAY' ?
              await callPost('/invoice', formData2).then((res) => {
                if (res && res.invoice) {
                  settitle('Амжилтай');
                  setmessage('Амжилттай. Нэхэмжлэх үүсгэлээ.');
                  setstatus('success');
                  setmessageShow(true);
                  try {
                    const win = window.open(
                      'https://ecommerce.golomtbank.com/socialpay/mn/' +
                      res.invoice,
                      '_blank',
                    );
                    win.focus();
                  } catch (e) {
                    settitle('Анхааруулга');
                    setmessage('Нэхэмжлэх үүсгэхэд алдаа гарлаа');
                    setstatus('warning');
                    setmessageShow(true);
                  }
                } else {
                  settitle('Анхааруулга');
                  setmessage('Нэхэмжлэх үүсгэхэд алдаа гарлаа');
                  setstatus('warning');
                  setmessageShow(true);
                }
              }) :
              null;
      }
    } else {
      settitle('Анхааруулга');
      setmessage('Үнийн дүн хоосон байна');
      setstatus('warning');
      setmessageShow(true);
    }
  };

  const fetchData = async () => {
    await callGet(`/payment/bankinfo?bankName=${type}`).then((res) => {
      setdata(res);
    });
  };
  useEffect(() => {
    fetchData();
  }, [type]);

  const handleClickBankLogo = (activekey) => {
    settype(activekey);
  };
  const getData = async () => {
    const orderId = router.query.id;
    ctx.setIsLoading(true);
    const res = await callGet(`/booking/id/test?id=${orderId}&asWho=1`);
    console.log(res, 'resresres');
    if (!res || res === undefined) {
      showMessage(messageType.FAILED.type, defaultMsg.dataError);
    } else {
      setOrderData(res);
      setImages([]);
      if (!Helper.isNullOrEmpty(res.imageFromGate)) {
        setImages((images) => [...images, {id: 4, path: res.imageFromGate}]);
      }
      if (!Helper.isNullOrEmpty(res.imageParkingOverall)) {
        setImages((images) => [...images, {id: 5, path: res.imageParkingOverall}]);
      }
      if (!Helper.isNullOrEmpty(res.imageResidenceGate)) {
        setImages((images) => [...images, {id: 6, path: res.imageResidenceGate}]);
      }
      if (!Helper.isNullOrEmpty(res.imageSpaceNumber)) {
        setImages((images) => [...images, {id: 7, path: res.imageSpaceNumber}]);
      }
      if (!Helper.isNullOrEmpty(res.imageSpaceNumber)) {
        setImages((images) => [...images, {id: 8, path: res.imageSpaceNumber}]);
      }
    }
    ctx.setIsLoading(false);
  };

  const callback = (key) => {
    console.log(key);
  };
  const handleClickCancelOrder = () => {
    setIsModalVisibleCancelOrder(true);
  };
  const handleClickCancelOrderContinue = () => {
    setIsModalVisibleCancelOrder(false);
    setIsModalVisibleCancelOrderConfirm(true);
  };

  const handleOkCancelOrder = () => {
    setIsModalVisibleCancelOrder(false);
  };
  const handleOk = () => {
    setmessageShow(false);
  };

  const handleCancel = () => {
    setmessageShow(false);
  };

  const handleCancelCancelOrder = () => {
    setIsModalVisibleCancelOrder(false);
  };

  const handleOkCancelOrderConfirm = () => {
    setIsModalVisibleCancelOrder(false);
  };

  const handleCancelCancelOrderConfirm = () => {
    setIsModalVisibleCancelOrder(false);
  };

  const handleClickConfirm = (value, mode) => {
    console.log(value, mode);
  };
  const getSelectedDate = (data) =>{
    console.log(data, 'datadatadata');
    setFromSelectedDate(data);
  };

  return (
    <DefaultLayout>
      <Layout>
        <Header style={{padding: '0px'}}>
          <Link href={{pathname: '/park/profile/order/'}} passHref>
            <Button type="primary" shape="circle" icon={<LeftOutlined />} size={'large'} />
          </Link>
          <span style={{fontSize: '20px', lineHeight: '24px', color: '#0013D4', marginLeft: '20px'}}>Миний захиалга</span>
        </Header>
        {/* <Layout style={{padding: '0px 0px 0px 20px'}}>
          <Content width={600}> */}
        <Row>
          <Col span={12} offset={1}>
            {images.length > 0 ?
              <Carousel style={{width: '600px'}}>
                {images.map((image) => (
                  <div key={image.id}>
                    <Image
                      preview={false}
                      width={700}
                      height={468}
                      src={IMG_URL + image.path}
                    /></div>
                ))}
              </Carousel> :
              null}
            <Row style={{marginTop: '24px'}}>

              <Col span={9} offset={0}>
                <div className="text-[20px] flex items-center"><strong>{!Helper.isNullOrEmpty(orderData.residenceName) ? orderData.residenceName : null}</strong> <Image className=" w-[15px] h-[15px] ml-[5.5px]" src="../../../images/darias_icon/checkCircle.png" /></div>
                {/* <div>rating</div> */}
              </Col>
              {/* <Col span={6}>2</Col> */}
              <Col span={10} offset={4}><Image preview={false} src={'/icons/location_on_24px.png'} /> {`${orderData.province}, ${orderData.district}, ${orderData.section}, ${orderData.residenceName}, ${orderData.residenceBlockNumber}`}</Col>
            </Row>
            {/* </Content> */}
          </Col>
          {/* <Sider width={400}> */}
          <Col span={8} offset={1}>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab="Танилцуулга" key="1">
                {orderData.bookingStatus === 'CONFIRMED' || orderData.bookingStatus === 'HISTORY ' ?
                  <div>
                    <Row>
                      <Col span={12}>Residence</Col>
                      <Col span={12} style={{color: '#0013D4', textAlign: 'right', fontWeight: 'bold'}}>{!Helper.isNullOrEmpty(orderData.residenceName) ? orderData.residenceName : null}</Col>
                    </Row>
                    <Row>
                      <Col span={12}>Floor number</Col>
                      <Col span={12} style={{color: '#0013D4', textAlign: 'right', fontWeight: 'bold'}}>{!Helper.isNullOrEmpty(orderData.floorNumberLabel) ? orderData.floorNumberLabel : null}</Col>
                    </Row>
                    <Row>
                      <Col span={12}>Garage number</Col>
                      <Col span={12} style={{color: '#0013D4', textAlign: 'right', fontWeight: 'bold'}}>{!Helper.isNullOrEmpty(orderData.parkingSpaceGarageNumber) ? orderData.parkingSpaceGarageNumber : null}</Col>
                    </Row>
                    <Row>
                      <Col span={12}>Uparking number</Col>
                      <Col span={12} style={{color: '#0013D4', textAlign: 'right', fontWeight: 'bold'}}>{!Helper.isNullOrEmpty(orderData.uparkingNumber) ? orderData.uparkingNumber : null}</Col>
                    </Row>
                  </div> : null
                }
                <Row style={{padding: '20px 10px'}}>
                  <Col span={24} style={{background: 'rgba(222, 226, 233, 0.2)', borderRadius: '24px', padding: '13px 23px', display: 'inline-flex', textAlign: 'center', justifyContent: 'center'}}>
                    {orderData && orderData.floorNumber ?
                      <div style={{marginRight: '13px'}}>
                        <Image
                          preview={false}
                          width={24}
                          src={IMG_URL + orderData.floorNumber}
                        />
                      </div> :
                      null}
                    {orderData && orderData.entranceLock ?
                      <div style={{marginRight: '13px'}}>
                        <Image
                          preview={false}
                          width={24}
                          src={IMG_URL + orderData.entranceLock}
                        />
                      </div> :
                      null}
                    {orderData && orderData.isNumbering ?

                      <div style={{marginRight: '13px'}}>
                        <Image
                          preview={false}
                          width={24}
                          src={IMG_URL + orderData.isNumbering}
                        />
                      </div> :
                      null}
                    {orderData && orderData.capacity ?

                      <div style={{marginRight: '13px'}}>
                        <Image
                          preview={false}
                          width={24}
                          src={IMG_URL + orderData.capacity}
                        />
                      </div> :
                      null}
                    {orderData && orderData.type ?

                      <div style={{marginRight: '13px'}}>
                        <Image
                          preview={false}
                          width={24}
                          src={IMG_URL + orderData.type}
                        />
                      </div> :
                      null}
                    {orderData && orderData.returnRoutes ?

                      <div style={{marginRight: '13px'}}>
                        <Image
                          preview={false}
                          width={24}
                          src={IMG_URL + orderData.returnRoutes}
                        />
                      </div> :
                      null}
                    <div>
                      {!parkingUpDownArrow ?
                        <DownOutlined onClick={() => setParkingUpDownArrow(true)} /> :
                        <UpOutlined onClick={() => setParkingUpDownArrow(false)} />
                      }
                    </div>

                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    {parkingUpDownArrow ?
                      <div>
                        {orderData && orderData.floorNumber ?
                          <div style={{marginRight: '13px', display: 'flex'}}>
                            <Image
                              preview={false}
                              width={24}
                              src={IMG_URL + orderData.floorNumber}
                            />
                            <div style={{marginLeft: '25px'}}><span>{orderData.floorNumberLabel}</span></div>
                          </div> :
                          null}
                        {orderData && orderData.entranceLock ?
                          <div style={{marginRight: '13px', display: 'flex'}}>
                            <Image
                              preview={false}
                              width={24}
                              src={IMG_URL + orderData.entranceLock}
                            />
                            <div style={{marginLeft: '25px'}}><span>{orderData.entranceLockLabel}</span></div>
                          </div> :
                          null}
                        {orderData && orderData.isNumbering ?

                          <div style={{marginRight: '13px', display: 'flex'}}>
                            <Image
                              preview={false}
                              width={24}
                              src={IMG_URL + orderData.isNumbering}
                            />
                            <div style={{marginLeft: '25px'}}><span>{orderData.isNumberingLabel}</span></div>
                          </div> :
                          null}
                        {orderData && orderData.capacity ?

                          <div style={{marginRight: '13px', display: 'flex'}}>
                            <Image
                              preview={false}
                              width={24}
                              src={IMG_URL + orderData.capacity}
                            />
                            <div style={{marginLeft: '25px'}}><span>{orderData.capacityLabel}</span></div>
                          </div> :
                          null}
                        {orderData && orderData.type ?

                          <div style={{marginRight: '13px', display: 'flex'}}>
                            <Image
                              preview={false}
                              width={24}
                              src={IMG_URL + orderData.type}
                            />
                            <div style={{marginLeft: '25px'}}><span>{orderData.typeLabel}</span></div>
                          </div> :
                          null}
                        {orderData && orderData.returnRoutes ?

                          <div style={{marginRight: '13px', display: 'flex'}}>
                            <Image
                              preview={false}
                              width={24}
                              src={IMG_URL + orderData.returnRoutes}
                            />
                            <div style={{marginLeft: '25px'}}><span>{orderData.returnRoutesLabel}</span></div>
                          </div> :
                          null}
                      </div> :
                      null
                    }
                  </Col>
                </Row>

                <div style={{margin: '30px 0px'}}>
                  <Button className=" bg-[#0336FF14] bg-opacity-[8%] rounded-[8px] text-[#0013D4] w-[328px] h-[48px]" type="default">
                                        Зогсоолыг харах
                  </Button>
                </div>
                <div className=" text-[#A2A4AA] font-bold text-[14px] mb-[10px]">Өдөр (09:00-19:00)</div>
                <Row gutter={16}>
                  <Col className="gutter-row" span={12} >
                    <div style={style}>
                      <div style={{color: '#0013D4'}}>Эхлэх хугацаа</div>
                      {orderData && orderData.startDateTime ?
                        <div>{Helper.removeSec(orderData.startDateTime)}</div> :
                        null}
                    </div>
                  </Col>
                  <Col className="gutter-row" span={12}>
                    <div style={style}>
                      <div style={{color: '#0013D4'}}>Дуусах хугацаа</div>
                      {orderData && orderData.endDateTime ?
                        <div>{Helper.removeSec(orderData.endDateTime)}</div> :
                        null}
                    </div>
                  </Col>
                </Row>
                <Row style={{marginTop: '30px'}}>
                  <Col span={24} style={{fontWeight: 'bold', fontSize: '14px', lineHeight: '24px'}}>
                    <div style={{color: '#0013D4'}}>Нийт захиалга</div>
                    {orderData.totalAtDay ? (
                      <div style={{margin: '10px 0px', display: 'flex'}}>
                        <Image
                          preview={false}
                          width={24}
                          src={'/images/icon/brightness_5_24px.png'}></Image>
                        <div style={{color: '#35446d', marginLeft: '10px'}}>
                                                    Өдөр {orderData.totalAtDay}
                        </div>
                      </div>
                    ) : null}
                  </Col>
                </Row>

                <Row style={{padding: '20px 10px'}}>
                  <Col span={24} style={{background: 'rgba(222, 226, 233, 0.2)', borderRadius: '24px', padding: '13px 23px', display: 'inline-flex', textAlign: 'center', justifyContent: 'center'}}>
                    <div style={{color: '#0013D4', fontWeight: 'bold', fontSize: '14px'}}>Захиалгын дэлгэрэнгүй харах</div>
                    <div style={{marginLeft: '40px'}}>
                      {!seemoreUpDownArrow ?
                        <DownOutlined onClick={() => setSeemoreUpDownArrow(true)} /> :
                        <UpOutlined onClick={() => setSeemoreUpDownArrow(false)} />
                      }
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col span={24}>
                    {seemoreUpDownArrow ?
                      <div>
                        {orderData.bookingDetail && orderData.bookingDetail ?
                          orderData.bookingDetail.map((book, key) => (
                            <div key={key} style={{display: 'flex', justifyContent: 'space-between'}}>
                              <div>
                                <div style={{color: '#0013D4', fontSize: '12px'}}>
                                                                    Эхлэх
                                </div>
                                <div>
                                  {Helper.removeSec(book.startDate)}
                                </div>
                              </div>
                              <div style={{alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
                                <Image
                                  preview={false}
                                  width={24}
                                  src={'/images/icon/arrow_right_alt_24px.png'}
                                />
                              </div>
                              <div>
                                <div style={{color: '#0013D4', textAlign: 'right', fontSize: '12px'}}>
                                                                    Дуусах
                                </div>
                                <div>
                                  {Helper.removeSec(book.endDate)}
                                </div>
                              </div>
                            </div>
                          )) :
                          null}
                      </div> :
                      null
                    }
                  </Col>
                </Row>
                <Row style={{marginTop: '30px'}}>
                  <Col span={24} style={{fontWeight: 'bold', fontSize: '14px', lineHeight: '24px'}}>
                    <div style={{color: '#0013D4'}}>Тээврийн хэрэгсэл</div>
                    {orderData.totalAtDay ? (
                      <Row style={{marginTop: '20px'}}>
                        <Col style={{borderRadius: '8px', border: 'solid 1px #0013D4', display: 'flex', alignItems: 'center'}}>
                          <div style={{padding: '20px'}}>
                            <Image
                              preview={false}
                              width={24}
                              src={'/images/icon/directions_car.png'}></Image>
                          </div>
                          <div style={{paddingRight: '20px'}}>
                            <div style={{color: '#000000'}}>{orderData.vehicleMaker}, {orderData.vehicleModel}</div>
                            <div style={
                              {
                                color: '#0013D4',
                                fontFamily: 'Roboto-Bold',
                                textTransform: 'uppercase',
                              }
                            }>{orderData.vehicleNumber}</div>
                          </div>
                        </Col>
                      </Row>
                    ) : null}
                  </Col>
                </Row>
                {(() => {
                  if (orderData.bookingStatus === 'CONFIRMED') {
                    return (
                      <div style={{margin: '30px 0px'}}>
                        <Button className="bg-[#FF026614] bg-opacity-[8%] text-[#C6231A] rounded-[8px] w-[328px] h-[48px]" size={'large'} onClick={handleClickCancelOrder}>
                                                    Захиалга цуцлах
                        </Button>
                      </div>
                    );
                  } else if (orderData.bookingStatus !== 'PENDING_PAYMENT') {
                    return (
                      <div>
                        <Divider />
                        <Row style={{marginTop: '30px'}}>
                          <Col span={12} style={{fontWeight: 'bold', fontSize: '14px', lineHeight: '24px'}}>
                            <div >Нийт захиалгын төлбөр:</div>
                          </Col>
                          <Col span={12} style={{fontWeight: 'bold', fontSize: '14px', lineHeight: '24px', textAlign: 'right', fontSize: '20px'}}>
                            {orderData.totalPrice ? Helper.formatValueReverse(orderData.totalPrice) : 0}
                                                        ₮
                          </Col>
                        </Row>
                        <Row style={{margin: '30px 0px'}}>
                          <Col span={24} >
                            <Tabs defaultActiveKey="1">
                              <TabPane tab="Хэтэвч" key="1">
                                <div className=" ml-[24px]"> <WalletCard /></div>
                                <Row style={{marginTop: '35px'}}>
                                  <Col span={24}>
                                    <Button className="w-[372px] rounded-[8px]" type="primary" size={'large'} >
                                                                            Төлөх
                                    </Button>
                                  </Col>
                                </Row>
                              </TabPane>
                              <TabPane tab="Дансаар" key="2">
                                <div>
                                  <Tabs
                                    centered
                                    defaultActiveKey="1"
                                    onChange={handleClickBankLogo}
                                  >
                                    {tabItems.map((tabitem) => (
                                      <TabPane
                                        key={tabitem.type}
                                        tab={
                                          <span>
                                            <Image
                                              height={30}
                                              width={30}
                                              preview={false}
                                              src={tabitem.src}
                                            />
                                          </span>
                                        }
                                      >
                                        <div>
                                          <WalletBankInfo
                                            value={
                                              data && data.accountNumber ? data.accountNumber : 0
                                            }
                                          >
                                                Дансны дугаар
                                          </WalletBankInfo>
                                          <WalletBankInfo
                                            value={
                                              data && data.accountName ? data.accountName : 0
                                            }
                                          >
                                                 Хүлээн авагч
                                          </WalletBankInfo>
                                          <WalletBankInfo
                                            value={data && data.description ? data.description : 0}
                                          >
                        Гүйлгээний утга
                                          </WalletBankInfo>
                                        </div>
                                      </TabPane>
                                    ))}
                                  </Tabs>
                                </div>
                              </TabPane>
                              <TabPane tab="Нэхэмжлэх" key="3">
                                <div>
                                  <Tabs centered defaultActiveKey="1">
                                    <TabPane
                                      tab={
                                        <span
                                          onClick={() => {
                                            settype2('MONGOLCHAT');
                                          }}
                                        >
                                          <Image
                                            height={30}
                                            width={30}
                                            preview={false}
                                            src="../../../images/icon/mongolChat.png"
                                          />
                                        </span>
                                      }
                                      key="1"
                                    >
                                      <div>
                                        <WalletInput onChangeInput={onChangeInput}>
                      Цэнэглэх дүн
                                        </WalletInput>
                                      </div>
                                    </TabPane>
                                    <TabPane
                                      tab={
                                        <span
                                          onClick={() => {
                                            settype2('LENDMN');
                                          }}
                                        >
                                          <Image
                                            height={30}
                                            width={30}
                                            preview={false}
                                            src="../../../images/icon/lendMn.png"
                                          />
                                        </span>
                                      }
                                      key="2"
                                    >
                                      <WalletInput onChangeInput={onChangeInputPhone}>
                    Утасны дугаар
                                      </WalletInput>
                                      <WalletInput onChangeInput={onChangeInput}>
                    Цэнэглэх дүн
                                      </WalletInput>
                                    </TabPane>
                                    <TabPane
                                      tab={
                                        <span
                                          onClick={() => {
                                            settype2('SOCIALPAY');
                                          }}
                                        >
                                          <Image
                                            height={30}
                                            width={30}
                                            preview={false}
                                            src="../../../images/icon/socialPay.png"
                                          />
                                        </span>
                                      }
                                      key="3"
                                    >
                                      <WalletInput onChangeInput={onChangeInput}>
                                            Цэнэглэх дүн
                                      </WalletInput>
                                    </TabPane>
                                  </Tabs>
                                  <Button className="rounded-[8px]" onClick={() => fetchData2()} type="primary" block>
                                                 Нэхэмжлэл илгээх
                                  </Button>
                                </div>
                              </TabPane>
                            </Tabs>
                          </Col>
                        </Row></div>
                    );
                  } else if (orderData.bookingStatus === 'CONFIRMED' && (compareDate(moment().format('YYYY-MM-DD HH-mm-ss'), orderData.startDateTime) === 1)) {
                    console.log(orderData.startDateTime, 'timeeeeeeeeeeeee');
                    return (
                      <div style={{margin: '30px 0px'}}>
                        <Button type="primary" size={'large'} block>
                                Зогсоолыг үнэлэх
                        </Button>
                      </div>
                    );
                  }
                })()}
              </TabPane>
              <TabPane tab="Үнэлгээ" key="2">
                                Үнэлгээ
              </TabPane>
              <TabPane tab="Тусламж" key="3">
                <div className="mb-[30px]"><SettingPane /></div>

              </TabPane>
            </Tabs>
          </Col>
          {/* </Sider>
          </Col> */}
          {/* </Layout> */}
        </Row>
      </Layout>
      <Modal title="Захиалга цуцлах" visible={isModalVisibleCancelOrder} onOk={handleOkCancelOrder} onCancel={handleCancelCancelOrder} footer={[
        <Button key="back" type="primary" size="large" onClick={handleClickCancelOrderContinue} block>
                    Үргэлжлүүлэх
        </Button>,
      ]}>
        <div>
                    Цуцлах захиалгын эхлэх өдрийг сонгоно уу
        </div>
        <CustomCalendar style={{marginTop: '10px'}} selectedDate={selectedDate} selectType="single" getSelectedDate={getSelectedDate} />

        <div style={{fontWeight: 'bold', fontSize: '14px', color: '#141A29', marginTop: '30px'}}>
                    Таны цуцлах захиалга:
        </div>
        <div>
          {fromSelectedDate && fromSelectedDate.length > 0 ?
            moment(fromSelectedDate[0]).format('YYYY-MM-DD') + '-ны ' + time + ' хойшхи захиалга цуцлагдана!' :
            null}
        </div>
        <Row style={{fontSize: '14px', color: '#35446D', marginTop: '10px'}}>
          <Col span={8}> Өдөр: &nbsp;
            {orderData.totalAtDay ? orderData.totalAtDay : 0}</Col>
          <Col span={8}> Шөнө: &nbsp;
            {orderData.totalAtNight ? orderData.totalAtNight : 0}</Col>
          <Col span={8}> Бүтэн өдөр: &nbsp;
            {orderData.totalAtDay ? orderData.totalAllDay : 0}</Col>
        </Row>
        <Divider />
        <Row style={{fontWeight: 'bold', fontSize: '14px', color: '#141A29', marginTop: '30px'}}>
          <Col span={12}>Нийт цуцлах захиалгын төлбөр:</Col>
          <Col span={12} style={{textAlign: 'right'}}>{orderData.totalPrice ? Helper.formatValueReverse(orderData.totalPrice) : 0}₮</Col>
        </Row>
      </Modal>

      <Modal title="Захиалга цуцлах" visible={isModalVisibleCancelOrderConfirm} onOk={handleOkCancelOrderConfirm} onCancel={handleCancelCancelOrderConfirm} footer={[
        <Button key="back" type="primary" size="large" onClick={handleClickConfirm} block>
                    Үргэлжлүүлэх
        </Button>,
      ]}>
        <Row>
          <Col span={12}>Нийт цуцлах захиалгын төлбөр</Col>
          <Col span={12}>{Helper.formatValueReverse(orderData.totalPrice)}₮</Col>
        </Row>
        <Row>
          <Col span={12}>Захиалга цуцалсны шимтгэл</Col>
          <Col span={12}>{Helper.formatValueReverse(orderData.totalPrice) - Helper.formatValueReverse(orderData.returnAmount)}₮</Col>
        </Row>
        <Divider />
        <Row>
          <Col span={12}>Буцаалт</Col>
          <Col span={12}>{Helper.formatValueReverse(orderData.returnAmount)}₮</Col>
        </Row>

      </Modal>
      <Modal
        visible={messageShow}
        title="Мэдээлэл"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <Alert message={title} description={message} type={status} showIcon />
      </Modal>
    </DefaultLayout >

  );
};

export default OrderId;
