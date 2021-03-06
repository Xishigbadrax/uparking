import DefaultLayout from '@components/layouts/DefaultLayout';
import {
  Layout,
  Button,
  Carousel,
  Image,
  Row,
  Col,
  Rate,
  Divider,
  Calendar,
  Modal,
  Alert,
  // Calendar,
} from 'antd';
import {calendarLocale} from '@constants/constants.js';
import {
  LeftOutlined,
  CheckCircleOutlined,
  DownOutlined,
  UpOutlined,
  // CodeSandboxCircleFilled,
} from '@ant-design/icons';
import DayNightColumn from '@components/DayNightColumn';
import {useEffect, useState, useContext} from 'react';
import {callGet, callPost} from '@api/api';
import {useRouter} from 'next/router';
import Context from '@context/Context';

// import {useRouter} from 'next/router';
import Helper from '@utils/helper';
import Link from 'next/link';
import {showMessage} from '@utils/message';
import {messageType, defaultMsg} from '@constants/constants';

import {Tabs} from 'antd';
import WalletCard from '@components/WalletCard';
import WalletBankInfo from '@components/WalletBankInfo';
// import {calendarLocale} from '@constants/constants.js';
import moment from 'moment';
// import Calendar from 'react-calendar';
moment.updateLocale('mn', {
  weekdaysMin: ['НЯ', 'ДА', 'МЯ', 'ЛХ', 'ПҮ', 'БА', 'БЯ'],
});

const {TabPane} = Tabs;

const {Header, Sider} = Layout;

const IMG_URL = process.env.NEXT_PUBLIC_IMAGE_URL;
const Payment = ( ) => {
  const {userdata} = useContext(Context);
  const ctx = useContext(Context);
  const router = useRouter();
  const [orderData, setOrderData] = useState(null);
  const [images, setImages] = useState([]);
  const [parkingUpDownArrow, setParkingUpDownArrow] = useState(false);
  const [bankData, setBankData] = useState(null);
  const [type, settype] = useState('KHANBANK');
  const [type2, settype2] = useState('MONGOLCHAT');
  const [amount, setamount] = useState(0);
  const [bookingData, setBookingData] = useState(null);
  const [FreeTimeVisible, setFreeTimeVisible] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [startDateTime, setStartDateTime]= useState();
  // const [test, setTest] = useState(null);
  const [phoneNumber, setphoneNumber] = useState(null);
  const {id, bookingId} = router.query;
  // const {startDate}=router.query;
  // const orderId = id;
  // eslint-disable-next-line no-unused-vars
  const [formData, setformData] = useState({
    amount: null,
    phoneNumber: null,
  });
  const [message, setmessage] = useState('');
  const [status, setstatus] = useState('');
  const [title, settitle] = useState('');
  const [messageShow, setmessageShow] = useState(false);

  const getListData = (value) =>{
    const array = [];
    // dayOfWeek.map((item) => {
    //   switch (item.day) {
    //   case value.day():
    //     if (item.spaceStatusCode === 'Боломжтой') {
    //       array.push({
    //         type: item.spaceStatusCode,
    //         content: item.timeSplitDescription,
    //       });
    //     }
    //     if (item.spaceStatusCode === 'Боломжгүй') {
    //       array.push({
    //         type: item.spaceStatusCode,
    //         content: item.timeSplitDescription,
    //       });
    //     }
    //     break;
    //   default:
    //   }
    // });
    return array || [];
  };
  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content} style={{height: '15px'}}>
            <span
              style={{fontSize: '10px'}}
              className={item.type === 'Боломжтой' ? 'Success' : 'NotSuccess'}
            >
              {item.type}
            </span>
          </li>
        ))}
      </ul>
    );
  };

  const getMonthData = (value) => {
    if (value.month() === 8) {
      return 1394;
    }
  };
  // const onChangeBla = (e) => {
  //   props.setRentData(dayOfWeek);
  //   setsundayMorning(e), setChecked(2);
  // };
  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month" style={{height: '50px'}}>
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };
  const handleCancel = () => {
    setFreeTimeVisible(false);
    setmessageShow(false);
  };
  useEffect(async () => {
    // setStartDateTime(router.query.startDateTime);
    ctx.setIsLoading(true);
    await callGet(`/parkingspace?parkingSpaceId=${id}`).then((res) => {
      if (!res || res === undefined) {
        showMessage(messageType.FAILED.type, defaultMsg.dataError);
      } else {
        res && setOrderData(res);
        setImages([]);
        if (!Helper.isNullOrEmpty(res.imageFromGate)) {
          setImages((images) => [...images, {id: 4, path: res.imageFromGate}]);
        }

        if (!Helper.isNullOrEmpty(res.imageParkingOverall)) {
          setImages((images) => [
            ...images,
            {id: 5, path: res.imageParkingOverall},
          ]);
        }
        if (!Helper.isNullOrEmpty(res.imageResidenceGate)) {
          setImages((images) => [
            ...images,
            {id: 6, path: res.imageResidenceGate},
          ]);
        }
        if (!Helper.isNullOrEmpty(res.imageSpaceNumber)) {
          setImages((images) => [
            ...images,
            {id: 7, path: res.imageSpaceNumber},
          ]);
        }
        if (!Helper.isNullOrEmpty(res.imageSpaceNumber)) {
          setImages((images) => [
            ...images,
            {id: 8, path: res.imageSpaceNumber},
          ]);
        }
      }
      ctx.setIsLoading(false);
    });
    const res = await callGet(`/booking/id/test?id=${bookingId}&asWho=1`);
    setBookingData(res);
  }, [id, bookingId]);
  useEffect(() => {
    fetchData();
  }, [type]);


  const fetchData = async () => {
    await callGet(`/payment/bankinfo?bankName=${type}`).then((res) => {
      setBankData(res);
    });
  };


  // useEffect(() => {
  //   const fetchData4 = async () => {
  //     await callGet(`/parkingspace?parkingSpaceId=${id}`).then((res) => {
  //       res && setOrderData(res);
  //     });
  //   };
  //   fetchData4();
  // }, [id]);

  const fetchData2 = async () => {
    if (amount != 0) {
      const formData2 = {
        amount: +amount,
        bookingId: null,
        topUp: true,
      };
      formData.amount = amount;
      formData.phoneNumber =
        type2 == 'LENDMN' ? phoneNumber : userdata.phoneNumber;
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

  // await callGet(`/parkingspace?parkingSpaceId=${id}`).then((res) => {
  //       res && setOrderData(res);
  //     });

  const onPaymentByWallet = async ()=>{
    // const res = await callPost()
  };
  const handleClickBankLogo = (activekey) => {
    settype(activekey);
  };

  const onChangeInput = (value) => {
    setamount(value);
  };
  const onChangeInputPhone = (value) => {
    setphoneNumber(value);
  };
  const handleOk = () => {
    setmessageShow(false);
  };


  return (

    <DefaultLayout>

      <Header style={{padding: '0px'}}>
        <Link href={{pathname: '/park/profile/order/'}} passHref>
          <Button
            type="primary"
            shape="circle"
            icon={<LeftOutlined />}
            size={'large'}
          />
        </Link>
        <span
          style={{
            fontSize: '20px',
            lineHeight: '24px',
            color: '#0013D4',
            marginLeft: '20px',
          }}
        >
          Хадгалсан захиалга
        </span>
      </Header>

      <Row>
        <Col span={14}>
          {images.length > 0 ? (
            <Carousel className='ImagesCarousel'>
              {images.map((image) => (
                <div key={image.id}>
                  <Image
                    preview={false}
                    width='100%'
                    height={468}
                    // src={IMG_URL + image.path}
                    src={'data:image/jpeg;base64,' + image.path}
                  />
                </div>
              ))}
            </Carousel>
          ) : null}
          <Row style={{marginTop: '24px'}}>
            <Col span={8}>
              <div style={{display: 'flex'}}>
                <div style={{fontSize: '20px'}}>
                  <strong>
                    { orderData != null && !Helper.isNullOrEmpty(orderData.residenceName) ?
                      orderData.residenceName :
                      null}
                  </strong>
                </div>
                <div style={{marginLeft: '10px'}}><div style={{height: '15px', width: '15px'}}>
                  <CheckCircleOutlined
                    style={{
                      color: 'white',
                      backgroundColor: 'green',
                      borderRadius: '10px',
                      marginLeft: '1.5px',
                    }}
                  />
                </div></div>
              </div>
              <div><Rate value={3}/></div>
            </Col>
            <Col span={6} >
              <Row>
                <div
                  style={{
                    height: '24px',
                    width: '24px',
                    marginTop: '5px',
                  }}
                >
                  <Image
                    preview={false}
                    src="/directions_car_24px.png"
                    height="16px"
                    width="16px"
                  />
                </div>
                <p style={{marginTop: '5px'}}> 110 м</p>
              </Row>
              <div className=" flex items-center">
                <div
                  style={{
                    width: '75px',
                    fontSize: '12px',
                    textAlign: 'center',
                    marginTop: '5px',
                    fontStyle: 'regular',
                    color: '#7D8FC0',
                  }}
                >
                    Байршил ID:
                </div>
                <div className=" text-[12px] text-[#35446D] mt-[4px]"> {bookingData && bookingData.residenceBlockId}</div>
              </div>


              {/* <p
                style={{
                  width: '43px',
                  fontSize: '12px',
                  marginTop: '12px',
                }}
              >
                {bookingData.residenceBlockId}
              </p> */}
            </Col>
            <Col
              span={8} style={{display: 'flex'}}
            >
              <div
                style={{
                  height: '24px',
                  width: '24px',

                }}
              >
                <Image
                  preview={false}
                  src="/icons/location_on_24px.png"
                  height="24px"
                  width="24px"
                />
              </div>
              <p>
                { orderData && `${orderData.provinceLabel} ${orderData.districtLabel} ${orderData.sectionLabel} ${orderData.residenceName} ${orderData.residenceBlockNumber}` }</p></Col>
          </Row>
          <Row justify="center" style={{padding: '20px 10px'}}>
            <Col
              span={10}
              style={{
                background: 'rgba(222, 226, 233, 0.2)',
                borderRadius: '24px',
                padding: '13px 23px',
                display: 'inline-flex',
                textAlign: 'center',
                justifyContent: 'center',
              }}
            >
              {bookingData && bookingData.floorNumber ? (
                <div style={{marginRight: '13px'}}>
                  <Image
                    preview={false}
                    width={24}
                    src={IMG_URL + bookingData.floorNumber}
                  />
                </div>
              ) : null}
              {bookingData && bookingData.entranceLock ? (
                <div style={{marginRight: '13px'}}>
                  <Image
                    preview={false}
                    width={24}
                    src={IMG_URL + bookingData.entranceLock}
                  />
                </div>
              ) : null}
              {bookingData && bookingData.isNumbering ? (
                <div style={{marginRight: '13px'}}>
                  <Image
                    preview={false}
                    width={24}
                    src={IMG_URL + bookingData.isNumbering}
                  />
                </div>
              ) : null}
              {bookingData && bookingData.capacity ? (
                <div style={{marginRight: '13px'}}>
                  <Image
                    preview={false}
                    width={24}
                    src={IMG_URL + bookingData.capacity}
                  />
                </div>
              ) : null}
              {bookingData && bookingData.type ? (
                <div style={{marginRight: '13px'}}>
                  <Image
                    preview={false}
                    width={24}
                    src={IMG_URL + bookingData.type}
                  />
                </div>
              ) : null}
              {bookingData && bookingData.returnRoutes ? (
                <div style={{marginRight: '13px'}}>
                  <Image
                    preview={false}
                    width={24}
                    src={IMG_URL + bookingData.returnRoutes}
                    // src={orderData.returnRoutes}
                  />
                </div>
              ) : null}
              <div>
                {!parkingUpDownArrow ? (
                  <DownOutlined onClick={() => setParkingUpDownArrow(true)} />
                ) : (
                  <UpOutlined onClick={() => setParkingUpDownArrow(false)} />
                )}
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              {parkingUpDownArrow ? (
                <div>
                  {orderData || bookingData.floorNumber ? (
                    <div style={{marginRight: '13px', display: 'flex'}}>
                      <Image
                        preview={false}
                        width={24}
                        src={IMG_URL + bookingData.floorNumber}
                      />
                      <div style={{marginLeft: '25px'}}>
                        <span>{bookingData.floorNumberLabel}</span>
                      </div>
                    </div>
                  ) : null}
                  {bookingData || bookingData.entranceLock ? (
                    <div style={{marginRight: '13px', display: 'flex'}}>
                      <Image
                        preview={false}
                        width={24}
                        src={IMG_URL + bookingData.entranceLock}
                      />
                      <div style={{marginLeft: '25px'}}>
                        <span>{bookingData.entranceLockLabel}</span>
                      </div>
                    </div>
                  ) : null}
                  {bookingData || bookingData.isNumbering ? (
                    <div style={{marginRight: '13px', display: 'flex'}}>
                      <Image
                        preview={false}
                        width={24}
                        src={IMG_URL + bookingData.isNumbering}
                      />
                      <div style={{marginLeft: '25px'}}>
                        <span>{bookingData.isNumberingLabel}</span>
                      </div>
                    </div>
                  ) : null}
                  {bookingData || bookingData.capacity ? (
                    <div style={{marginRight: '13px', display: 'flex'}}>
                      <Image
                        preview={false}
                        width={24}
                        src={IMG_URL + bookingData.capacity}
                      />
                      <div style={{marginLeft: '25px'}}>
                        <span>{bookingData.capacityLabel}</span>
                      </div>
                    </div>
                  ) : null}
                  {bookingData || bookingData.type ? (
                    <div style={{marginRight: '13px', display: 'flex'}}>
                      <Image
                        preview={false}
                        width={24}
                        src={IMG_URL + bookingData.type}
                      />
                      <div style={{marginLeft: '25px'}}>
                        <span>{bookingData.typeLabel}</span>
                      </div>
                    </div>
                  ) : null}
                  {bookingData || bookingData.returnRoutes ? (
                    <div style={{marginRight: '13px', display: 'flex'}}>
                      <Image
                        preview={false}
                        width={24}
                        src={IMG_URL + bookingData.returnRoutes}
                      />
                      <div style={{marginLeft: '25px'}}>
                        <span>{bookingData.returnRoutesLabel}</span>
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </Col>
          </Row>
        </Col>
        <Col offset={1}>
          <Sider style={{overflow: 'hidden'}} width={400}>
            <Row style={{marginTop: '30px'}}>
              <Col
                span={24}
                style={{
                  fontWeight: 'bold',
                  fontSize: '14px',
                  lineHeight: '24px',
                }}
              >
                <div style={{color: '#0013D4'}}>Таны сонгосон захиалга:</div>

                { bookingData != null &&
                  <div>
                    <div style={{color: '#35446d'}}>
                    Өдөр: {bookingData.totalAtDay}
                    </div>
                    <div style={{color: '#35446d'}}>
                   Шөнө: {bookingData.totalAtNight}
                    </div>
                    <div style={{color: '#35446d'}}>
                    Бүтэн өдөр: {bookingData.totalAllDay}
                    </div>
                  </div>


                }
              </Col>
            </Row>


            {(() => {
              if (orderData) {
                return (
                  <div>
                    <Divider />
                    <Row style={{marginTop: '30px'}}>
                      <Col
                        span={12}
                        style={{
                          fontWeight: 'bold',
                          fontSize: '14px',
                          lineHeight: '24px',
                        }}
                      >
                        <div>Нийт захиалгын төлбөр:</div>
                      </Col>
                      <Col
                        span={12}
                        style={{
                          fontWeight: 'bold',
                          fontSize: '14px',
                          lineHeight: '24px',
                          textAlign: 'right',
                          fontSize: '20px',
                        }}
                      >
                        {bookingData && bookingData.totalPrice ?
                          Helper.formatValueReverse(bookingData.totalPrice) :
                          0}
                    ₮
                      </Col>

                    </Row>
                    <Col>
                      <Button onClick={()=>setFreeTimeVisible(true)} className=" mt-[19px] rounded-[8px] bg-[#0013D4]  bg-opacity-[8%] text-[#0013D4] border-[#0013D4]" size={'large'} block>
                      Сонгосон цаг харах
                      </Button>

                    </Col>
                    <Row style={{margin: '30px 0px'}}>
                      <Col span={24}>
                        <Tabs defaultActiveKey="1">
                          <TabPane tab={<div style={{width: '100px'}}><p style={{marginLeft: '25px'}}>Хэтэвч</p></div>} key="1" >
                            <div className="ml-[24px]">
                              <WalletCard />
                            </div>
                            <Row style={{marginTop: '35px'}}>
                              <Col span={24}>
                                <Button className="rounded-[8px] w-[372px]" type="primary" size={'large'} block onClick={onPaymentByWallet}>
                              Төлөх
                                </Button>
                              </Col>
                            </Row>
                          </TabPane>
                          <TabPane tab={<div style={{width: '100px'}}><p style={{marginLeft: '25px'}}>Дансаар</p></div>} key="2">
                            <div>
                              <Tabs
                                centered
                                onChange={handleClickBankLogo}
                                defaultActiveKey="1"
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
                                          bankData != null && bankData.accountNumber ?
                                            bankData.accountNumber :
                                            0
                                        }
                                      >
                                    Дансны дугаар
                                      </WalletBankInfo>
                                      <WalletBankInfo
                                        value={
                                          bankData && bankData.accountName ?
                                            bankData.accountName :
                                            0
                                        }
                                      >
                                    Хүлээн авагч
                                      </WalletBankInfo>
                                      <WalletBankInfo
                                        value={
                                          bankData && bankData.description ?
                                            bankData.description :
                                            0
                                        }
                                      >
                                    Гүйлгээний утга
                                      </WalletBankInfo>
                                    </div>
                                  </TabPane>
                                ))}
                              </Tabs>
                            </div>
                          </TabPane>
                          <TabPane tab={<div style={{width: '100px'}}><p style={{marginLeft: '30px'}}>Нэхэмжлэх</p></div>} key="3">
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
                                        src="../../images/icon/mongolChat.png"
                                      />
                                    </span>
                                  }
                                  key="1"
                                >
                                  <div>
                                    <WalletBankInfo
                                      onChangeInput={onChangeInput}
                                    >
                                  Цэнэглэх дүн
                                    </WalletBankInfo>
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
                                        src="../../images/icon/lendMn.png"
                                      />
                                    </span>
                                  }
                                  key="2"
                                >
                                  <WalletBankInfo
                                    onChangeInput={onChangeInputPhone}
                                  >
                                Нэхэмжлэх илгээх утасны дугаар
                                  </WalletBankInfo>
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
                                        src="../../images/icon/socialPay.png"
                                      />
                                    </span>
                                  }
                                  key="3"
                                >
                                  <WalletBankInfo onChangeInput={onChangeInput}>
                                Цэнэглэх дүн
                                  </WalletBankInfo>
                                </TabPane>
                              </Tabs>
                              <Button
                                className=" rounded-[8px] h-[48px]"
                                onClick={() => fetchData2()}
                                type="primary"
                                block
                              >
                            Нэхэмжлэл илгээх
                              </Button>
                            </div>
                          </TabPane>
                        </Tabs>
                      </Col>
                    </Row>
                  </div>
                );
              } else if ( orderData ) {
                return (
                  <div style={{margin: '30px 0px'}}>
                    <Button type="primary" size={'large'} block>
                  Зогсоолыг үнэлэх
                    </Button>
                  </div>
                );
              }
            })()}
          </Sider>
        </Col>
      </Row>

      <Modal
        visible={messageShow}
        title="Мэдээлэл"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <Alert message={title} description={message} type={status} showIcon />
      </Modal>
      <Modal visible={FreeTimeVisible}
        title='сул цаг харах'
        width={1000}
        onOk={handleCancel}
        onCancel={handleCancel}
        footer={[]}>

        <Col>
          <Row style={{width: '720px'}} className={'rentDate'}>
            <Col span={2}>
              <DayNightColumn className={'rentCalendarDayNightText'} />
            </Col>
            <Col span={20}>
              <Calendar
                className={'rentDateCalendar'}
                dateCellRender={dateCellRender}
                locale={calendarLocale}
                monthCellRender={monthCellRender}
              />
            </Col>
          </Row>
        </Col>
      </Modal>
    </DefaultLayout>
  );
};

const tabItems = [
  {
    id: 1,
    name: 'Хаан банк',
    type: 'KHANBANK',
    src: '../../images/icon/khanbank.png',
  },
  {
    id: 2,
    name: 'Хас банк',
    type: 'KHASBANK',
    src: '../../images/icon/xac.png',
  },
  {
    id: 3,
    name: 'Голомт банк',
    type: 'GOLOMTBANK',
    src: '../../images/icon/golomt.png',
  },
  {
    id: 4,
    name: 'Худалдаа хөгжлийн банк',
    type: 'TDB',
    src: '../../images/icon/tdb.png',
  },
];

export default Payment;
