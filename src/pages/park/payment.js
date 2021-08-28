import DefaultLayout from '@components/layouts/DefaultLayout';
import {
  Layout,
  Button,
  Carousel,
  Image,
  Row,
  Col,
  Divider,
  Modal,
  Alert,
  // Calendar,
} from 'antd';
import {
  LeftOutlined,
  DownOutlined,
  UpOutlined,
  // CodeSandboxCircleFilled,
} from '@ant-design/icons';
import {useEffect, useState, useContext} from 'react';
import {callGet, callPost} from '@api/api';
import Context from '@context/Context';
// import {useRouter} from 'next/router';
import Helper from '@utils/helper';
import Link from 'next/link';

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

const {Header, Sider, Content} = Layout;

const IMG_URL = process.env.NEXT_PUBLIC_IMAGE_URL;
const style = {
  border: '1px solid #DEE2E9',
  borderRadius: '8px',
  padding: '5px 10px',
};

const Payment = () => {
  const {userdata} = useContext(Context);
  const ctx = useContext(Context);
  // eslint-disable-next-line no-unused-vars
  const [orderData, setOrderData] = useState({
    residenceName: 'Маршал хотхон',
    province: 'Улаанбаатар',
    district: 'Хан-Уул',
    section: '5-р хороо',
    residenceBlockNumber: '67',
    totalAtDay: '2',
    returnRoutes:
      'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    bookingStatus: 'SAVED',
    totalPrice: '16000',
  });
  const [images, setImages] = useState([]);
  const [parkingUpDownArrow, setParkingUpDownArrow] = useState(false);
  const [bankData, setBankData] = useState(null);
  const [type, settype] = useState('KHANBANK');
  const [type2, settype2] = useState('MONGOLCHAT');
  const [amount, setamount] = useState(0);
  const [phoneNumber, setphoneNumber] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [formData, setformData] = useState({
    amount: null,
    phoneNumber: null,
  });
  const [message, setmessage] = useState('');
  const [status, setstatus] = useState('');
  const [title, settitle] = useState('');
  const [messageShow, setmessageShow] = useState(false);

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    fetchData();
  }, [type]);

  const fetchData = async () => {
    await callGet(`/payment/bankinfo?bankName=${type}`).then((res) => {
      setBankData(res);
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

  const getData = async () => {
    // const orderId = router.query.id;
    ctx.setIsLoading(true);
    const res = await callGet(`/booking/id/test?id=${497}&asWho=1`);
    console.log(res, 'resresres');
    if (!res || res === undefined) {
      showMessage(messageType.FAILED.type, defaultMsg.dataError);
    } else {
      //   setOrderData({});
      setImages([]);
      // if (!Helper.isNullOrEmpty(res.imageFromGate)) {
      setImages((images) => [
        ...images,
        {
          id: 4,
          path: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
      ]);
      // }
      //   if (!Helper.isNullOrEmpty(res.imageParkingOverall)) {
      //     setImages((images) => [
      //       ...images,
      //       { id: 5, path: res.imageParkingOverall },
      //     ]);
      //   }
      //   if (!Helper.isNullOrEmpty(res.imageResidenceGate)) {
      //     setImages((images) => [
      //       ...images,
      //       { id: 6, path: res.imageResidenceGate },
      //     ]);
      //   }
      //   if (!Helper.isNullOrEmpty(res.imageSpaceNumber)) {
      //     setImages((images) => [
      //       ...images,
      //       { id: 7, path: res.imageSpaceNumber },
      //     ]);
      //   }
      //   if (!Helper.isNullOrEmpty(res.imageSpaceNumber)) {
      //     setImages((images) => [
      //       ...images,
      //       { id: 8, path: res.imageSpaceNumber },
      //     ]);
      //   }
    }
    ctx.setIsLoading(false);
  };


  ndleClickBankLogo = (activekey) => {
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

  const handleCancel = () => {
    setmessageShow(false);
  };
  return (
    <DefaultLayout>
      <Layout style={{overflow: 'hidden'}}>
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
        <Layout style={{padding: '0px 0px 0px 60px'}}>
          <Content>
            {images.length > 0 ? (
              <Carousel>
                {images.map((image) => (
                  <div key={image.id}>
                    <Image
                      preview={false}
                      width={468}
                      //   src={IMG_URL + image.path}
                      src={image.path}
                    />
                  </div>
                ))}
              </Carousel>
            ) : null}
            <Row style={{marginTop: '24px'}}>
              <Col span={12}>
                <div style={{fontSize: '20px'}}>
                  <strong>
                    {!Helper.isNullOrEmpty(orderData.residenceName) ?
                      orderData.residenceName :
                      null}
                  </strong>
                </div>
                {/* <div>rating</div> */}
              </Col>
              {/* <Col span={6}>2</Col> */}
              <Col
                span={12}
              >{`${orderData.province}, ${orderData.district}, ${orderData.section}, ${orderData.residenceName}, ${orderData.residenceBlockNumber}`}</Col>
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
                {orderData && orderData.floorNumber ? (
                  <div style={{marginRight: '13px'}}>
                    <Image
                      preview={false}
                      width={24}
                      src={IMG_URL + orderData.floorNumber}
                    />
                  </div>
                ) : null}
                {orderData && orderData.entranceLock ? (
                  <div style={{marginRight: '13px'}}>
                    <Image
                      preview={false}
                      width={24}
                      src={IMG_URL + orderData.entranceLock}
                    />
                  </div>
                ) : null}
                {orderData && orderData.isNumbering ? (
                  <div style={{marginRight: '13px'}}>
                    <Image
                      preview={false}
                      width={24}
                      src={IMG_URL + orderData.isNumbering}
                    />
                  </div>
                ) : null}
                {orderData && orderData.capacity ? (
                  <div style={{marginRight: '13px'}}>
                    <Image
                      preview={false}
                      width={24}
                      src={IMG_URL + orderData.capacity}
                    />
                  </div>
                ) : null}
                {orderData && orderData.type ? (
                  <div style={{marginRight: '13px'}}>
                    <Image
                      preview={false}
                      width={24}
                      src={IMG_URL + orderData.type}
                    />
                  </div>
                ) : null}
                {orderData && orderData.returnRoutes ? (
                  <div style={{marginRight: '13px'}}>
                    <Image
                      preview={false}
                      width={24}
                      // src={IMG_URL + orderData.returnRoutes}
                      src={orderData.returnRoutes}
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
                    {orderData && orderData.floorNumber ? (
                      <div style={{marginRight: '13px', display: 'flex'}}>
                        <Image
                          preview={false}
                          width={24}
                          src={IMG_URL + orderData.floorNumber}
                        />
                        <div style={{marginLeft: '25px'}}>
                          <span>{orderData.floorNumberLabel}</span>
                        </div>
                      </div>
                    ) : null}
                    {orderData && orderData.entranceLock ? (
                      <div style={{marginRight: '13px', display: 'flex'}}>
                        <Image
                          preview={false}
                          width={24}
                          src={IMG_URL + orderData.entranceLock}
                        />
                        <div style={{marginLeft: '25px'}}>
                          <span>{orderData.entranceLockLabel}</span>
                        </div>
                      </div>
                    ) : null}
                    {orderData && orderData.isNumbering ? (
                      <div style={{marginRight: '13px', display: 'flex'}}>
                        <Image
                          preview={false}
                          width={24}
                          src={IMG_URL + orderData.isNumbering}
                        />
                        <div style={{marginLeft: '25px'}}>
                          <span>{orderData.isNumberingLabel}</span>
                        </div>
                      </div>
                    ) : null}
                    {orderData && orderData.capacity ? (
                      <div style={{marginRight: '13px', display: 'flex'}}>
                        <Image
                          preview={false}
                          width={24}
                          src={IMG_URL + orderData.capacity}
                        />
                        <div style={{marginLeft: '25px'}}>
                          <span>{orderData.capacityLabel}</span>
                        </div>
                      </div>
                    ) : null}
                    {orderData && orderData.type ? (
                      <div style={{marginRight: '13px', display: 'flex'}}>
                        <Image
                          preview={false}
                          width={24}
                          src={IMG_URL + orderData.type}
                        />
                        <div style={{marginLeft: '25px'}}>
                          <span>{orderData.typeLabel}</span>
                        </div>
                      </div>
                    ) : null}
                    {orderData && orderData.returnRoutes ? (
                      <div style={{marginRight: '13px', display: 'flex'}}>
                        <Image
                          preview={false}
                          width={24}
                          src={IMG_URL + orderData.returnRoutes}
                        />
                        <div style={{marginLeft: '25px'}}>
                          <span>{orderData.returnRoutesLabel}</span>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </Col>
            </Row>
          </Content>
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
                {orderData.totalAtDay ? (
                  <div style={{color: '#35446d', marginLeft: '10px'}}>
                    Нийт {orderData.totalAtDay} өдөр
                  </div>
                ) : null}
              </Col>
            </Row>
            <Row gutter={16}>
              <Col className="gutter-row" span={12}>
                <div style={style}>
                  <div style={{color: '#0013D4'}}>Эхлэх хугацаа</div>
                  {orderData && orderData.startDateTime ? (
                    <div>{Helper.removeSec(orderData.startDateTime)}</div>
                  ) : null}
                </div>
              </Col>
              <Col className="gutter-row" span={12}>
                <div style={style}>
                  <div style={{color: '#0013D4'}}>Дуусах хугацаа</div>
                  {orderData && orderData.endDateTime ? (
                    <div>{Helper.removeSec(orderData.endDateTime)}</div>
                  ) : null}
                </div>
              </Col>
            </Row>

            {(() => {
              if (orderData.bookingStatus === 'SAVED') {
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
                        {orderData.totalPrice ?
                          Helper.formatValueReverse(orderData.totalPrice) :
                          0}
                        ₮
                      </Col>
                    </Row>
                    <Row style={{margin: '30px 0px'}}>
                      <Col span={24}>
                        <Tabs defaultActiveKey="1">
                          <TabPane tab="Хэтэвч" key="1">
                            <WalletCard />
                            <Row style={{marginTop: '35px'}}>
                              <Col span={24}>
                                <Button type="primary" size={'large'} block>
                                  Төлөх
                                </Button>
                              </Col>
                            </Row>
                          </TabPane>
                          <TabPane tab="Дансаар" key="2">
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
                                          bankData && bankData.accountNumber ?
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
              } else if (orderData.bookingStatus === 'HISTORY') {
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
        </Layout>
      </Layout>

      <Modal
        visible={messageShow}
        title="Мэдээлэл"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <Alert message={title} description={message} type={status} showIcon />
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
