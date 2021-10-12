import ProfileLayout from '@components/layouts/ProfileLayout';
import {Tabs} from 'antd';
import _ from 'lodash';
// import CustomCalendar from '@components/CustomCalendar/index';
import {Row, Col, Card, Calendar, Tag, Menu, Dropdown, DatePicker, Button} from 'antd';
import {Radar} from 'react-chartjs-2';
// import Bar from '@components/BarChart';
import {callGet, callPost} from '@api/api';
import {useContext, useState, useEffect} from 'react';
import Context from '@context/Context';
import Helper from '@utils/helper';
import {calendarLocale} from '@constants/constants.js';
import { showMessage } from '@utils/message';
import { defaultMsg } from '@constants/constants.js';
import {LeftOutlined, RightOutlined, OrderedListOutlined} from '@ant-design/icons';
import moment from 'moment';
import DayNightColumn from '@components/DayNightColumns';
import { Radar } from '@ant-design/charts';
const {TabPane} = Tabs;
moment.updateLocale('mn',{
  weekdaysMin: ['Ням', 'Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба'],
});

const data1 = {
  labels: ['Орц гарц', 'Нэвтрэх хаалга', 'Байршил', 'Зогсоол'],
  datasets: [
    {
      label: '',
      data: [4, 3, 5, 5],
      backgroundColor: '#ffff',
      borderColor: '#00F9B8',
      borderWidth: 1,
    },
  ],
  options: {
    plugins: {
      legend: {
        display: false,
      },
    },
  },
};
const options = {
  scale: {
    ticks: {beginAtZero: true},
  },
  suggestedMin:0
};
const Dashboard = () => {
  const ctx = useContext(Context);
  const {userdata} = useContext(Context);
  // const [userData, setuserData] = useState(null);
  // const [markedDate, setmarkedDate] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const {userdata} = useContext(Context);
  const [calendarData, setCalendarData] = useState([]);
  const [current, setCurrent] = useState(parseInt(moment().format('MM')));
  const [tabKey, setTabKey]=useState(1);
  const [vehicles, setVehicles] = useState([]);
  const [sumDay, setSumDay]= useState(0);
  const [sumNight, setSumNight]= useState(0);
  const [sumFullDay, setSumFullDay]= useState(0);
  const [sumTotalValue, setSumTotalValue]= useState(0);
  const [selectDate, setSelectDate] = useState();
  const [currMonth, setCurrMonth] = useState();
  const [realData, setRealData] = useState();
  const [spaceRateData,setSpaceRateData] = useState()
  const [gateRateData,setGateRateData] = useState();
  const [entranceLockData,setEnterLockData] = useState();
  const [positionRateData,setPositionRateData] = useState()


  const aa = async () => {
    const rateArray = [];
    if (typeof userdata.firstName != 'undefined') {
      setRealData(userdata);
      const parkSpaceList = await callGet(`/parkingspace/list/user?id=${userdata.id}`);
      console.log(parkSpaceList);
      if(parkSpaceList && parkSpaceList.length){
        parkSpaceList.map(async(item)=>{
          const a = await callGet(`/parkingspace/review?parkingSpaceId=${item.value}`);
          console.log(a,'reviewss');
        })
      }
      console.log(rateArray,'ggawdwwwg');
    }
  }
  useEffect(async () => {
    const vehicle = await callGet('/user/vehicle/list');
    setVehicles(vehicle);
    const space =  await callGet(``)
    fetchData();
    aa();
  }, []);
  const callback = (key) => {
    setTabKey(key);
    if (key==2) {
      setSumDay(0);
      setSumNight(0);
      setSumFullDay(0);
      setSumTotalValue(0);
      getDataOwner();
    } else if (key==1) {
      setSumDay(0);
      setSumNight(0);
      setSumFullDay(0);
      setSumTotalValue(0);
      fetchData();
    }
  };
  const data = [
    { name: 'Орц гарц', star:5  },
    { name: 'Нэвтрэх хаалга', star: 4 },
    { name: 'Байршил', star: 3 },
    { name: 'Зогсоол', star: 2},
  ];
  const config = {
    data: data.map((d) => ({ ...d })),
    xField: 'name',
    yField: 'star',
    meta: {
      star: {
        alias: 'Үнэлгээ',
        min: 0,
        nice: true,
      },
    },
    xAxis: {
      line: null,
      tickLine: null,
    },
    yAxis: {
      label: false,
      grid: {
        alternateColor: 'rgba(0, 0, 0, 0.04)',
      },
    },
    // 开启辅助点
    point: {},
    area: {},
  };
  const getDataOwner = async ()=>{
    ctx.setIsLoading(true);
    const formData = {
      asWho: 2,
      dateList: null,
      vehicleId: null,
    };
    const res = await callPost('/booking/history', formData);
    if (!res || res === undefined) {
      showMessage(messageType.FAILED.type, result.error);
      return true;
    } else {
      setCalendarData(res.history);
      if ( res?.history?.length) {
        setSumDay(_.sumBy(res.history, 'totalAtDay'));
        setSumNight(_.sumBy(res.history, 'totalAtNight'));
        setSumFullDay(_.sumBy(res.history, 'totalAllDay'));
        setSumTotalValue(_.sumBy(res.history, 'totalPrice'));
      }
      ctx.setIsLoading(false);
    }
  };
  const fetchData = async () => {
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
      setCalendarData(res.history);
      // console.log(res.history, 'ress');
      ctx.setIsLoading(false);
      if (res.history.length) {
        setSumDay(_.sumBy(res.history, 'totalAtDay'));
        setSumNight(_.sumBy(res.history, 'totalAtNight'));
        setSumFullDay(_.sumBy(res.history, 'totalAllDay'));
        setSumTotalValue(_.sumBy(res.history, 'totalPrice'));
      }
    }
  };
  const getListData = (value) => {
    const listData = [];
    if (calendarData && calendarData.length > 0) {
      calendarData.forEach(function(element) {
        const currentMoment = moment(element.startDateTime, 'YYYY-MM-DD');
        if (value.format('YYYY-MM-DD') === currentMoment.format('YYYY-MM-DD')) {
          listData.push(element);
        }
      });
    }
    return listData || [];
  };
  const dateCellRender = (value) => {
    const month = moment(value).format('YYYY-MM');
    if (currMonth === month) {
      const listData = getListData(value);
      return (
        <ul className="events" style={{marginTop: '30px', borderRadius: '10px'}}>
          {listData.length ? listData.map((item) => (
            <li key={item.name}>
              {tabKey == 1 ?
                <Tag color="green" style={{borderRadius: '10px', width: '90%'}}>
                  {item.bookingNumber}
                </Tag>:
                <Tag color='green' style={{borderRadius: '10px', width: '90%'}} >{item.vehicleNumber}</Tag>}
            </li>
          )): <ul>
            <li>
              <Tag color="white" style={{width: '90%', height: '22px', borderRadius: '10px', border: '0.4px solid #DEE2E9'}}>
              </Tag>
            </li>
            <li>
              <Tag
                color="white" style={{width: '90%', height: '22px', borderRadius: '10px', border: '0.4px solid #DEE2E9'}}>
              </Tag>
            </li>
          </ul>}
        </ul>
      )
      ;
    }
  };
  const onChangeOrderDate = (e)=>{
    console.log(moment(e).format('YYYY-MM-DD'));
    setSelectDate(moment(e).format('YYYY-MM-DD'));
  };
  // mshinaar haih
  const handleVehicle = async (e)=>{
    ctx.setIsLoading(true);
    console.log(tabKey, 'ok');
    if (tabKey==1) {
      const formData = {
        asWho: 1,
        dateList: selectDate ? [selectDate]: null,
        vehicleId: e.key,
      };
      console.log(formData);
      const res = await callPost('/booking/history', formData);
      if (!res || res === undefined) {
        showMessage(messageType.FAILED.type, defaultMsg.dataError);
      } else {
        setCalendarData(res.history);
        if ( res?.history?.length) {
          setSumDay(_.sumBy(res.history, 'totalAtDay'));
          setSumNight(_.sumBy(res.history, 'totalAtNight'));
          setSumFullDay(_.sumBy(res.history, 'totalAllDay'));
          setSumTotalValue(_.sumBy(res.history, 'totalPrice'));
        } else {
          setSumDay(0);
          setSumNight(0);
          setSumFullDay(0);
          setSumTotalValue(0);
        }
      }
    } else if (tabKey==2) {
      const formData = {
        asWho: 2,
        dateList: selectDate ? [selectDate]: null,
        vehicleId: e.key,
      };
      console.log(formData);
      const res = await callPost('/booking/history', formData);
      if (!res || res === undefined) {
        showMessage(messageType.FAILED.type, defaultMsg.dataError);
      } else {
        setCalendarData(res.history);
        if ( res?.history?.length) {
          setSumDay(_.sumBy(res.history, 'totalAtDay'));
          setSumNight(_.sumBy(res.history, 'totalAtNight'));
          setSumFullDay(_.sumBy(res.history, 'totalAllDay'));
          setSumTotalValue(_.sumBy(res.history, 'totalPrice'));
        } else {
          setSumDay(0);
          setSumNight(0);
          setSumFullDay(0);
          setSumTotalValue(0);
        }
      }
    }

    ctx.setIsLoading(false);
  };
  const vehicleMenu = (
    <Menu onClick={(value)=>handleVehicle(value)} style={{width: '100%'}}>
      {vehicles.map((item)=>(
        <Menu.Item key={item.value}>
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );
  return (
    <ProfileLayout>
      <Card style={{borderRadius: '50px'}}>
        <Tabs
          defaultActiveKey="1"
          onChange={callback}
          type="card"
          className={'profileTab'}
        >
          <TabPane tab="Түрээслэгч" key="1" className={'DashboardCalendar1'}>
            <Row>
              <Col span={4} offset={14}>
                <DatePicker
                  className='selectMonthDate'
                  bordered={false}
                  locale={calendarLocale}
                  placeholder='Сараа сонгоно уу?'
                  picker='month'
                  onChange={onChangeOrderDate}
                />
              </Col>
              <Col>
                <Dropdown overlay={vehicleMenu} className='dropdown'>
                  <Button style={{color: '#35446D'}}>Бүх автомашин<OrderedListOutlined /></Button>
                </Dropdown>
              </Col>
            </Row>
            <DayNightColumn />
            <Calendar
              locale={calendarLocale}
              className={'dashboardCalendar'}
              dateCellRender={dateCellRender}
              headerRender={({value, type, onChange, onTypeChange}) => {
                const localeData = value.localeData();
                setCurrMonth(moment(value).format('YYYY-MM'));
                const year = value.year();
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
                    <Row className={'status'}>
                      <Col span={9} offset={6}>
                        <div className="totalSpentAmount">
                          <span>
                            {sumTotalValue ?
                              Helper.formatValueReverse(sumTotalValue) :
                              0}
                          </span>
                        </div>
                        <div className="totalSpentText">
                          <span>Нийт зарцуулалт</span>
                        </div>
                      </Col>
                      <Col span={7}>
                        <div className="daystatuses">
                          <div style={{paddingTop: '2px'}}><img src='/icons/brightness_5_24px.png' height='12px' width='18px'/></div>
                          <span style={{marginLeft: '5px'}}>Өдөр {sumDay}</span>
                        </div>
                        <div className="daystatuses">
                          <div style={{paddingTop: '2px'}}><img src='/icons/brightness_3_24px.png' height='12px' width='18px'/></div>
                          <span style={{marginLeft: '5px'}}>Шөнө {sumNight}</span>
                        </div>
                        <div className="daystatuses">
                          <div style={{paddingTop: '2px'}}><img src='/icons/brightness_4_24px.png' height='12px' width='16px'/></div>
                          <span style={{marginLeft: '5px'}}> Бүтэн өдөр </span>
                          <span style={{marginLeft: '5px'}}>{sumFullDay}</span>
                        </div>
                      </Col>
                    </Row>
                  </div>
                );
              }}
            />
            <Row>
              <Col span={12}></Col>
              <Col span={12}></Col>
            </Row>
          </TabPane>
          <TabPane tab="Түрээслүүлэгч" key="2" className='DashboardCalendar1'>
            <Row>
              <Col span={4} offset={14}>
                <DatePicker
                  className='selectMonthDate'
                  bordered={false}
                  locale={calendarLocale}
                  placeholder='Сараа сонгоно уу?'
                  picker='month'
                  onChange={onChangeOrderDate}
                />
              </Col>
              <Col>
                <Dropdown overlay={vehicleMenu} className='dropdown'>
                  <Button style={{color: '#35446D'}}>Бүх автомашин<OrderedListOutlined /></Button>
                </Dropdown>
              </Col>
            </Row>
            <DayNightColumn />
            <Calendar
              locale={calendarLocale}
              className={'dashboardCalendar'}
              // format='YYYY/MM/DD'
              dateCellRender={dateCellRender}
              headerRender={({value, type, onChange, onTypeChange}) => {
                const localeData = value.localeData();
                const year = value.year();
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
                    <Row className={'status'}>
                      <Col span={9}>
                        <div className="totalSpentAmount">
                          <span>
                            {sumTotalValue ?
                              Helper.formatValueReverse(sumTotalValue) :
                              0}
            ₮
                          </span>
                        </div>
                        <div className="totalSpentText">
                          <span>Нийт түрээсийн орлого</span>
                        </div>
                      </Col>
                      <Col span={8}>
                        <div className="levelAmount">
                          <span>0%</span>
                        </div>
                        <div className="levelText">
                          <span>Ашиглалтын түвшин</span>
                        </div>
                      </Col>
                      <Col span={7}>
                        <div className="daystatuses">
                          <div style={{paddingTop: '2px'}}><img src='/icons/brightness_5_24px.png' height='12px' width='18px'/></div>
                          <span style={{marginLeft: '5px'}}>Өдөр {sumDay}</span>
                        </div>
                        <div className="daystatuses">
                          <div style={{paddingTop: '2px'}}><img src='/icons/brightness_3_24px.png' height='12px' width='18px'/></div>
                          <span style={{marginLeft: '5px'}}>Шөнө {sumNight}</span>
                        </div>
                        <div className="daystatuses">
                          <div style={{paddingTop: '2px'}}><img src='/icons/brightness_4_24px.png' height='12px' width='16px'/></div>
                          <span style={{marginLeft: '5px'}}> Бүтэн өдөр </span>
                          <span style={{marginLeft: '5px'}}>{sumFullDay}</span>
                        </div>
                      </Col>
                    </Row>
                  </div>
                );
              }}
            />
            {/* <CustomCalendar data={data}></CustomCalendar> */}
            <Row>
              <Col span={10}>
                <Row style={{color: '#35446D', fontWeight: 'bold', fontSize: '14px', lineHeight: '24px'}}>Таны зогсоолын үнэлгээ</Row>
                <Card style={{borderRadius: '20px', marginTop: '10px'}} className={'RadarChart'}>
                  <Radar data={data1} options={options} />
                </Card>
              </Col>
              <Col span={10} offset={2} className='BarChart'>
                <Row style={{color: '#35446D', fontWeight: 'bold', fontSize: '14px', lineHeight: '24px'}}>Таны зогсоолын хандалт</Row>
                <Card style={{borderRadius: '20px', marginTop: '10px'}}>
                  {/* <Bar /> */}
                </Card>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
        <Row>
        <Radar {...config} />
        </Row>
      </Card>
    </ProfileLayout>
  );
};

export default Dashboard;
