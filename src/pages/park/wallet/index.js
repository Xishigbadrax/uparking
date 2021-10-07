import React from 'react';
import {useState, useEffect, useContext} from 'react';
import WalletLayout from '@components/layouts/WalletLayout';
import WalletCard from '../../../components/WalletCard';
import {calendarLocale} from '@constants/constants.js';
import Helper from '@utils/helper';
// import WalletChart from '@components/WalletChart';
import moment from 'moment';
import {callGet} from '@api/api';
import {Calendar, Tag, Image} from 'antd';
import Context from '@context/Context';
import {LeftOutlined, RightOutlined} from '@ant-design/icons';

const Wallet = () => {
  const [calendarData, setCalendarData] = useState([]);
  const [userData, setuserData] = useState(null);
  const ctx = useContext(Context);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    ctx.setIsLoading(true);
    await callGet('/wallet/user', null).then((res) => {
      setuserData(res);
      if (res && res.pendingList && res.pendingList.length > 0) {
        setCalendarData(res.pendingList);
      }
      ctx.setIsLoading(false);
    });
  };

  const getListData = (value) => {
    const listData = [];
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
    <WalletLayout>
      <div style={styles}>
        <div>
          <WalletCard />
        </div>

        <div>
          {/* <WalletChart /> */}
        </div>
      </div>
      <div className=" mt-[24px]">
        <div className=" w-[190px] h-[24px] font-bold text-[#35446D] flex  justify-between">
          <span> Хүлээгдэж буй орлого </span>
          <div> <Image className=" " src="../../question.png" /> </div>
        </div>
        <div className="flex w-[580px] h-[21px] justify-between mt-[18px] ">
          <div className=" flex justify-between w-[190px] cursor-pointer ">
            <div className=" text-[#0013D4]"><LeftOutlined /></div>
            <div className=" mt-[3px] text-[#647189] font-bold"> Аравдугаар сар, 2020 </div>
            <div className=" text-[#0013D4]"><RightOutlined /></div>
          </div>
          <div><text className="text-[blue] font-bold">
            {userData != null ?
              userData.totalIncome ?
                Helper.formatValueReverse(userData.pendingAmount + '') :
                0 :
              null}
              ₮
          </text></div>
        </div>


        <div className="flex justify-between mt-[25px]">

          <div className=" h-[480px] w-[613px] overflow-scroll">
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
