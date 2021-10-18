import React from 'react';
import {useState, useEffect, useContext} from 'react';
import WalletLayout from '@components/layouts/WalletLayout';
// import WalletChart from '@components/WalletChart';
import WalletCard from '../../../../components/WalletCard';
// import WalletBankInfo2 from '@components/WalletBankInfo2';
import WalletBankInfo from '@components/WalletBankInfo';
import {Tabs, Image, Button, Modal, Alert, Divider,Row,Col} from 'antd';
import QRCode from "react-qr-code";

import {callGet, callPost} from '@api/api';
import Context from '@context/Context';
import WalletInput from '../../../../components/WalletInput';


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

const Charge = () => {
  const {userdata} = useContext(Context);
  const {TabPane} = Tabs;
  const pos = {
    display: 'flex',
    justifyContent: 'space-between',
  };
  const [type2, settype2] = useState('MONGOLCHAT');
  const [phoneNumber, setphoneNumber] = useState(null);
  const [amount, setamount] = useState(0);
  const [promoCode, setPromoCode] = useState(null);
  const [MongolChatResultData,setMongolChatResultData]= useState();
  const [type, settype] = useState('KHANBANK');
  const [data, setdata] = useState(null);
  const [message, setmessage] = useState('');
  const [status, setstatus] = useState('');
  const [title, settitle] = useState('');
  const [socialPayTransactionId,setSocialPayTransactionId]= useState(null);
  const [messageShow, setmessageShow] = useState(false);
  const [socialPayCheck,setSocialPayCheck] = useState(false);
  const [formData] = useState({
    amount: null,
    phoneNumber: null,
  });
  // eslint-disable-next-line no-unused-vars
  const [formData3, setformData3] = useState('');
  const checkSocialPay = async (id)=> {
    if(type2 === 'SOCIALPAY'){
      if(socialPayCheck){
          const timer = setInterval( async function (){
          const res = await callGet(`/checkpayment?transactionId=${socialPayTransactionId}`);
          if( res && res.status === 'success'){
              setSocialPayCheck(false);
              clearInterval(timer);
            }
          }, 10000);
      }else
    if(!socialPayCheck){
      setmessageShow(false);
    }
  }
}   
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
              setMongolChatResultData(res);
              setstatus('success');
              setmessageShow(true);
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
                  setSocialPayCheck(true);
                  setSocialPayTransactionId(res.transactionId);
                  checkSocialPay(res.transactionId);

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

  const fetchData3 = async () => {
    setformData3();
    const res = await callPost('/wallet/promocode', {
      promoCode: ' ' + promoCode,
    });
    // if (res.status == "failed") {
    //   settitle(res.status);
    //   setmessage(res.error);
    //   setstatus(res.status);
    //   setmessageShow(true);
    // } else {
    // settitle("Амжилттай");
    // setmessage("Таны Uwallet хэтэвч амжилттай цэнэглэлт хийгдлээ.");
    // setstatus("success");
    // setmessageShow(true);
    // }
  };

  useEffect(() => {
    fetchData();
  }, [type]);

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

  const handleCancel = () => {
    setmessageShow(false);
  };
  const onChangePromo = (value) => {
    setPromoCode(value);
  };
  return (
    <WalletLayout>
      <div style={pos}>
        <div>
          <WalletCard />
        </div>
        <div>
          {/* <WalletChart /> */}
        </div>
      </div>
      <div className="flex justify-between mt-[25px]">
        <div style={{height: '480px', width: '327px'}}>
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Дансаар" key="1">
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
            <TabPane tab="Нэхэмжлэх" key="2">
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
                          src="../../images/icon/lendMn.png"
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
                          src="../../images/icon/socialPay.png"
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
                <Button onClick={() => fetchData2()} type="primary" block style={{marginTop:'10px'}}>
                Нэхэмжлэл илгээх
                </Button>
              </div>
            </TabPane>
            <TabPane tab="Промо код" key="3">
              <WalletInput onChangeInput={onChangePromo}>
              Промо код
              </WalletInput>
              <Button onClick={() => fetchData3()} type="primary" block style={{marginTop:'10px'}}>
              Идэвхжүүлэх
              </Button>
            </TabPane>
          </Tabs>
        </div>
        <div>
          <Image preview={false} width={529} height={480} src="../../ad.png" />
        </div>
      </div>

      <Modal
          visible={messageShow}
          title="Мэдээлэл"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[]}
        > 
        {type2 !=='MONGOLCHAT' &&
          <Alert message={title} description={message} type={status} showIcon style={{padding:'20px'}}/>
                  }
          {type2 ==='MONGOLCHAT' && <div>
          <Row style={{marginTop:'20px'}}>
            <Col offset={5}>
              <QRCode value={MongolChatResultData && MongolChatResultData.qr}/>
            </Col>
          </Row>
          <Row> <Col offset={7}>QR-кодоо уншуулна уу?</Col></Row>
          </div>
        }
        <Row style={{marginTop:'20px'}}>
          <Col offset={8}>
            <Button style={{width:'100px'}} type='primary' onClick={()=>  setmessageShow(false)}>OK</Button>
         </Col>
        </Row>
        </Modal>
    </WalletLayout>
  );
};

export default Charge;
