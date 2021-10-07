import React from 'react';
import {useState, useEffect, useContext} from 'react';
import WalletLayout from '@components/layouts/WalletLayout';
import WalletCard from '../../../components/WalletCard';
import {calendarLocale} from '@constants/constants.js';
import Helper from '@utils/helper';
import WalletChart from '@components/WalletChart';
import moment from 'moment';
import {callGet} from '@api/api';
import {Calendar, Tag, Image,Row,Col, Card} from 'antd';
import Context from '@context/Context';
import {LeftOutlined, RightOutlined} from '@ant-design/icons';

const Wallet = () => {
  const [calendarData, setCalendarData] = useState([]);
  const [userData, setuserData] = useState(null);
  const ctx = useContext(Context);
  const [data11,setData11] = useState(5);
  const [data12,setData12] = useState(5);
  const [data13,setData13] = useState(5);
  const [data14,setData14] = useState(5);
  const [data15,setData15] = useState(5);
  const [data16,setData16] = useState(5);
  const [data17,setData17] = useState(5);
  const [data18,setData18] = useState(5);
  const [data19,setData19] = useState(5);
  const [data110,setData110] = useState(5);
  const [data111,setData111] = useState(5);
  const [data112,setData112] = useState(5);
  useEffect(() => {
    fetchData();
  }, []);
  let income;
    income = {
      labels: ['1 сар', '2 сар', '3 сар', '4 сар', '5 сар', '6 сар', '7 сар', '8 сар', '9 сар', '10 сар', '11 сар', '12 сар'],
      datasets: [
        {
          label: 'null',
          data: [data11, data12, data13, data14, data15, data16, data17, data18, data19, data110, data111, data112],
          fill: false,
          backgroundColor: '#00F9B8',
          borderColor: '#35446D',
        },
      ],
    };

  const fetchData = async () => {
    ctx.setIsLoading(true);
    await callGet('/wallet/user', null).then((res) => {
      setuserData(res);
      console.log(res,'ggggg');
      if (res && res.pendingList && res.pendingList.length > 0) {
        setCalendarData(res.pendingList);
      }
      ctx.setIsLoading(false);
    });
  };

  const getListData = (value) => {
    const listData = [];
    // const monthData = 0;
    if (calendarData.length > 0) {
      calendarData.forEach(function(element) {
        const currentMoment = moment(element.date, 'YYYY/MM/DD');
        if (value.format('YYYY-MM-DD') === currentMoment.format('YYYY-MM-DD')) {
          listData.push(element);
        }
        if(value.format('YYYY')=== currentMoment.format('YYYY')){
          const month = moment(value).format('MM');
          if(month === '10'){
            setData11(data11+element.amount);
          }
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
    <WalletLayout>
      <Row style={{width:'100%'}}> 
        <Col span={10}>
          <WalletCard />
        </Col>
        <Col span={14} >
          <Card style={{width:'100%',height:'400px'}}>
            <WalletChart  style={{paddingBottom:'10px'}} income={income}/>
          </Card>
         </Col>
      
      </Row>
      {/* <Card> */}
      <div className=" mt-[24px]">
        <Row className=" w-[190px] h-[24px] font-bold text-[#35446D] flex  justify-between">
          <span> Хүлээгдэж буй орлого </span>
          <Col> <img className=" " src="../../question.png" /> </Col>
        </Row>
        <div className="flex w-[580px] h-[21px] justify-between mt-[18px] ">
          <div className=" flex justify-between w-[190px] cursor-pointer ">
            <div className=" text-[#0013D4]"><LeftOutlined /></div>
            <div className=" mt-[3px] text-[#647189] font-bold"> Аравдугаар сар, 2020 </div>
            <div className=" text-[#0013D4]"><RightOutlined /></div>
          </div>
          <div><text className="text-[blue] font-bold">
            {userData != null ?
              userData.totalIncome ?
                Helper.formatValueReverse(userData.totalIncome + '') :
                0 :
              null}
              ₮
          </text></div>
        </div>
        <div className="flex justify-between mt-[25px]">

          <div className=" h-[480px] w-[613px]" style={{overflow:'hidden'}}>
            <Calendar
              className="walletCal"
              locale={calendarLocale}
              dateCellRender={dateCellRender}
              // headerRender={}
              monthCellRender={monthCellRender}
            ></Calendar>
          </div>
          <div><Image preview={false} width={243} height={480} src="../../ad2.png" /></div>
        </div>
      </div>
    </WalletLayout>
  );
};

export default Wallet;
