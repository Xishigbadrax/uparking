import ProfileLayout from '@components/layouts/ProfileLayout';
import {Tabs, Select, List, Row, Col, DatePicker} from 'antd';
import {Calendar, Tag, Pagination, LocaleProvider} from 'antd';
import {callPost} from '@api/api';
import {useEffect, useState, useContext} from 'react';
import {callGet} from '@api/api';
import Context from '@context/Context';
import {messageType, defaultMsg} from '@constants/constants';
import {showMessage} from '@utils/message';
import moment, {locale} from 'moment';
import {calendarLocale} from '@constants/constants.js';
import DayNightColumn from '@components/DayNightColumns';
import {CalendarOutlined, UnorderedListOutlined, ArrowRightOutlined, EyeTwoTone, DeleteTwoTone} from '@ant-design/icons';
import Helper from '@utils/helper';
import Link from 'next/link';

const {TabPane} = Tabs;
const {Option} = Select;
moment.updateLocale('mn', {
  weekdaysMin: ['НЯМ', 'ДАВ', 'МЯГ', 'ЛХА', 'ПҮР', 'БАА', 'БЯМ'],
});
moment.updateLocale('mn', {
  months: ['Нэгдүгээр сар', 'Хоёрдугаар сар', 'Гуравдугаар сар', 'Дөрөвдүгээр сар', 'Тавдугаар сар', 'Зургаадугаар сар', 'Долоодугаар сар', 'Наймдугаар сар', 'Есдүгээр сар', 'Аравдугаар сар', 'Арваннэгдүгээр сар', 'Арванхоёрдугаар сар'],
});
const Order = () => {
  const ctx = useContext(Context);
  const [asWho, setAsWho] = useState(1);
  const [isConfirmed, setIsConfirmed] = useState(null);
  const [calendarStatus, setCalendarStatus] = useState();
  const [calendarData, setCalendarData] = useState([]);
  const [dataViewType, setDataViewType] = useState('calendar');
  const [currentPage, setCurrentPage]= useState(1);

  const onClickTab = async (key) => {
    setAsWho(key);
    setIsConfirmed(false);
    await getData();
  };
  const onClickInnerTab = (key) => {
    // setDataViewType('calendar');
    if (dataViewType === 'list') {
      setDataViewType('calendar');
      return;
    }
    if (key == 1) {
      setCalendarStatus(key);
      setIsConfirmed(true);
    } else if (key == 2) {
      setCalendarStatus(key);
      setIsConfirmed(true);
    } else if (key == 3) {
      setCalendarStatus(key);
      setIsConfirmed(true);
      getHistroy();
    }
  };
  const onChangeOrderDate = (e)=>{
    console.log(moment(e).format('YYYY/MM/DD'));
  };
  const onChangePage = (page)=>{
    console.log(page);
    setCurrentPage(page);
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (isConfirmed !== null) {
      getData();
    }
  }, [isConfirmed]);
  const getData = async () => {
    ctx.setIsLoading(true);
    if (isConfirmed === null) {
      setIsConfirmed(false);
    }
    if (isConfirmed !== null) {
      const res = await callGet(`/booking?asWho=${asWho}&isConfirmed=${isConfirmed}`);
      if (!res || res === undefined) {
        showMessage(messageType.FAILED.type, defaultMsg.dataError);
      } else {
        setCalendarData(res);
        console.log(res, 'ene nuguu data');
      }
      ctx.setIsLoading(false);
    }
  };
  const getHistroy = async () => {
    ctx.setIsLoading(true);
    const formData = {
      asWho: 1,
      dateList: null,
      vehicleId: null,
    };

    const res = await callPost('/booking/history', formData);
    if (!res || res === undefined) {
      showMessage(messageType.FAILED.type, result.error);
      return true;
    } else {
      console.log(res.history, 'history');
      setCalendarData(res.history);
    }
    ctx.setIsLoading(false);
  };
  const getListData = (value) => {
    const listData = [];
    if (calendarData.length > 0) {
      calendarData.forEach(function(element) {
        const currentMoment = moment(element.startDateTime, 'YYYY/MM/DD');
        const endMoment = moment(element.endDateTime, 'YYYY/MM/DD').add(1, 'days');
        while (currentMoment.isBefore(endMoment, 'day')) {
          if (value.format('YYYY-MM-DD') === currentMoment.format('YYYY-MM-DD')) {
            listData.push(element);
          }
          currentMoment.add(1, 'days');
        }
      });
    }
    return listData || [];
  };
  const getTagColor = (item) => {
    if (item.bookingStatus === 'CONFIRMED') {
      if (calendarStatus == 3) {
        return 'cyan';
      }
      return 'green';
    }
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events" style={{marginTop: '10px'}}>
        {listData && listData.map((item) => (
          <li key={item.bookingId}>
            {/* <Badge status={item.type} text={item.content} /> */}
            {calendarStatus === '1' &&<div> <Tag color='#C6231A' className="eventText">{item.bookingNumber}</Tag>
              <Tag color='gray' style={{borderRadius: '20px', border: ' 1px solid black',
                fontSize: '10px',
                lineHeight: '16px',
                height: '20px',
                width: '100px'}}></Tag></div>}
            {calendarStatus === '2' && <Tag color='green' className="eventText">{item.bookingNumber}</Tag>}
            {calendarStatus === '3' && <Tag color='yellow' className="eventText">{item.bookingNumber}</Tag>}
          </li>
        ))}
        {listData === [] && <Tag color='#C6231A' className="eventText" style={{background: 'pink', height: '20px'}}></Tag>}
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
        <span>Backlog number</span>
      </div>
    ) : null;
  };
  const handleChangeView = (value) => {
    setDataViewType(value);
  };
  const innerTabs = [
    {title: 'Хадгалсан', key: '1'},
    {title: 'Баталгаажсан', key: '2'},
    {title: 'Түүх', key: '3'},
  ];
  return (
    <ProfileLayout>
      <Tabs defaultActiveKey="1" onChange={onClickTab} type="card" className={'profileTab'}>
        <TabPane tab="Түрээслэгч" key="1">
          <Tabs defaultActiveKey="1" onChange={onClickInnerTab} className="profileSubTab">
            {innerTabs.map((tab) => (
              <TabPane tab={

                <div className='ListCalendarSelection'>
                  <Select className="calendarViewer" defaultValue={dataViewType} onChange={handleChangeView} style={{width: '100%'}}>
                    <Option value="calendar" defaultValue><span>Календарь</span></Option>
                    <Option value="list"><span>Жагсаалт</span></Option>
                  </Select>
                </div>}
              key={tab.key}>
                <Row>
                  <DatePicker
                    locale={calendarLocale}
                    defaultvalue={moment()}
                    onChange={onChangeOrderDate}
                  />
                </Row>
                {dataViewType ==='calendar'?
                  <div className='orderCalendar'>
                    <DayNightColumn />
                    <Calendar className="customCalendar"
                      locale={calendarLocale}
                      headerRender={ ()=>{
                        return (
                          <div>
                          sdsas
                          </div>);
                      }
                      }
                      dateCellRender={dateCellRender}
                      monthCellRender={monthCellRender} />
                  </div>:
                  <div>
                    <List
                      className="calendarList"
                      style={{marginTop: 30}}
                      itemLayout="horizontal"
                      dataSource={calendarData}
                      renderItem={(item) => (
                        <List.Item
                        >
                          <div className="calendarListStatus">
                            {item.bookingStatus}
                          </div>
                          <Row style={{width: '100%'}}>
                            <Col span={7}>
                              <div className="listtitle"><strong>{item.residenceName}</strong></div>
                              <div className="listdescription">{`${item.province}, ${item.district}, ${item.section}, ${item.residenceName}, ${item.residenceBlockNumber}`}</div>
                            </Col>
                            <Col span={4} className="listdaynight">
                              {item.totalAtDay ? item.totalAtDay + ' өдөр,' : null}
                              {item.totalAtNight ? item.totalAtNight + ' шөнө,' : null}
                              {item.totalAllDay ? item.totalAllDay + ' бүтэн өдөр' : null}
                              {item.totalAllDay ? item.totalAllDay + ' бүтэн өдөр' : null}
                              {item.totalAllDay ? item.totalAllDay + ' бүтэн өдөр' : null}
                            </Col>
                            <Col span={7} className="liststartenddate">
                              <div style={{display: 'inline-flex'}}>
                                <div >
                                  <div> <strong>{Helper.date(item.startDateTime)}</strong></div>
                                  <div> {Helper.time(item.endDateTime)}</div>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30px'}} ><ArrowRightOutlined /></div>
                                <div >
                                  <div> <strong>{Helper.date(item.startDateTime)}</strong></div>
                                  <div> {Helper.time(item.endDateTime)}</div>
                                </div>

                              </div>
                            </Col>
                            <Col span={3} className="listpay">
                              <div style={{textAlign: 'right'}}> Нийт төлбөр</div>
                              <div style={{textAlign: 'right'}} className="totalprice"> <strong>
                                {item.totalPrice ? Helper.formatValueReverse(item.totalPrice) : 0}₮</strong></div>
                            </Col>
                            <Col span={3} className="listactions">
                              <Link href={{pathname: `/park/profile/order/${item.bookingId}`, query: {page: '1'}}} passHref>
                                <EyeTwoTone twoToneColor="#0013D4" style={{fontSize: 20}} />
                              </Link>
                              {item.title === 'Баталгаажсан' ? <DeleteTwoTone style={{marginLeft: '15px'}} twoToneColor="#C6231A" /> : null}
                            </Col>
                          </Row>
                        </List.Item>

                      )}
                    />
                    <Row style={{height: '50px'}}>
                      <Pagination current={currentPage} onChange={onChangePage} total={50} className='OrdePagination'/>
                    </Row>
                  </div>}
              </TabPane>
            ))}

          </Tabs>
        </TabPane>
        <TabPane tab="Түрээслүүлэгч" key="2">
          <DayNightColumn />  <Calendar className="customCalendar" locale={calendarLocale} dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
        </TabPane>
      </Tabs>
    </ProfileLayout>
  );
};

export default Order;
