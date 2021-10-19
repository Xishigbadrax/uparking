import React from 'react';
import {useState, useEffect, useContext} from 'react';
import WalletLayout from '@components/layouts/WalletLayout';
import WalletCard from '../../../components/WalletCard';
import {calendarLocale} from '@constants/constants.js';
import Helper from '@utils/helper';
import {Line} from 'react-chartjs-2';

// import WalletChart from '@components/WalletChart';
import moment from 'moment';
import {callGet,callPost} from '@api/api';
import {Calendar, Tag, Image,Row,Col, Card, Button, Modal,Tabs} from 'antd';
import Context from '@context/Context';
import {LeftOutlined, RightOutlined,CalendarOutlined} from '@ant-design/icons';
import { showMessage } from '@utils/message';
import { messageType,defaultMsg } from '@constants/constants.js';
moment.updateLocale('mn', {
  weekdaysMin: ['НЯМ', 'ДАВ', 'МЯГ', 'ЛХА', 'ПҮР', 'БАА', 'БЯМ'],
});
moment.updateLocale('mn', {
  months: ['Нэгдүгээр сар', 'Хоёрдугаар сар', 'Гуравдугаар сар', 'Дөрөвдүгээр сар', 'Тавдугаар сар', 'Зургаадугаар сар', 'Долоодугаар сар', 'Наймдугаар сар', 'Есдүгээр сар', 'Аравдугаар сар', 'Арван нэгдүгээр сар', 'Арван хоёрдугаар сар'],
});
const {TabPane} = Tabs;

const Wallet = () => {
  const [calendarData, setCalendarData] = useState([]);
  const [current, setCurrent]= useState(parseInt(moment().format('M')));
  const [wallertData, setWallertData] = useState(null);
  const [pendingData,setPendingData] = useState([]);
  const [visibleOfPendingModal,setVisibleOfPendingModal] = useState(false);
  const [visiblePayPending,setVisiblePayPending] = useState(false);
  const [selectedPending,setSelectPending]=useState();
  const [incomeData,setIncomeData]= useState([]);
  const [currMonth, setCurrMonth] = useState();
  const [comeData,setComeData]=useState([]);
  const [expenseData,setExpenseData]=useState([]);
  const [comeValue,setComeValue]=useState([]);
  const [expenseValue,setExpenseValue]=useState([]);
  const [expenceData,setExpenceData]=useState([]);
  const ctx = useContext(Context);
 
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(()=>{
    const comeD=[];
       const expeD = [];
       const comeVal=[];
       const expeVal = [];
         incomeData.forEach((item)=>{
           comeD.push(item.amount);
           comeVal.push(item.date);
         });
         expenceData.forEach((item)=>{
           expeD.push(item.amount);
           expeVal.push(item.date);
         });
         setComeData(comeD);
         setComeValue(comeVal);
         setExpenseData(expeD);
         setExpenseValue(expeVal);
         console.log(comeD,comeVal,expeD,expeVal,'yaaaaaaaaaaaaaaaaaaaaaaaaaaaaaayyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');
       },[incomeData,expenceData]);
  let outcome;
  let income;
    income = {
      labels: comeValue,
      datasets: [
        {
          data: comeData,
          fill: false,
          backgroundColor: '#00F9B8',
          borderColor: '#35446D',
        },
      ],
    };
    outcome = {
      labels: expenseValue,
      datasets: [
        {
          label: 'null',
          data: expenseData,
          fill: false,
          backgroundColor: '#00F9B8',
          borderColor: '#35446D',
        },
      ],
    };
    const options = {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
      height: 10,
    };
  const fetchData = async () => {
    ctx.setIsLoading(true);
    await callGet('/wallet/user', null).then((res) => {
      setWallertData(res);
      if (res){
        if(res.pendingList && res.pendingList.length > 0) {
        setCalendarData(res.pendingList);
        }
        if(res.incomeChart && res.expenseChart){
        setIncomeData(res.incomeChart);
        setExpenceData(res.expenseChart);
        }
      }
      ctx.setIsLoading(false);
    });
  };
  const setClickPayPending = (id)=>{
      ctx.setIsLoading(true);
      const item = pendingData.find((it)=>it.bookingId == id);
      setSelectPending(item);
      setVisiblePayPending(true);
  }
   const onClickPayPayment = async ()=>{
      ctx.setIsLoading(true);
      const formData = {
        parkingSpaceId:selectedPending.parkingSpaceId,
        pendingAmount:selectedPending.pendingAmount,
        walletId:selectedPending.walletId
      }
       const res= await callPost('wallet/pending',formData);
       if(res && res.status === 'success'){
         setVisiblePayPending(false);
         setVisibleOfPendingModal(false);
      ctx.setIsLoading(false);

       }
   }
  const onClickVisiblePendingModal = async () => {
    const pendingData =  await callGet(`wallet/pending`);
    if(pendingData){
     setPendingData(pendingData);
     setVisibleOfPendingModal(true);}
     else{
     showMessage(messageType.FAILED.type,'Мэдээлэл дуудахад алдаа гарлаа');
    }
  }
  const getListData = (value) => {
    const listData = [];
    // const monthData = 0;
    if (calendarData.length > 0) {
      calendarData.forEach(function(element) {
        const currentMoment = moment(element.date, 'YYYY/MM/DD');
        if (value.format('YYYY-MM-DD') === currentMoment.format('YYYY-MM-DD')) {
          listData.push(element);
        }
      });
    }
    
    return listData || [];
  };
  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.date}>
            {/* <Badge status={item.type} text={item.content} /> */}
            <Tag color="green" className="eventText">
              {item.amount}
            </Tag>
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
  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        {/* <span>Backlog number</span> */}
      </div>
    ) : null;
  };
  const styles = {
    display: 'flex',
    justifyContent: 'space-between',
  };
  return (
    <div>
    <WalletLayout>
      <Row style={{width:'100%'}}> 
        <Col span={10}>
          <Row>
          <WalletCard />
          </Row>
          <Row style={{border:'1px solid black',height:'70px',marginTop:'20px',borderRadius:'8px',width:'80%',alignItems:'center'}}>
            <Col span={12}>
              <Row style={{color:'red',marginLeft:'10px'}}>
              Нэхэмжлэлийн дүн
              </Row>
              <Row>
                <Col offset={6}>
                {wallertData && wallertData.pendingAmount}₮
                </Col>
              </Row>
            </Col>
            <Col span={8} offset={2}>
              <Row onClick={onClickVisiblePendingModal} style={{border:'1px solid gray',width:'100%',height:'30px',alignItems:'center',display:'flex',paddingLeft:'20%',borderRadius:'8px'}}>Төлөх</Row>
            </Col>
          </Row>
        </Col>
          <Col span={14} >
          <Card style={{width:'100%',height:'350px'}}>
          <div
      className=" w-[529px] h-[180px]"
    >
      <Tabs defaultActiveKey="1" style={{marginTop:'-10px'}}>
        <TabPane tab="Орлого" key="1">
          <div>
            <Line data={income} options={options} />
          </div>
        </TabPane>
        <TabPane tab="Зарлага" key="2">
          <div>
            <Line data={outcome} options={options}/>
          </div>
        </TabPane>
      </Tabs>
    </div>
          </Card>
         </Col>
      </Row>
      {/* <Card> */}
      <div className=" mt-[24px]">
        <Row className=" w-[190px] h-[24px] font-bold text-[#35446D] flex  justify-between">
          <span> Хүлээгдэж буй орлого </span>
          <Col> <img className=" " src="../../question.png" /> </Col>
        </Row>
        <Row >
          <Col style={{overflow:'hidden'}} span={16}>
            <Calendar
              className="walletCal"
              locale={calendarLocale}
              dateCellRender={dateCellRender}
              headerRender={({value, type, onChange, onTypeChange}) => {
                const localeData = value.localeData();
                const year = value.year();
                setCurrMonth(moment(value).format('YYYY-MM'));
                const month = [];
                for (let i = 0; i < 12; i++) {
                  month.push(localeData._months[i]);
                }
                return (
                  <div style={{padding: '16px'}}>
                    <Row >
                      <Col span={1}>
                        <LeftOutlined
                          onClick={()=>{
                            setCurrent(current-1);
                            if (current === 1 ) {
                              setCurrent(12);
                              const newValue = value.clone();
                              newValue.month(parseInt(current-1-1));
                              onChange(newValue);
                            } else {
                              const newValue = value.clone();
                              newValue.month(parseInt(current-1-1 ));
                              onChange(newValue);
                            }
                          }}
                          style={{cursor: 'pointer', color: '#0013D4'}}
                        />
                      </Col>
                      <Col span={5} style={{marginTop: '5px'}}>
                        {month[current-1] },{year}
                      </Col>
                      <Col
                        span={1}
                        onClick={()=>{
                          setCurrent(current+1);
                          if (current === 12) {
                            setCurrent(1);
                            const newValue = value.clone();
                            newValue.month(parseInt(current));
                            onChange(newValue);
                          } else {
                            const newValue = value.clone();
                            newValue.month(parseInt(current ));
                            onChange(newValue);
                          }
                        }}

                        style={{cursor: 'pointer', color: '#0013D4'}}
                      >
                        <RightOutlined />
                      </Col>
                    </Row>
                  </div>
                )
                ;
              }}
              monthCellRender={monthCellRender}
            ></Calendar>
          </Col>
          <Col span={7} offset={1}><Image preview={false} width={343} height={480} src="../../ad2.png" /></Col>
        </Row>
      </div>
    </WalletLayout>
    <Modal visible={visiblePayPending} footer={null}>
      <div>
      <div className=" ml-[24px]"> <WalletCard /></div>
        <Row style={{marginTop: '35px'}}>
           <Col span={24}>
            <Button className="w-[372px] rounded-[8px]" type="primary" size={'large'} onClick={onClickPayPayment}>
              Төлөх
            </Button>
       </Col>
      </Row>
      </div>
      </Modal>
    <Modal visible={visibleOfPendingModal} footer={null} onCancel={()=>setVisibleOfPendingModal(false)}>
        {pendingData && pendingData.length
        ?pendingData.map((item)=>(
          <div style={{padding:'30px'}} >
            <Card style={{borderRadius:'10px'}} onClick={()=>setClickPayPending(item.bookingId)} >
                <Row>
                  <Col offset={6} span={10}>{item.bookingStatus === 'CANCELLED' && <div style={{fontSize:'16px'}}>ЦУЦЛАГДСАН</div>}</Col>
                  <Col offset={4} span={4} style={{float:'left'}}>
                    <Row style={{width:'100%'}}>Нийт үнэ</Row></Col>
                </Row>
                <Row>
                  <Col offset={2} span={10}></Col>
                  <Col offset={8} span={4} style={{float:'left'}}>
                    <Row style={{width:'100%',fontSize:'20px',fontWeight:'600'}}>{item.pendingAmount}₮</Row></Col>
                </Row>
                <Row>
                  {item.totalAtDay >0 &&
                  <Col span={6}>
                    <div style={{display:'flex'}}>
                        <div><img src='/icons/brightness_5_24px.png'/></div>
                        <div style={{marginLeft:'20px',fontSize:'14px',color:'gray'}}>Өдөр</div>
                    </div>
                  </Col>}
                  {item.totalAtNight>0 &&
                  <Col span={6} offset={2}>
                    <div style={{display:'flex'}}>
                        <div><img src='/icons/brightness_3_24px.png'/></div>
                        <div style={{marginLeft:'20px'}}>Шөнө</div>
                    </div>
                  </Col>}
                  {item.totalAllDay > 0 &&
                  <Col span={6} offset={2}>
                    <div style={{display:'flex'}}>
                      <div><img src='/icons/brightness_4_24px.png'/></div>
                      <div style={{marginLeft:'20px'}}>Бүтэн өдөр</div>
                    </div>
                  </Col>}
                </Row>
                <Row>
                  <Col  span={2}>
                  <CalendarOutlined />
                  </Col>
                  <Col span={8} offset={1}>
                    <Row><div style={{fontWeight:'700'}}>{Helper.formatOrderDatetime(item.startDateTime)}</div></Row>
                  </Col>
                  <Col offset={1}>
                  <div style={{alignItems: 'center', justifyContent: 'center', display: 'flex',paddingTop:'5px'}}>
                                <img
                                  width={24}
                                  src={'/images/icon/arrow_right_alt_24px.png'}
                                />
                              </div></Col>
                  <Col span={8} offset={2}>
                    <Row><div style={{fontWeight:'700'}}>{Helper.formatOrderDatetime(item.endDateTime)}</div></Row>
                  </Col>
                </Row>
            </Card>
            </div>
        )):<div style={{height:'100px'}}>Нэхэмжлэл байхгүй байна...</div>
        }
    </Modal>
    </div>
  );
};

export default Wallet;
