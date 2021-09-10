import {Calendar, Select} from 'antd';
import {Row, Col, Button, Divider, Radio} from 'antd';
import {useState, useEffect} from 'react';
import {callGet} from '@api/api';
import {calendarLocale} from '@constants/constants.js';
import DayNightColumn from '@components/DayNightColumn';
import {InfoCircleOutlined, LeftOutlined, RightOutlined} from '@ant-design/icons';
import moment from 'moment';

moment.updateLocale('mn', {
  weekdaysMin: ['Ням', 'Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба'],
});

const rentDate = (props) => {
  // const [weekData, setWeekData] = useState();
  const [checked, setChecked] = useState();

  const [mondayMorning, setmondayMorning] = useState('Боломжтой');
  const [tuesdayMorning, settuesdayMorning] = useState('Боломжтой');
  const [wednesdayMorning, setwednesdayMorning] = useState('Боломжтой');
  const [thursdayMorning, setthursdayMorning] = useState('Боломжтой');
  const [fridayMorning, setfridayMorning] = useState('Боломжтой');
  const [saturdayMorning, setsaturdayMorning] = useState('Боломжтой');
  const [sundayMorning, setsundayMorning] = useState('Боломжтой');
  const [mondayNight, setmondayNight] = useState('Боломжтой');
  const [tuesdayNight, settuesdayNight] = useState('Боломжтой');
  const [wednesdayNight, setwednesdayNight] = useState('Боломжтой');
  const [thursdayNight, setthursdayNight] = useState('Боломжтой');
  const [fridayNight, setfridayNight] = useState('Боломжтой');
  const [saturdayNight, setsaturdayNight] = useState('Боломжтой');
  const [sundayNight, setsundayNight] = useState('Боломжтой');

  const [daySplitId, setDaySplitId] = useState();
  // const [date, setDate] = useState(moment.setDate());
  const [nightSplitId, setNightSplit] = useState();
  const dayOfWeek= [
    {
      day: 1,
      // timeSplitDescription: 'Өдөр',
      timeSplitId: Number(daySplitId),
      spaceStatusCode: mondayMorning,
    },
    {
      day: 1,
      // timeSplitDescription: 'Шөнө',
      timeSplitId: Number(nightSplitId),
      spaceStatusCode: mondayNight,
    },
    {
      day: 2,
      // timeSplitDescription: 'Өдөр',
      timeSplitId: Number(daySplitId),
      spaceStatusCode: tuesdayMorning,
    },
    {
      day: 2,
      // timeSplitDescription: 'Шөнө',
      timeSplitId: Number(nightSplitId),
      spaceStatusCode: tuesdayNight,
    },
    {
      day: 3,
      // timeSplitDescription: 'Өдөр',
      timeSplitId: Number(daySplitId),
      spaceStatusCode: wednesdayMorning,
    },
    {
      day: 3,
      // timeSplitDescription: 'Шөнө',
      timeSplitId: Number(nightSplitId),
      spaceStatusCode: wednesdayNight,
    },
    {
      day: 4,
      // timeSplitDescription: 'Өдөр',
      timeSplitId: Number(daySplitId),
      spaceStatusCode: thursdayMorning,
    },
    {
      day: 4,
      // timeSplitDescription: 'Шөнө',
      timeSplitId: Number(nightSplitId),
      spaceStatusCode: thursdayNight,
    },
    {
      day: 5,
      // timeSplitDescription: 'Өдөр',
      timeSplitId: Number(daySplitId),
      spaceStatusCode: fridayMorning,
    },
    {
      day: 5,
      // timeSplitDescription: 'Шөнө',
      timeSplitId: Number(nightSplitId),
      spaceStatusCode: fridayNight,
    },
    {
      day: 6,
      // timeSplitDescription: 'Өдөр',
      timeSplitId: Number(daySplitId),
      spaceStatusCode: saturdayMorning,
    },
    {
      day: 6,
      // timeSplitDescription: 'Шөнө',
      timeSplitId: Number(nightSplitId),
      spaceStatusCode: saturdayNight,
    },
    {
      day: 0,
      // timeSplitDescription: 'Өдөр',
      timeSplitId: Number(daySplitId),
      spaceStatusCode: sundayMorning,
    },
    {
      day: 0,
      // timeSplitDescription: 'Шөнө',
      timeSplitId: Number(nightSplitId),
      spaceStatusCode: sundayNight,
    },
  ];
  const dayWeek= [
    {
      day: 1,
      // timeSplitDescription: 'Өдөр',
      timeSplitId: Number(daySplitId),
      spaceStatusCode: mondayMorning==='Боломжтой'?'AV' :'UN',
    },
    {
      day: 1,
      // timeSplitDescription: 'Шөнө',
      timeSplitId: Number(nightSplitId),
      spaceStatusCode: mondayNight==='Боломжтой'?'AV' :'UN',
    },
    {
      day: 2,
      // timeSplitDescription: 'Өдөр',
      timeSplitId: Number(daySplitId),
      spaceStatusCode: tuesdayMorning==='Боломжтой'?'AV' :'UN',
    },
    {
      day: 2,
      // timeSplitDescription: 'Шөнө',
      timeSplitId: Number(nightSplitId),
      spaceStatusCode: tuesdayNight==='Боломжтой'?'AV' :'UN',
    },
    {
      day: 3,
      // timeSplitDescription: 'Өдөр',
      timeSplitId: Number(daySplitId),
      spaceStatusCode: wednesdayMorning==='Боломжтой'?'AV' :'UN',
    },
    {
      day: 3,
      // timeSplitDescription: 'Шөнө',
      timeSplitId: Number(nightSplitId),
      spaceStatusCode: wednesdayNight==='Боломжтой'?'AV' :'UN',
    },
    {
      day: 4,
      // timeSplitDescription: 'Өдөр',
      timeSplitId: Number(daySplitId),
      spaceStatusCode: thursdayMorning==='Боломжтой'?'AV' :'UN',
    },
    {
      day: 4,
      // timeSplitDescription: 'Шөнө',
      timeSplitId: Number(nightSplitId),
      spaceStatusCode: thursdayNight==='Боломжтой'?'AV' :'UN',
    },
    {
      day: 5,
      // timeSplitDescription: 'Өдөр',
      timeSplitId: Number(daySplitId),
      spaceStatusCode: fridayMorning==='Боломжтой'?'AV' :'UN',
    },
    {
      day: 5,
      // timeSplitDescription: 'Шөнө',
      timeSplitId: Number(nightSplitId),
      spaceStatusCode: fridayNight==='Боломжтой'?'AV' :'UN',
    },
    {
      day: 6,
      // timeSplitDescription: 'Өдөр',
      timeSplitId: Number(daySplitId),
      spaceStatusCode: saturdayMorning==='Боломжтой'?'AV' :'UN',
    },
    {
      day: 6,
      // timeSplitDescription: 'Шөнө',
      timeSplitId: Number(nightSplitId),
      spaceStatusCode: saturdayNight==='Боломжтой'?'AV' :'UN',
    },
    {
      day: 0,
      // timeSplitDescription: 'Өдөр',
      timeSplitId: Number(daySplitId),
      spaceStatusCode: sundayMorning==='Боломжтой'?'AV' :'UN',
    },
    {
      day: 0,
      // timeSplitDescription: 'Шөнө',
      timeSplitId: Number(nightSplitId),
      spaceStatusCode: sundayNight==='Боломжтой'?'AV' :'UN',
    },
  ];
  // const headerRender = () => {
  //   return (
  //     <Row className="p-1">
  //       <Col>
  //         <img src="/icons/arrow_back_ios_24px.png" height='16px' width='16px'/>
  //       </Col>
  //       <Button>

  //       </Button>
  //       <Col>
  //         <img src="/icons/arrow_forward_ios_24px.png" height='16px' width='16px'/>
  //       </Col>
  //     </Row>);
  // };
  const disabledDate = (current)=> {
    // const customDate = moment().format('YYYY-MM-DD');
    // return current && current < moment(customDate, 'YYYY-MM-DD');
  };
  const onChangeViewCalendar = (e) => {
    setChecked(e.target.value);
    // setWeekData(dayofweek);
  };
  const timeSplit = [
    {id: 1, name: 'Боломжтой'},
    {id: 2, name: 'Боломжгүй'},
  ];
  const getListData = (value) =>{
    const array = [];
    dayOfWeek.map((item) => {
      switch (item.day) {
      case value.day():
        if (item.spaceStatusCode === 'Боломжтой') {
          array.push({
            type: item.spaceStatusCode,
            content: item.timeSplitDescription,
          });
        }
        if (item.spaceStatusCode === 'Боломжгүй') {
          array.push({
            type: item.spaceStatusCode,
            content: item.timeSplitDescription,
          });
        }
        break;
      default:
      }
    });
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
  const onChangeBla = (e) => {
    props.setRentData(dayWeek);
    setsundayMorning(e), setChecked(2);
  };
  useEffect(async () => {
    const data = await callGet('/parkingspace/timesplit');
    setDaySplitId(data.daySplit.id);
    setNightSplit(data.nightSplit.id);
    console.log(data.daySplit.id, data.nightSplit.id, 'id nuud chn ene ba');
  }, []);
  return (
    <div>
      <Row offset={4}>
        <p
          style={{
            color: 'blue',
            fontSize: '20px',
            marginTop: '50px',
            marginLeft: '100px',
          }}
        >
          <b>Түрээслэх өдөр</b>
        </p>
      </Row>
      <Row>
        <p style={{fontSize: '12px', marginLeft: '100px'}}>
          Тухайн зогсоолийн байрлал, дугаарлалт харагдаж буй зогсоолыг олоход
          тохиромжтой олоход тохиромжтой зураг хийнэ.
        </p>
      </Row>
      <Row style={{marginLeft: '5%'}}>
        <Col span={9}>
          <Row
            style={{
              marginLeft: '50px',
              marginTop: '20px',
            }}
          >
            <Button
              //   onClick={() => setFilterType("AV")}
              //   className={`text-center  col-span-1 buttonFilter1 ${
              //     filterType === "AV" ? "activeButton" : ""
              //   }`}
              style={{
                backgroundColor: '#33FFFC',
                color: '#76E8AA',
                border: '1px solid #00F9B8',
                borderRadius: '20px',
              }}
            >
              AV
            </Button>
            <Button
              //   onClick={() => setFilterType("UN")}
              //   className={`text-center  col-span-1 buttonFilter1 ${
              //     filterType === "UN" ? "activeButton" : ""
              //   }`}
              style={{
                marginLeft: '10px',
                backgroundColor: 'gray',
                borderRadius: '20px',
              }}
            >
              UN
            </Button>

            <p style={{marginLeft: '10px', fontSize: '16px'}}>
              Тохиргоо хийх
            </p>
            <Divider className={'stateDivider'} />
          </Row>

          <Row style={{marginLeft: '50px'}}>
            <Col span={6} offset={1}></Col>
            <Col span={6} offset={1} style={{color: '#647189', fontWeight: '500'}}>
              Өдөр|08:00-18:30
            </Col>
            <Col span={6} offset={1} style={{color: '#647189', fontWeight: '500'}}>
              Шөнө|08:00-18:30
            </Col>
          </Row>
          <Row
            style={{marginLeft: '50px', marginTop: '5px'}}
            className={'pickWeekDayState'}
          >
            <Col span={4} offset={3} style={{color: '#647189', fontWeight: '500'}}>
              НЯМ
            </Col>
            <Col span={5} offset={1}>
              <Select
                onChange={onChangeBla}
                value={sundayMorning}
                className={
                  sundayMorning === 'Боломжтой' ? 'Surrender' : 'NotSurrender'
                }
              >
                {timeSplit.map((item) => (
                  <Select.Option key={item.id} value={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Col span={5} offset={2}>
              <Select
                onChange={(e) => {
                  props.setRentData(dayWeek);
                  // console.log(weekData);
                  setsundayNight(e), setChecked(2);
                }}
                value={sundayNight}
                className={
                  sundayNight === 'Боломжтой' ? 'Surrender' : 'NotSurrender'
                }
              >
                {timeSplit.map((item) => (
                  <Select.Option key={item.id} value={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
          {/* Даваа гараг*/}
          <Row
            style={{marginLeft: '50px', marginTop: '5px'}}
            className={'pickWeekDayState'}
          >
            <Col span={4} offset={3} style={{fontSize: '15px'}}>
              ДАВАА
            </Col>
            <Col span={5} offset={1}>
              <Select
                onChange={(e) => {
                  props.setRentData(dayWeek);
                  setmondayMorning(e), setChecked(2);
                }}
                value={mondayMorning}
                className={
                  mondayMorning === 'Боломжтой' ? 'Surrender' : 'NotSurrender'
                }
              >
                {timeSplit.map((item) => (
                  <Select.Option key={item.id} value={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Col span={5} offset={2}>
              <Select
                onChange={(e) => {
                  setmondayNight(e), setChecked(2);
                  props.setRentData(dayWeek);
                }}
                value={mondayNight}
                className={
                  mondayNight === 'Боломжтой' ? 'Surrender' : 'NotSurrender'
                }
              >
                {timeSplit.map((item) => (
                  <Select.Option key={item.id} value={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
          {/* Мягмар гараг */}
          <Row
            style={{marginLeft: '50px', marginTop: '5px'}}
            className={'pickWeekDayState'}
          >
            <Col span={4} offset={3} style={{fontSize: '15px'}}>
              МЯГМАР
            </Col>
            <Col span={5} offset={1}>
              <Select
                onChange={(e) => {
                  settuesdayMorning(e), setChecked(2);
                  props.setRentData(dayWeek);
                }}
                value={tuesdayMorning}
                className={
                  tuesdayMorning === 'Боломжтой' ? 'Surrender' : 'NotSurrender'
                }
              >
                {timeSplit.map((item) => (
                  <Select.Option key={item.id} value={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Col span={5} offset={2}>
              <Select
                onChange={(e) => {
                  settuesdayNight(e), setChecked(2);
                  props.setRentData(dayWeek);
                }}
                value={tuesdayNight}
                className={
                  tuesdayNight === 'Боломжтой' ? 'Surrender' : 'NotSurrender'
                }
              >
                {timeSplit.map((item) => (
                  <Select.Option key={item.id} value={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
          {/* Лхагва гараг  */}
          <Row
            style={{marginLeft: '50px', marginTop: '5px'}}
            className={'pickWeekDayState'}
          >
            <Col span={4} offset={3} style={{fontSize: '15px'}}>
              ЛХАГВА
            </Col>
            <Col span={5} offset={1}>
              <Select
                span={6}
                onChange={(e) => {
                  setwednesdayMorning(e), setChecked(2);
                  props.setRentData(dayWeek);
                }}
                value={wednesdayMorning}
                className={
                  wednesdayMorning === 'Боломжтой' ?
                    'Surrender' :
                    'NotSurrender'
                }
              >
                {timeSplit.map((item) => (
                  <Select.Option key={item.id} value={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Col span={5} offset={2}>
              <Select
                onChange={(e) => {
                  props.setRentData(dayWeek);
                  setwednesdayNight(e), setChecked(2);
                }}
                value={wednesdayNight}
                className={
                  wednesdayNight === 'Боломжтой' ? 'Surrender' : 'NotSurrender'
                }
              >
                {timeSplit.map((item) => (
                  <Select.Option key={item.id} value={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
          {/* Пүрэв гараг */}
          <Row
            style={{marginLeft: '50px', marginTop: '5px'}}
            className={'pickWeekDayState'}
          >
            <Col span={4} offset={3} style={{fontSize: '15px'}}>
              ПҮРЭВ
            </Col>
            <Col span={5} offset={1}>
              <Select
                onChange={(e) => {
                  setthursdayMorning(e), setChecked(2);
                  props.setRentData(dayWeek);
                }}
                value={thursdayMorning}
                className={
                  thursdayMorning === 'Боломжтой' ? 'Surrender' : 'NotSurrender'
                }
              >
                {timeSplit.map((item) => (
                  <Select.Option key={item.id} value={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Col span={5} offset={2}>
              <Select
                onChange={(e) => {
                  setthursdayNight(e), setChecked(2);
                  props.setRentData(dayWeek);
                }}
                value={thursdayNight}
                className={
                  thursdayNight === 'Боломжтой' ? 'Surrender' : 'NotSurrender'
                }
              >
                {timeSplit.map((item) => (
                  <Select.Option key={item.id} value={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
          {/* Баасан гараг */}
          <Row
            style={{marginLeft: '50px', marginTop: '5px'}}
            className={'pickWeekDayState'}
          >
            <Col span={4} offset={3} style={{fontSize: '15px'}}>
              БААСАН
            </Col>
            <Col span={5} offset={1}>
              <Select
                onChange={(e) => {
                  setfridayMorning(e), setChecked(2);
                  props.setRentData(dayWeek);
                }}
                value={fridayMorning}
                className={
                  fridayMorning === 'Боломжтой' ? 'Surrender' : 'NotSurrender'
                }
              >
                {timeSplit.map((item) => (
                  <Select.Option key={item.id} value={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Col span={5} offset={2}>
              <Select
                onChange={(e) => {
                  setfridayNight(e), setChecked(2), props.setRentData(dayWeek);
                }}
                value={fridayNight}
                className={
                  fridayNight === 'Боломжтой' ? 'Surrender' : 'NotSurrender'
                }
              >
                {timeSplit.map((item) => (
                  <Select.Option key={item.id} value={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
          {/* Бямба гараг*/}
          <Row
            style={{marginLeft: '50px', marginTop: '5px'}}
            className={'pickWeekDayState'}
          >
            <Col span={4} offset={3} style={{fontSize: '15px'}}>
              БЯМБА
            </Col>
            <Col span={5} offset={1}>
              <Select
                onChange={(e) => {
                  setsaturdayMorning(e),
                  setChecked(2),
                  props.setRentData(dayWeek);
                }}
                value={saturdayMorning}
                className={
                  saturdayMorning === 'Боломжтой' ? 'Surrender' : 'NotSurrender'
                }
              >
                {timeSplit.map((item) => (
                  <Select.Option key={item.id} value={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Col span={5} offset={2}>
              <Select
                onChange={(e) => {
                  setsaturdayNight(e),
                  setChecked(2),
                  props.setRentData(dayWeek);
                }}
                value={saturdayNight}
                className={
                  saturdayNight === 'Боломжтой' ? 'Surrender' : 'NotSurrender'
                }
              >
                {timeSplit.map((item) => (
                  <Select.Option key={item.id} value={item.name}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
          <Row style={{marginLeft: '50px', marginTop: '20px'}}>
            <p
              style={{
                color: '#141A29',
                fontSize: '14px',
                fontFamily: 'Helvetica',
                fontWeight: 'normal',
                fontStyle: 'normal',
              }}
            >
              Долоо хоногын хувиарыг сарын календарлуу шилжүүлэх үү ?
            </p>
          </Row>
          <Row
            style={{marginLeft: '100px', height: '24px'}}
            className={'InfoIconInDayState'}
          >
            <Col span={2}>
              <InfoCircleOutlined
                style={{height: '24px', width: '24px', color: 'yellow'}}
              />
            </Col>
            <Col span={22}>
              <p style={{fontSize: '12px', fontWeight: 400}}>
                Үгүй гэсэн сонголтыг хийсэн тохиолдолд 7 хоног бүр хуваарийг
                шинэчлэхийг анхаарна уу!
              </p>
            </Col>
          </Row>
          <Row style={{marginLeft: '50px', marginTop: '20px'}}>
            <Radio.Group onChange={onChangeViewCalendar} value={checked}>
              <Radio value={1}>Тийм</Radio>
              <Radio value={2}>Үгүй</Radio>
            </Radio.Group>
          </Row>
        </Col>
        <Divider
          type="vertical"
          style={{
            height: '450px ',
            width: '1px',
            marginTop: '20px',
          }}
        />
        {checked === 1 && (
          <Col span={12} offset={1}>
            <Row style={{width: '720px'}} className={'rentDate'}>
              <Col span={2}>
                <DayNightColumn className={'rentCalendarDayNightText'} />
              </Col>
              <Col span={20} >
                <Calendar
                  disabledDate={disabledDate}
                  headerRender={({value, type, onChange, onTypeChange}) => {
                    const current = value.clone();
                    const localeData = value.localeData();
                    const year = value.year();
                    const month = [];
                    console.log(localeData, 'awdawd');
                    for (let i = 0; i < 12; i++) {
                      month.push(localeData.months(current));
                    }

                    return (
                      <div style={{padding: '16px'}}>
                        <Row >
                          <Col span={2}>
                            <LeftOutlined
                              onClick={()=>{}}
                              style={{cursor: 'pointer'}}
                            />
                          </Col>
                          <Col span={6}>
                            Есдүгээр сар,{year}
                          </Col>
                          <Col
                            span={2}
                            // onClick={onClickRight}
                            style={{cursor: 'pointer'}}
                          >
                            <RightOutlined />
                          </Col>
                        </Row>
                      </div>
                    );
                  }}
                  // value={moment().format('YYYY/MM/DD')}
                  className={'rentDateCalendar'}
                  dateCellRender={dateCellRender}
                  // validRange={[dayjs(props.params.startDate), dayjs(props.params.endDate)]}
                  locale={calendarLocale}
                  // monthCellRender={monthCellRender}
                />
              </Col>
            </Row>
          </Col>
        )}
      </Row>
    </div>
  );
};
export default rentDate;
