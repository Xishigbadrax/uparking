import ProfileLayout from '@components/layouts/ProfileLayout';
import {Tabs} from 'antd';
// import CustomCalendar from '@components/CustomCalendar/index';
import {Row, Col, Card, Calendar, Tag} from 'antd';
import {Radar} from 'react-chartjs-2';
import Bar from '@components/BarChart';
import {callGet} from '@api/api';
import {useContext, useState, useEffect} from 'react';
import Context from '@context/Context';
import Helper from '@utils/helper';
import {calendarLocale} from '@constants/constants.js';
import {LeftOutlined, RightOutlined} from '@ant-design/icons';
import moment from 'moment';
import DayNightColumn from '@components/DayNightColumns';

const {TabPane} = Tabs;

moment.updateLocale('mn', {
  weekdaysMin: ['Ням', 'Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба'],
});
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

// const data = [];
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
};

const Dashboard = () => {
  const ctx = useContext(Context);
  const [userData, setuserData] = useState(null);
  // const [markedDate, setmarkedDate] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [calendarData, setCalendarData] = useState([]);
  const [current, setCurrent] = useState(moment().format('MM'));
  useEffect(() => {
    fetchData();
  }, []);
  const callback = (key) => {
    // console.log(key);
  };
  const fetchData = async () => {
    ctx.setIsLoading(true);
    await callGet('/wallet/user', null).then((res) => {
      console.log(res, 'resres');
      setuserData(res);
      if (res && res.pendingList && res.pendingList.length > 0) {
        setCalendarData(res.pendingList);
      }
      ctx.setIsLoading(false);
    });
  };
  const getListData = (value) => {
    const listData = [{name: 'AV', type: 'AV'},
      {name: 'UN', type: 'UN'}];
    // if (calendarData.length > 0) {
    // calendarData.forEach(function(element) {
    //   const currentMoment = moment(element.date, 'YYYY/MM/DD');
    //   if (value.format('YYYY-MM-DD') === currentMoment.format('YYYY-MM-DD')) {
    //     listData.push(element);
    //   }
    // });
    // }

    return listData || [];
  };
  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events" style={{marginTop: '30px', borderRadius: '10px'}}>
        {listData.map((item) => (
          <li key={item.name}>
            <Tag color="green" className="eventText" >
              {item.amount}
            </Tag>
          </li>
        ))}
      </ul>
    );
  };

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
            <DayNightColumn />
            <Calendar
              locale={calendarLocale}
              className={'dashboardCalendar'}
              // format='YYYY/MM/DD'
              defaultValue={moment()}
              dateCellRender={dateCellRender}
              monthCellRender={monthCellRender}
              headerRender={({value, type, onChange, onTypeChange}) => {
                const localeData = value.localeData();
                const year = value.year();
                const month = [];
                console.log(localeData, 'awdawd');
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
                            console.log(current, 'ene harachde ');
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
                          console.log(current, 'ene harachde ');
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
                            {userData ?
                              Helper.formatValueReverse(userData.totalSpent) :
                              0}
            ₮
                          </span>
                        </div>
                        <div className="totalSpentText">
                          <span>Нийт зарцуулалт</span>
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
                          <span style={{marginLeft: '5px'}}>Өдөр 0</span>
                        </div>
                        <div className="daystatuses">
                          <div style={{paddingTop: '2px'}}><img src='/icons/brightness_3_24px.png' height='12px' width='18px'/></div>
                          <span style={{marginLeft: '5px'}}>Шөнө 0</span>
                        </div>
                        <div className="daystatuses">
                          <div style={{paddingTop: '2px'}}><img src='/icons/brightness_4_24px.png' height='12px' width='16px'/></div>
                          <span style={{marginLeft: '5px'}}> Бүтэн өдөр </span>
                          <span style={{marginLeft: '5px'}}>0</span>
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
            <DayNightColumn />
            <Calendar
              locale={calendarLocale}
              className={'dashboardCalendar'}
              // format='YYYY/MM/DD'
              defaultValue={moment()}
              dateCellRender={dateCellRender}
              monthCellRender={monthCellRender}
              headerRender={({value, type, onChange, onTypeChange}) => {
                const localeData = value.localeData();
                const year = value.year();
                const month = [];
                console.log(localeData, 'awdawd');
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
                            console.log(current, 'ene harachde ');
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
                          console.log(current, 'ene harachde ');
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
                            {userData ?
                              Helper.formatValueReverse(userData.totalSpent) :
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
                          <span style={{marginLeft: '5px'}}>Өдөр 0</span>
                        </div>
                        <div className="daystatuses">
                          <div style={{paddingTop: '2px'}}><img src='/icons/brightness_3_24px.png' height='12px' width='18px'/></div>
                          <span style={{marginLeft: '5px'}}>Шөнө 0</span>
                        </div>
                        <div className="daystatuses">
                          <div style={{paddingTop: '2px'}}><img src='/icons/brightness_4_24px.png' height='12px' width='16px'/></div>
                          <span style={{marginLeft: '5px'}}> Бүтэн өдөр </span>
                          <span style={{marginLeft: '5px'}}>0</span>
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
                  <Bar />
                </Card>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Card>
    </ProfileLayout>
  );
};

export default Dashboard;
